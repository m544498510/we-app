function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

import { LifecycleHookEnum, BaseType } from '@saasfe/we-app-types';
import { getHooksScopes, getScopeHooks, getScopeHookNames } from './using';
import { getScopeName, makeSafeScope } from '@saasfe/we-app-utils';
import { getPageConfigs } from './register';
import { errorHandler as _errorHandler } from '../error';
import { getScope, compoundScope } from '../weapp';
import { getAppStatus, unloadApplication } from 'single-spa';
import { getContext } from '../context';
var MatchedPageScope = {};
var EnabledHookScopes = [];
export function getEnabledHookNames() {
  var enabledHookNames = [];
  EnabledHookScopes.forEach(function (_ref) {
    var hookScope = _ref.hookScope;
    var scopeHookNames = getScopeHookNames(hookScope.scopeName);
    enabledHookNames = enabledHookNames.concat(scopeHookNames);
  });
  return Array.from(new Set(enabledHookNames));
}

function matchHookDescRunnerParam(sourceHookScope, forMatchedHookScopes) {
  var pageScopeName = sourceHookScope.scopeName;
  var appScopeName = getScopeName(Object.assign(Object.assign({}, sourceHookScope), {
    pageName: ''
  }));
  var productScopeName = getScopeName(Object.assign(Object.assign({}, sourceHookScope), {
    appName: '',
    pageName: ''
  }));
  var activeScopeNames = [pageScopeName, appScopeName, productScopeName]; // 根据activePageScope匹配hooksScope，一个页面只会有一个hooksScope

  var matchedHookScopes = forMatchedHookScopes.map(function (hooksScope) {
    var hookScope = typeof hooksScope === 'string' ? getScope(hooksScope) : hooksScope;
    return hookScope;
  }).filter(function (hookScope) {
    if (!hookScope) {
      return false;
    }

    var matched = activeScopeNames.indexOf(hookScope.scopeName) > -1;

    if (matched) {
      return true;
    }

    return !hookScope.pageName && !hookScope.appName && hookScope.product.type === BaseType.root;
  });
  var matchedHookScope = matchedHookScopes[0];

  if (matchedHookScopes.length > 1) {
    // 从多个匹配的scope中选择作用域最小的一个
    // 作用域最小则长度最长
    var len = [];
    matchedHookScopes.map(function (scope) {
      return [scope, scope.productName, scope.appName, scope.pageName].filter(function (m) {
        return m;
      });
    }).forEach(function (m) {
      len[m.length] = m;
    });
    matchedHookScope = len[len.length - 1][0];
  }

  var hookDescRunnerParam = {
    pageScope: sourceHookScope,
    hookScope: matchedHookScope
  };
  return hookDescRunnerParam;
}

function matchActivePageHookDescRunnerParam(activePageScope) {
  var pageScopeName = getScopeName(activePageScope);
  activePageScope.scopeName = pageScopeName;

  if (MatchedPageScope[pageScopeName]) {
    return MatchedPageScope[pageScopeName];
  } // 根据activePageScope匹配hooksScope，一个页面只会有一个hooksScope


  var hooksScopes = getHooksScopes();
  var hookDescRunnerParam = matchHookDescRunnerParam(activePageScope, hooksScopes);
  MatchedPageScope[pageScopeName] = hookDescRunnerParam;
  return hookDescRunnerParam;
}

