"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getPageConfigs", {
  enumerable: true,
  get: function get() {
    return _register.getPageConfigs;
  }
});
Object.defineProperty(exports, "usingHooks", {
  enumerable: true,
  get: function get() {
    return _using.usingHooks;
  }
});
Object.defineProperty(exports, "runLifecycleHook", {
  enumerable: true,
  get: function get() {
    return _execute.runLifecycleHook;
  }
});
Object.defineProperty(exports, "buildinHooks", {
  enumerable: true,
  get: function get() {
    return _instances["default"];
  }
});

var _register = require("./register");

var _using = require("./using");

var _execute = require("./execute");

var _instances = _interopRequireDefault(require("./instances"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }