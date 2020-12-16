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

import { callCapturedEventListeners, runRoutingWithHook, setRoutingWithHook } from './event-intercept';
import { parseUri } from './helper';
import { getActivePageScopes, getScope } from '../weapp';
import { LifecycleHookEnum } from '@saasfe/we-app-types';
import { checkActivityFunctions } from 'single-spa';
import { runLifecycleHook } from '../hooks';

function routingFunctionWithHook(url) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var destination, isContinue;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            destination = parseUri("".concat(location.protocol, "//").concat(location.hostname).concat(location.port ? ":".concat(location.port) : '').concat(url));
            _context.next = 3;
            return runRoutingWithHook(destination);

          case 3:
            isContinue = _context.sent;
            return _context.abrupt("return", isContinue);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

var currentPushState = window.history.pushState;
var currentPopState = window.history.replaceState;

window.history.pushState = function (_data, _title, url) {
  return __awaiter(this, arguments, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var isContinue,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return routingFunctionWithHook(url);

          case 2:
            isContinue = _context2.sent;

            if (isContinue !== false) {
              currentPushState.apply(this, _args2);
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
};

window.history.replaceState = function (_data, _title, url) {
  return __awaiter(this, arguments, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var isContinue,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return routingFunctionWithHook(url);

          case 2:
            isContinue = _context3.sent;

            if (isContinue !== false) {
              currentPopState.apply(this, _args3);
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
};

function createPopStateEvent(state) {
  // https://github.com/CanopyTax/single-spa/issues/224 and https://github.com/CanopyTax/single-spa-angular/issues/49
  // We need a popstate event even though the browser doesn't do one by default when you call replaceState, so that
  // all the applications can reroute.
  try {
    return new PopStateEvent('popstate', {
      state: state
    });
  } catch (err) {
    // IE 11 compatibility https://github.com/CanopyTax/single-spa/issues/299
    // https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-html5e/bd560f47-b349-4d2c-baa8-f1560fb489dd
    var evt = document.createEvent('PopStateEvent'); // @ts-ignore

    evt.initPopStateEvent('popstate', false, false, state);
    return evt;
  }
} // 设置路由生命周期钩子
// 放在这里是避免出现循环依赖


var routingWithHook = function routingWithHook(location) {
  var activePageScopes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var activeScopes, activePages, isContinue;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activeScopes = activePageScopes; // 未注册页面，则使用根产品作为scope

            if (activeScopes.length === 0) {
              activePages = checkActivityFunctions(location);
              activeScopes = activePages.map(function (pageName) {
                return getScope(pageName);
              });
            }

            _context4.next = 4;
            return runLifecycleHook(LifecycleHookEnum.beforeRouting, activeScopes);

          case 4:
            isContinue = _context4.sent;
            return _context4.abrupt("return", isContinue);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
};

setRoutingWithHook(routingWithHook); // 首次进入执行路由拦截

var isStarted = false;
export function startRouting() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var activeScopes;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!isStarted) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return");

          case 2:
            isStarted = true;
            activeScopes = getActivePageScopes(location);
            _context5.next = 6;
            return runRoutingWithHook(location, activeScopes).then(function (isContinue) {
              if (isContinue !== false) {
                callCapturedEventListeners([createPopStateEvent(null)]);
              }
            });

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
}