function matchHookDescRunnerParams(activePageScopes, lifecycleHook) {
  var lastEnabledHookDescRunnerParams = _toConsumableArray(EnabledHookScopes); // 根据activePageScope匹配hooksScope，一个页面只会有一个hooksScope


  var enabledHookDescRunnerParams = activePageScopes.map(function (activePageScope) {
    return matchActivePageHookDescRunnerParam(activePageScope);
  });

  if (lifecycleHook === LifecycleHookEnum.beforeRouting) {
    EnabledHookScopes = enabledHookDescRunnerParams; // 计算新启用hookScopes

    var newEnabledHookDescRunnerParams = []; // 计算已启用hookScopes

    var alreadyEnabledHookDescRunnerParams = []; // 计算禁用hookScopes
    // 找到上一个scope在当前scope中不存在的

    var disabledHookDescRunnerParams = _toConsumableArray(lastEnabledHookDescRunnerParams);

    enabledHookDescRunnerParams.forEach(function (enabledHookDescRunnerParam) {
      var hookScope = enabledHookDescRunnerParam.hookScope; // 不在上一次的启用hookScopes中，则为新启用hookScopes
      // 在上一次的启用hookScopes中，则为已启用hookScopes，并移除
      // 上一次启用hookScopes中剩余的就是本次需要禁用的hookScopes

      var index = disabledHookDescRunnerParams.findIndex(function (_ref2) {
        var lastHookScope = _ref2.hookScope;
        return hookScope.scopeName === lastHookScope.scopeName;
      });

      if (index === -1) {
        newEnabledHookDescRunnerParams.push(enabledHookDescRunnerParam);
      } else {
        alreadyEnabledHookDescRunnerParams.push(enabledHookDescRunnerParam);
        disabledHookDescRunnerParams.splice(index, 1);
      }
    });
    var matchedHookDescRunnerParams = {
      enabledHookDescRunnerParams: enabledHookDescRunnerParams,
      newEnabledHookDescRunnerParams: newEnabledHookDescRunnerParams,
      alreadyEnabledHookDescRunnerParams: alreadyEnabledHookDescRunnerParams,
      disabledHookDescRunnerParams: disabledHookDescRunnerParams
    };
    return matchedHookDescRunnerParams;
  } else {
    return {
      enabledHookDescRunnerParams: enabledHookDescRunnerParams,
      newEnabledHookDescRunnerParams: enabledHookDescRunnerParams,
      alreadyEnabledHookDescRunnerParams: [],
      disabledHookDescRunnerParams: []
    };
  }
}

