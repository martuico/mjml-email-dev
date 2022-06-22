"use strict";

import yaml from "js-yaml";
import browser from "browser-sync";
import rimraf from "rimraf";
import fs from "fs";
import log from "fancy-log";
import path from "path";
import gulp from "gulp";
import babel from "gulp-babel";
import mjmlGulp from "gulp-mjml";
import mjml from "mjml";
import nunjucks from "gulp-nunjucks-render";
import data from "gulp-data";
import { registerComponent } from "mjml-core";

const PATHS = {
  src: "./src/{layouts,partials,components/templates}/**/*.mjml",
  data: "./src/data/data.yml",
  layouts: "./src/layouts/",
  partials: "./src/partials/",
  templates: "./src/templates/**/*.mjml",
  mjml: {
    src: "./dist/mjml/**/*.mjml",
    dist: "./dist/mjml/",
  },
  dist: "./dist/html/",
};

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const watchedComponents = walkSync("./src/components");

const compileComponent = () => {
  return gulp
    .src(path.normalize("./src/components/**/*.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .on("error", log)
    .pipe(gulp.dest("./src/lib"))
    .on("end", () => {
      watchedComponents.forEach((compPath) => {
        const fullPath = path.join(
          process.cwd(),
          compPath.replace(/^components/, "lib")
        );
        delete require.cache[fullPath];
        registerComponent(require(fullPath).default);
      });
    });
};

function load_data() {
  let yml = fs.readFileSync(PATHS.data, "utf8");
  return yaml.load(yml);
}

export function registerMjmlCustomComponet() {
  gulp.task("build", compile);
}

export function clean(done) {
  rimraf("./dist/*", done);
}

export function buildTemplates() {
  return gulp
    .src(PATHS.templates)
    .pipe(data(load_data))
    .pipe(
      nunjucks({
        path: [PATHS.layouts, PATHS.partials],
        envOptions: {
          noCache: true,
        },
        inheritExtension: true,
      })
    )
    .pipe(gulp.dest(PATHS.mjml.dist));
}

export function buildMjml() {
  const options = {
    beautify: true,
    minify: false,
  };

  return gulp
    .src(PATHS.mjml.src)
    .pipe(mjmlGulp(mjml, options))
    .pipe(gulp.dest(PATHS.dist));
}

export function server(done) {
  const options = {
    server: {
      baseDir: PATHS.dist,
      directory: true,
    },
    port: "8000",
    notify: false,
  };

  browser.init(options);
  done();
}

export function watch() {
  gulp
    .watch(PATHS.data)
    .on("all", gulp.series(buildTemplates, buildMjml, browser.reload));
  gulp
    .watch(PATHS.src)
    .on(
      "all",
      gulp.series(compileComponent, buildTemplates, buildMjml, browser.reload)
    );
}

gulp.task(
  "build",
  gulp.series(clean, compileComponent, buildTemplates, buildMjml)
);

gulp.task("default", gulp.series("build", gulp.parallel(server, watch)));
