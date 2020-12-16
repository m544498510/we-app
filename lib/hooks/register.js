"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasHookName = hasHookName;
exports.getRegisteredHooks = getRegisteredHooks;
exports.getHookEntity = getHookEntity;
exports.getPageConfigs = getPageConfigs;
exports.registerHook = registerHook;
exports.registerHooks = registerHooks;

var _weAppTypes = require("@saasfe/we-app-types");

var _execute = require("./execute");

var HookNames = [];
var HookEntities = {};

function hasHookName(hookName) {
  return HookNames.indexOf(hookName) > -1;
}

function getRegisteredHooks() {
  return HookNames;
}

function getHookEntity(hookName) {
  return HookEntities[hookName];
}

function getPageConfigs() {
  var pageConfigs = [];
  Object.keys(HookEntities).forEach(function (hookName) {
    var hookEntity = HookEntities[hookName];
    var pageConfig = hookEntity === null || hookEntity === void 0 ? void 0 : hookEntity.hookDescEntity(_weAppTypes.LifecycleHookEnum.page);

    if (!pageConfig) {
      return;
    }

    pageConfigs.push(pageConfig);
  });
  return pageConfigs;
}

function registerHook(hookDesc, opts) {
  var hookName = hookDesc.hookName;
  var hookEntity = HookEntities[hookName];

  if (hookEntity) {
    return hookEntity;
  }

  HookNames.push(hookName);
  hookEntity = {
    hookDescEntity: function hookDescEntity(lifecycleHook) {
      var lifecycleHookEntity = hookDesc[lifecycleHook];

      if (!lifecycleHookEntity) {
        return;
      }

      if (typeof lifecycleHookEntity === 'function') {
        return {
          exec: lifecycleHookEntity
        };
      }

      if (lifecycleHook === _weAppTypes.LifecycleHookEnum.page) {
        var activityFunction = lifecycleHookEntity.activityFunction;

        var scopeActivityFunction = function scopeActivityFunction(location) {
          // 判断当前启用的插件里是否存在当前插件
          var enabledHookNames = (0, _execute.getEnabledHookNames)(); // 匹配启用scope和禁用scope

          var isScopeMatched = enabledHookNames.indexOf(hookName) > -1;

          if (!isScopeMatched) {
            return false;
          }

          return activityFunction(location);
        };

        var pageConfig = Object.assign(Object.assign(Object.assign({}, lifecycleHookEntity), opts === null || opts === void 0 ? void 0 : opts.page), {
          hookName: hookName,
          name: hookName,
          activityFunction: scopeActivityFunction
        });
        return pageConfig;
      }

      return lifecycleHookEntity;
    },
    opts: opts
  };
  HookEntities[hookName] = hookEntity;
  return HookEntities[hookName];
}

function registerHooks(hookDesc, opts) {
  var hookDescs = Array.isArray(hookDesc) ? hookDesc : [[hookDesc, opts]];
  hookDescs.forEach(function (h) {
    if (Array.isArray(h)) {
      registerHook(h[0], h[1]);
    } else {
      registerHook(h);
    }
  });
}