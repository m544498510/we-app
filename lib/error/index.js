"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

var _singleSpa = require("single-spa");

var _hooks = require("../hooks");

var _weapp = require("../weapp");

var _weAppTypes = require("@saasfe/we-app-types");

var errorHandler = function errorHandler(error, activeScopes) {
  // 向外抛出错误
  Promise.reject(error); // 执行生命周期钩子

  return (0, _hooks.runLifecycleHook)(_weAppTypes.LifecycleHookEnum.onError, activeScopes, {
    error: error
  });
};

exports.errorHandler = errorHandler;
(0, _singleSpa.addErrorHandler)(function (error) {
  var pageName = error.appOrParcelName || error.appName || error.name;
  var activeScope = (0, _weapp.getScope)(pageName);
  errorHandler(error, [activeScope]).then(function () {
    if ((0, _singleSpa.getAppStatus)(pageName) === 'SKIP_BECAUSE_BROKEN') {
      (0, _singleSpa.unloadApplication)(pageName);
    }
  });
});