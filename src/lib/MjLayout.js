"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mjmlCore = require("mjml-core");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  This component is an example of layout, which uses existing mjml components
  and can take some as children.
  It also introduces the two 'headStyle' functions
*/
var MjLayout = /*#__PURE__*/function (_BodyComponent) {
  _inherits(MjLayout, _BodyComponent);

  var _super = _createSuper(MjLayout);

  /*
    Notice we don't put "static endingTag = true" here,
    because we want this tag's content to be parsed as mjml.
    Examples of non-endingTags are mj-section, mj-column, etc.
  */
  function MjLayout() {
    var _this;

    var initialDatas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MjLayout);

    _this = _super.call(this, initialDatas);

    _defineProperty(_assertThisInitialized(_this), "headStyle", function (breakpoint) {
      return "\n      .mj-layout {\n        border: 10px solid black !important;\n      }\n      @media only screen and (max-width:".concat(breakpoint, ") {\n        .mj-layout {\n          border-color: blue !important;\n        }\n      }\n    ");
    });

    _defineProperty(_assertThisInitialized(_this), "componentHeadStyle", function (breakpoint) {
      return "\n      @media only screen and (max-width:".concat(breakpoint, ") {\n        .mj-layout-").concat(_this.cssId, " {\n          width: ").concat(_this.cssId * 60, "px !important;\n        }\n      }\n    ");
    });

    _this.cssId = Math.floor(Math.random() * 9) + 1;
    return _this;
  }

  _createClass(MjLayout, [{
    key: "render",
    value: function render() {
      /*
        Components are supposed to return html. If we want to return mjml so as to
        use existing components, we need to process it manually using this.renderMJML()
      */
      return this.renderMJML("\n\t\t\t<mj-section css-class=\"mj-layout mj-layout-".concat(this.cssId, "\">\n\t\t\t\t<mj-column background-color=\"").concat(this.getAttribute("background-color"), "\">\n\t\t\t\t\t").concat(this.renderChildren(this.props.children, {
        /* The rawXML option prevents processing on children : we already call this.renderMJML on the whole block so we don't want the children to be processed twice */
        rawXML: true,

        /* The renderer option allows to use a specific rendering function, or wrap each child if needed. Below is the default, see mj-column code for an example of this. */
        renderer: function renderer(component) {
          return component.render;
        }
      }), "\n\t\t\t\t</mj-column>\n\t\t\t</mj-section>\n\t\t"));
    }
  }]);

  return MjLayout;
}(_mjmlCore.BodyComponent);

exports["default"] = MjLayout;

_defineProperty(MjLayout, "dependencies", {
  // Tell the validator which tags are allowed as our component's children
  "mj-layout": ["mj-accordion", "mj-button", "mj-carousel", "mj-divider", "mj-html", "mj-image", "mj-raw", "mj-social", "mj-spacer", "mj-table", "mj-text", "mj-navbar"],
  // Now tell the validator which tags are allowed as our component's parent
  "mj-wrapper": ["mj-layout"],
  "mj-body": ["mj-layout"]
});

_defineProperty(MjLayout, "allowedAttributes", {
  "background-color": "color",
  color: "color"
});

_defineProperty(MjLayout, "defaultAttributes", {
  "background-color": "white",
  color: "black"
});