"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHooksScopes = getHooksScopes;
exports.getScopeHookNames = getScopeHookNames;
exports.getScopeHooks = getScopeHooks;
exports.usingHooks = usingHooks;
exports.configHooks = configHooks;

var _weAppUtils = require("@saasfe/we-app-utils");

var _register = require("./register");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var HooksScopes = [];
var ScopesHooks = {};

function getHooksScopes() {
  return HooksScopes;
}

function getScopeHookNames(scopeName) {
  var scopeHooks = ScopesHooks[scopeName];
  return scopeHooks.map(function (_ref) {
    var hookName = _ref.hookName;
    return hookName;
  });
}

function getScopeHooks(scopeName) {
  var scopeHooks = ScopesHooks[scopeName];
  return scopeHooks.map(function (_ref2) {
    var hookName = _ref2.hookName,
        opts = _ref2.opts;
    var hookEntity = (0, _register.getHookEntity)(hookName);
    return Object.assign(Object.assign({}, hookEntity), {
      hookName: hookName,
      opts: Object.assign(Object.assign({}, hookEntity.opts), opts)
    });
  });
}

function getEnabledHooks(scopeName) {
  var traced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var enabledHooks = ScopesHooks[scopeName];

  if (!enabledHooks && traced) {
    var names = scopeName.split(_weAppUtils.ScopeNameDivider);
    names.pop();
    var name;

    if (names.length > 1) {
      name = names.join(_weAppUtils.ScopeNameDivider);
    } else {
      name = names[1] || '';
    }

    enabledHooks = getEnabledHooks(name);
  }

  return enabledHooks;
}

function setHooksOpts(hooksConfig, scope) {
  var scopeName = (0, _weAppUtils.getScopeName)(scope); // 检测在当前scope上是否启用扩展

  var enabledHooks = getEnabledHooks(scopeName);

  if (!enabledHooks) {
    throw new Error("\u8BF7\u6307\u5B9A\u9700\u8981\u542F\u7528\u7684\u6269\u5C55\uFF0C\u5DE5\u4F5C\u8303\u56F4 ".concat(scopeName));
  } // 在当前scope上保存扩展配置


  var scopeHooks = ScopesHooks[scopeName];
  hooksConfig.forEach(function (hookConfig) {
    var hookName = hookConfig;
    var opts;

    if (_typeof(hookConfig) === 'object') {
      hookName = hookConfig.hookName;
      opts = hookConfig.config;
    }

    var scopeHook = scopeHooks.find(function (h) {
      return h.hookName === hookName;
    });

    if (scopeHook) {
      scopeHook.opts = Object.assign(Object.assign({}, scopeHook.opts), opts);
    } else {
      scopeHooks.push({
        hookName: hookName,
        opts: opts
      });
    }
  });
}

function enableHooks(hooksConfig, scope) {
  var scopeName = scope;

  if (_typeof(scope) === 'object') {
    scopeName = (0, _weAppUtils.getScopeName)(scope);
    scope.scopeName = scopeName;
  } // 保存启用scope


  var hookScopeIndex = HooksScopes.findIndex(function (hookScope) {
    if (typeof hookScope === 'string') {
      return hookScope === scopeName;
    }

    return hookScope.scopeName === scopeName;
  });

  if (hookScopeIndex === -1) {
    HooksScopes.push(scope);
  } // 保存scope中启用hook信息


  ScopesHooks[scopeName] = ScopesHooks[scopeName] || []; // 设置scope中hook配置

  if (!hooksConfig) {
    ScopesHooks[scopeName] = [];
    return;
  }

  setHooksOpts(hooksConfig, scope);
} // 可以禁用所有，当前scope enabledHook为[]
// 可以重新指定启用hook，可以自定义hook


function usingHooks(hookConfigs, scopes) {
  // 禁用所有
  if (!hookConfigs && scopes) {
    scopes.forEach(function (scope) {
      enableHooks(hookConfigs, scope);
    });
    return;
  }

  var configs = hookConfigs.map(function (hookConfig) {
    if (typeof hookConfig === 'string') {
      return {
        hookName: hookConfig,
        scopes: scopes
      };
    }

    return Object.assign(Object.assign({}, hookConfig), {
      scopes: hookConfig.scopes || scopes
    });
  });
  var needRegisterHooks = [];
  var scopeHooksOpts = {};
  var scopeMap = {};
  configs.forEach(function (usingHookOpts) {
    var hookName = usingHookOpts.hookName,
        hookDesc = usingHookOpts.hookDesc,
        config = usingHookOpts.config,
        hookScopes = usingHookOpts.scopes; // 注册hook

    if (hookDesc) {
      if ((0, _register.hasHookName)(hookName)) {
        console.warn("\u540C\u540D\u6269\u5C55 ".concat(hookName, " \u4E0D\u53EF\u91CD\u590D\u6CE8\u518C"));
        return;
      }

      hookDesc.hookName = hookName;
      needRegisterHooks.push([hookDesc, config]);
    } // 在scope启用和配置hook


    if (hookScopes) {
      hookScopes.forEach(function (scope) {
        var scopeName = (0, _weAppUtils.getScopeName)(scope);
        scopeMap[scopeName] = scope;
        scopeHooksOpts[scopeName] = scopeHooksOpts[scopeName] || [];
        var scopeHookOpts = scopeHooksOpts[scopeName];
        var index = scopeHookOpts.findIndex(function (scopeUsingHookOpts) {
          return scopeUsingHookOpts.hookName === hookName;
        });

        if (index === -1) {
          scopeHookOpts.push(usingHookOpts);
        }
      });
    }
  }); // 注册hook

  (0, _register.registerHooks)(needRegisterHooks); // 启用hook

  Object.keys(scopeHooksOpts).forEach(function (scopeName) {
    var scopeHookOpts = scopeHooksOpts[scopeName]; // 清空当前scope已启用扩展

    ScopesHooks[scopeName] = [];
    enableHooks(scopeHookOpts, scopeMap[scopeName]);
  });
}

function configHooks(hookConfigs, scopes) {
  var configs = hookConfigs.map(function (hookConfig) {
    if (typeof hookConfig === 'string') {
      return {
        hookName: hookConfig,
        scopes: scopes
      };
    }

    return Object.assign(Object.assign({}, hookConfig), {
      scopes: hookConfig.scopes || scopes
    });
  }); // 根据scope，解析出各个需要配置的hook
  // 前提是，已经指定当前scope需要启用的hook

  var scopeHooksOpts = {};
  var scopeMap = {};
  configs.forEach(function (usingHookOpts) {
    var hookName = usingHookOpts.hookName,
        hookScopes = usingHookOpts.scopes;

    if (hookScopes) {
      hookScopes.forEach(function (scope) {
        var scopeName = (0, _weAppUtils.getScopeName)(scope);
        scopeMap[scopeName] = scope;
        scopeHooksOpts[scopeName] = scopeHooksOpts[scopeName] || [];
        var scopeHookOpts = scopeHooksOpts[scopeName];
        var index = scopeHookOpts.findIndex(function (scopeUsingHookOpts) {
          return scopeUsingHookOpts.hookName === hookName;
        });

        if (index === -1) {
          scopeHookOpts.push(usingHookOpts);
        }
      });
    }
  }); // 设置scope hook opts

  Object.keys(scopeHooksOpts).forEach(function (scopeName) {
    var scopeHookOpts = scopeHooksOpts[scopeName];
    enableHooks(scopeHookOpts, scopeMap[scopeName]);
  });
}