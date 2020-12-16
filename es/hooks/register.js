import { LifecycleHookEnum } from '@saasfe/we-app-types';
import { getEnabledHookNames } from './execute';
var HookNames = [];
var HookEntities = {};
export function hasHookName(hookName) {
  return HookNames.indexOf(hookName) > -1;
}
export function getRegisteredHooks() {
  return HookNames;
}
export function getHookEntity(hookName) {
  return HookEntities[hookName];
}
export function getPageConfigs() {
  var pageConfigs = [];
  Object.keys(HookEntities).forEach(function (hookName) {
    var hookEntity = HookEntities[hookName];
    var pageConfig = hookEntity === null || hookEntity === void 0 ? void 0 : hookEntity.hookDescEntity(LifecycleHookEnum.page);

    if (!pageConfig) {
      return;
    }

    pageConfigs.push(pageConfig);
  });
  return pageConfigs;
}
export function registerHook(hookDesc, opts) {
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

      if (lifecycleHook === LifecycleHookEnum.page) {
        var activityFunction = lifecycleHookEntity.activityFunction;

        var scopeActivityFunction = function scopeActivityFunction(location) {
          // 判断当前启用的插件里是否存在当前插件
          var enabledHookNames = getEnabledHookNames(); // 匹配启用scope和禁用scope

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
export function registerHooks(hookDesc, opts) {
  var hookDescs = Array.isArray(hookDesc) ? hookDesc : [[hookDesc, opts]];
  hookDescs.forEach(function (h) {
    if (Array.isArray(h)) {
      registerHook(h[0], h[1]);
    } else {
      registerHook(h);
    }
  });
}