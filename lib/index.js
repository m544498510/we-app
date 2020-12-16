"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;
Object.defineProperty(exports, "registerApps", {
  enumerable: true,
  get: function get() {
    return _weapp.registerApps;
  }
});
Object.defineProperty(exports, "usingHooks", {
  enumerable: true,
  get: function get() {
    return _weapp.usingHooks;
  }
});
Object.defineProperty(exports, "configHooks", {
  enumerable: true,
  get: function get() {
    return _weapp.configHooks;
  }
});
Object.defineProperty(exports, "setHomepage", {
  enumerable: true,
  get: function get() {
    return _weapp.setHomepage;
  }
});
Object.defineProperty(exports, "setResourceLoader", {
  enumerable: true,
  get: function get() {
    return _weapp.setResourceLoader;
  }
});
Object.defineProperty(exports, "setPageContainer", {
  enumerable: true,
  get: function get() {
    return _weapp.setPageContainer;
  }
});
Object.defineProperty(exports, "setRender", {
  enumerable: true,
  get: function get() {
    return _weapp.setRender;
  }
});
Object.defineProperty(exports, "setRouterType", {
  enumerable: true,
  get: function get() {
    return _weapp.setRouterType;
  }
});
Object.defineProperty(exports, "setBasename", {
  enumerable: true,
  get: function get() {
    return _weapp.setBasename;
  }
});
Object.defineProperty(exports, "setSkeletonContainer", {
  enumerable: true,
  get: function get() {
    return _weapp.setSkeletonContainer;
  }
});
Object.defineProperty(exports, "setContext", {
  enumerable: true,
  get: function get() {
    return _context3.setContext;
  }
});
Object.defineProperty(exports, "DefaultResourceLoader", {
  enumerable: true,
  get: function get() {
    return _weAppResourceLoader.DefaultResourceLoader;
  }
});
Object.defineProperty(exports, "RouterType", {
  enumerable: true,
  get: function get() {
    return _weAppTypes.RouterType;
  }
});
Object.defineProperty(exports, "ResourceType", {
  enumerable: true,
  get: function get() {
    return _weAppTypes.ResourceType;
  }
});
Object.defineProperty(exports, "isFunction", {
  enumerable: true,
  get: function get() {
    return _weAppUtils.isFunction;
  }
});
Object.defineProperty(exports, "navigate", {
  enumerable: true,
  get: function get() {
    return _weAppUtils.navigate;
  }
});
Object.defineProperty(exports, "getRouteSwitchConfig", {
  enumerable: true,
  get: function get() {
    return _weAppUtils.getRouteSwitchConfig;
  }
});
Object.defineProperty(exports, "getGotoHref", {
  enumerable: true,
  get: function get() {
    return _weAppUtils.getGotoHref;
  }
});
Object.defineProperty(exports, "DEFAULTRouteMatch", {
  enumerable: true,
  get: function get() {
    return _weAppUtils.DEFAULTRouteMatch;
  }
});
Object.defineProperty(exports, "AppLocation", {
  enumerable: true,
  get: function get() {
    return _weAppUtils.AppLocation;
  }
});
Object.defineProperty(exports, "parseLocate", {
  enumerable: true,
  get: function get() {
    return _weAppUtils.parseLocate;
  }
});

require("./routing/event-intercept");

var _singleSpa = require("single-spa");

var _routing = require("./routing/routing");

var _weapp = require("./weapp");

var _hooks = require("./hooks");

var _context3 = require("./context");

var _weAppResourceLoader = require("@saasfe/we-app-resource-loader");

var _weAppTypes = require("@saasfe/we-app-types");

var _weAppUtils = require("@saasfe/we-app-utils");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
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
/* 路由拦截与singleSpa初始化的顺序必须是事件拦截、初始化singleSpa、方法拦截 */
// 路由事件拦截


var startPromise; // 设置resourceLoader

(0, _weapp.setResourceLoader)(_weAppResourceLoader.DefaultResourceLoader); // 注册内置扩展

(0, _weapp.usingHooks)(_hooks.buildinHooks);

function _start() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _weapp.registerHookPages)();

          case 2:
            _context.next = 4;
            return (0, _weapp.requireChildrenInited)();

          case 4:
            _context.next = 6;
            return (0, _routing.startRouting)();

          case 6:
            // 初始化页面
            (0, _weapp.startRootProduct)(); // singleSpa要求必须调用

            (0, _singleSpa.start)();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

function start() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!startPromise) {
              // 启动父应用
              startPromise = _start();
            } else {
              // 重启父应用，需要在上次启动之后
              startPromise.then(function () {
                startPromise = _start();
              });
            }

            return _context2.abrupt("return", startPromise);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}