"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _skeleton = _interopRequireDefault(require("./skeleton"));

var _basicLibs = _interopRequireDefault(require("./basic-libs"));

var _pageContainer = _interopRequireDefault(require("./page-container"));

var _loading = _interopRequireDefault(require("./loading"));

var _ = _interopRequireDefault(require("./404"));

var _2 = _interopRequireDefault(require("./403"));

var _3 = _interopRequireDefault(require("./500"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var buildinHooks = [_basicLibs["default"], _skeleton["default"], _pageContainer["default"], _loading["default"], _["default"], _2["default"], _3["default"]];
var _default = buildinHooks;
exports["default"] = _default;