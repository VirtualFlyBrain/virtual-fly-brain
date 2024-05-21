"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var json = {
  global: {},
  // {tabSetEnableTabStrip:false}, // to have just splitters
  layout: {
    "type": "row",
    "weight": 100,
    "children": [{
      "type": "tabset",
      "weight": 50,
      "selected": 0,
      "children": [{
        "type": "tab",
        "name": "Things to try",
        "component": "text",
        "config": {
          "text": "<ul><li>drag tabs</li><li>drag splitters</li><li>double click on tab to rename</li><li>double click on tabstrip to maximize</li><li>use the Add button to add another tab</li></ul>"
        }
      }]
    }, {
      "type": "tabset",
      "weight": 50,
      "selected": 0,
      "children": [{
        "type": "tab",
        "name": "two",
        "component": "text",
        "config": {
          "text": ""
        }
      }]
    }, {
      "type": "tabset",
      "weight": 50,
      "selected": 0,
      "children": [{
        "type": "tab",
        "name": "three",
        "component": "text",
        "config": {
          "text": ""
        }
      }]
    }]
  }
};
var Main = /*#__PURE__*/function (_React$Component) {
  function Main(props) {
    var _this;
    _classCallCheck(this, Main);
    _this = _callSuper(this, Main, [props]);
    _defineProperty(_this, "factory", function (node) {
      var component = node.getComponent();
      if (component === "text") {
        return /*#__PURE__*/React.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: node.getConfig().text
          }
        });
      }
    });
    _defineProperty(_this, "onAdd", function (event) {
      _this.refs.layout.addTabWithDragAndDropIndirect("Add panel<br>(Drag to location)", {
        component: "text",
        name: "added",
        config: {
          text: "i was added"
        }
      }, null);
    });
    _this.state = {
      model: FlexLayout.Model.fromJson(json)
    };
    return _this;
  }
  _inherits(Main, _React$Component);
  return _createClass(Main, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "outer"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: this.onAdd
      }, "Add"), /*#__PURE__*/React.createElement("div", {
        className: "inner"
      }, /*#__PURE__*/React.createElement(FlexLayout.Layout, {
        ref: "layout",
        model: this.state.model,
        factory: this.factory
      })));
    }
  }]);
}(React.Component);
ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.getElementById("container"));
//# sourceMappingURL=main.js.map