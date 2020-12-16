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
/**
 * 增强路由
 * 1. 在singleSpa初始化前，拦截事件popstate和hashchange，
 *    后续的事件监听都放在内部监听序列中，不会再有新的原生监听
 * 2. 在singleSpa初始化后，拦截pushState和popState，
 *    在函数调用时，校验权限或页面是否存在，
 *    如果校验不通过或页面不存在，则更新异常收集器，终止当前页面渲染，渲染出错内容
 */


var routingEventsListeningTo = ['popstate', 'hashchange'];
var capturedEventListeners = {
  popstate: [],
  hashchange: []
};
var originalAddEventListener = window.addEventListener;
var originalRemoveEventListener = window.removeEventListener;
var originalPushState = window.history.pushState;
var originalReplaceState = window.history.replaceState;
export function callCapturedEventListeners(eventArguments) {
  var _this = this;

  if (eventArguments) {
    var eventType = eventArguments[0].type;

    if (routingEventsListeningTo.indexOf(eventType) >= 0) {
      capturedEventListeners[eventType].forEach(function (listener) {
        listener.apply(_this, eventArguments);
      });
    }
  }
}

var routingWithHook = function routingWithHook() {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", true);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};

export var runRoutingWithHook = function runRoutingWithHook(location, activePageScopes) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return routingWithHook(location, activePageScopes);

          case 2:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
};
export function setRoutingWithHook(fn) {
  routingWithHook = fn;
}
var href = '';

function routingEventHandler(event) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var isSame, isContinue;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isSame = location.href === href;
            href = location.href;

            if (isSame) {
              _context3.next = 6;
              break;
            }

            _context3.next = 5;
            return routingWithHook(location);

          case 5:
            isContinue = _context3.sent;

          case 6:
            if (isContinue !== false) {
              callCapturedEventListeners([event]);
            }

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
}

window.addEventListener('popstate', routingEventHandler);
window.addEventListener('hashchange', routingEventHandler);

window.addEventListener = function (eventName, fn) {
  if (typeof fn === 'function') {
    if (routingEventsListeningTo.indexOf(eventName) >= 0 && !capturedEventListeners[eventName].find(function (listener) {
      return listener === fn;
    })) {
      capturedEventListeners[eventName].push(fn);
      return;
    }
  }

  return originalAddEventListener.apply(this, arguments);
};

window.removeEventListener = function (eventName, fn) {
  if (typeof fn === 'function') {
    if (routingEventsListeningTo.indexOf(eventName) >= 0) {
      capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(function (listener) {
        return listener !== fn;
      });
      return;
    }
  }

  return originalRemoveEventListener.apply(this, arguments);
};