export function runLifecycleHook(lifecycleHook, activePageScopes, props) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var hookPages, RootScope, RootScopeName, _matchHookDescRunnerP, enabledHookDescRunnerParams, disabledHookDescRunnerParams, scopeHooksRunners, activePages, enabledHookScopes, continues;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hookPages = getPageConfigs().map(function (hookPage) {
              return getScopeName({
                hookName: hookPage.hookName
              });
            }); // beforeRouting 区别于其他页面生命周期
            // 在路由切换时，RootProduct应当是始终都需要执行的

            if (lifecycleHook === LifecycleHookEnum.beforeRouting) {
              RootScope = compoundScope();
              activePageScopes.unshift(RootScope);
              RootScopeName = getScopeName(RootScope);
              hookPages.push(RootScopeName);
            }

            _matchHookDescRunnerP = matchHookDescRunnerParams(activePageScopes, lifecycleHook), enabledHookDescRunnerParams = _matchHookDescRunnerP.enabledHookDescRunnerParams, disabledHookDescRunnerParams = _matchHookDescRunnerP.disabledHookDescRunnerParams;
            scopeHooksRunners = [];
            activePages = activePageScopes.map(function (activeScope) {
              return getScopeName(activeScope);
            }); // 禁用hook，调用clear

            if (lifecycleHook === LifecycleHookEnum.beforeRouting) {
              enabledHookScopes = enabledHookDescRunnerParams.map(function (_ref3) {
                var hookScope = _ref3.hookScope;
                return hookScope;
              });
              disabledHookDescRunnerParams.forEach(function (_ref4) {
                var pageScope = _ref4.pageScope,
                    hookScope = _ref4.hookScope;
                // 像skeleton、basicLibs等扩展，如果前后hookScope存在祖孙关系，则不能清理
                // 所以需要在新启用的hookScope中找到与当前禁用hookScope相匹配的项，供扩展进行判断
                var nextHookDescRunnerParam = matchHookDescRunnerParam(hookScope, enabledHookScopes);
                var scopeHooks = getScopeHooks(hookScope.scopeName);
                scopeHooks.forEach(function (_ref5) {
                  var hookDescEntity = _ref5.hookDescEntity,
                      opts = _ref5.opts,
                      hookName = _ref5.hookName;
                  // 生命周期钩子函数获取
                  var hookDescRunner = hookDescEntity(lifecycleHook);

                  if (hookDescRunner && 'clear' in hookDescRunner) {
                    scopeHooksRunners.push([hookDescRunner.clear, Object.assign(Object.assign({}, props), {
                      hookName: hookName,
                      pageScope: makeSafeScope(pageScope),
                      hookScope: makeSafeScope(hookScope),
                      opts: opts,
                      matched: false,
                      hookPages: hookPages,
                      activePages: activePages,
                      nextHookDescRunnerParam: Object.assign(Object.assign({}, nextHookDescRunnerParam), {
                        pageScope: makeSafeScope(nextHookDescRunnerParam.pageScope),
                        hookScope: makeSafeScope(nextHookDescRunnerParam.hookScope)
                      }),
                      errorHandler: function errorHandler(error) {
                        return _errorHandler(error, [pageScope]);
                      },
                      context: getContext()
                    })]);
                  }
                });
              });
            } // 新启用hook，如果有页面，则先卸载页面，更新配置


            if (lifecycleHook === LifecycleHookEnum.beforeRouting) {
              enabledHookDescRunnerParams.forEach(function (_ref6) {
                var hookScope = _ref6.hookScope;
                var scopeHooks = getScopeHooks(hookScope.scopeName);
                scopeHooks.forEach(function (_ref7) {
                  var hookDescEntity = _ref7.hookDescEntity,
                      opts = _ref7.opts;
                  var hookPageConfig = hookDescEntity(LifecycleHookEnum.page);

                  if (hookPageConfig) {
                    var hookPageName = getScopeName({
                      hookName: hookPageConfig.hookName
                    });
                    var hookPageScope = getScope(hookPageName); // 更新配置

                    if ((opts === null || opts === void 0 ? void 0 : opts.page) && (hookPageScope === null || hookPageScope === void 0 ? void 0 : hookPageScope.page)) {
                      hookPageScope.page.setConfig(opts.page);
                    } // 卸载页面


                    var hookPageStatus = getAppStatus(hookPageName);

                    if (hookPageStatus && ['NOT_LOADED', 'UNLOADING'].indexOf(hookPageStatus) === -1) {
                      unloadApplication(hookPageName);
                    }
                  }
                });
              });
            } // 启用hook，调用exec


            enabledHookDescRunnerParams.forEach(function (_ref8) {
              var pageScope = _ref8.pageScope,
                  hookScope = _ref8.hookScope;
              var scopeHooks = getScopeHooks(hookScope.scopeName);
              scopeHooks.forEach(function (_ref9) {
                var hookDescEntity = _ref9.hookDescEntity,
                    opts = _ref9.opts,
                    hookName = _ref9.hookName;
                var hookDescRunner = hookDescEntity(lifecycleHook);

                if (hookDescRunner && 'exec' in hookDescRunner) {
                  var hookPageConfig = hookDescEntity(LifecycleHookEnum.page);
                  var hookPageScope;

                  if (hookPageConfig) {
                    var hookPageScopeName = getScopeName({
                      hookName: hookPageConfig.hookName
                    });
                    hookPageScope = getScope(hookPageScopeName);
                  }

                  scopeHooksRunners.push([hookDescRunner.exec, Object.assign(Object.assign({}, props), {
                    hookName: hookName,
                    pageScope: makeSafeScope(pageScope),
                    hookScope: makeSafeScope(hookScope),
                    hookPageScope: makeSafeScope(hookPageScope),
                    opts: opts,
                    matched: true,
                    hookPages: hookPages,
                    activePages: activePages,
                    errorHandler: function errorHandler(error) {
                      return _errorHandler(error, [pageScope]);
                    },
                    context: getContext()
                  })]);
                }
              });
            });
            continues = [];
            _context.next = 11;
            return scopeHooksRunners.reduce(function (p, scopeHooksRunner) {
              var _scopeHooksRunner = _slicedToArray(scopeHooksRunner, 2),
                  runner = _scopeHooksRunner[0],
                  opts = _scopeHooksRunner[1];

              return p.then(function () {
                // console.log('hook runner before', lifecycleHook, opts);
                return runner(opts);
              }).then(function (isContinue) {
                continues.push(isContinue); // console.log('hooke runner after', lifecycleHook, isContinue, opts);
              })["catch"](function (error) {
                console.warn(error);
              });
            }, Promise.resolve());

          case 11:
            if (!(continues.find(function (i) {
              return i === false;
            }) === false)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", false);

          case 13:
            return _context.abrupt("return", true);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}