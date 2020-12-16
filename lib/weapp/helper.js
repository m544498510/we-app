"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformAppConfig = transformAppConfig;

var _weAppUtils = require("@saasfe/we-app-utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function transformRoute(route) {
  if (['string', 'boolean', 'undefined'].indexOf(_typeof(route)) > -1) {
    return route;
  }

  var routes = Array.isArray(route) ? route : [route];
  return routes.map(function (r) {
    if (typeof r === 'string') {
      return r;
    }

    var rt = r;
    return Object.assign(Object.assign({}, rt), {
      // 此处忽略 absolute，之前都是通过 pathname: '/', absolute: true来指定首页
      path: rt.pathname
    });
  });
}

function transformAppConfig(microAppConfig, _ref) {
  var resourceLoader = _ref.resourceLoader;

  var _a;

  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var appConfig;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appConfig = microAppConfig;

            if (!(appConfig === null || appConfig === void 0 ? void 0 : appConfig.url)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return resourceLoader(appConfig.url, {
              useSystem: true
            });

          case 4:
            appConfig = _context.sent;
            appConfig = appConfig["default"] || appConfig;

          case 6:
            if (appConfig.microAppName && appConfig.modules) {
              appConfig = Object.assign({
                name: appConfig.microAppName,
                pages: appConfig.modules.map(function (module) {
                  return Object.assign(Object.assign({}, module), {
                    name: module.moduleName || module.module,
                    url: [module.getComponent],
                    route: transformRoute(module.route),
                    routeIgnore: transformRoute(module.routeIgnore)
                  });
                })
              }, appConfig);
            } // preload


            (_a = appConfig === null || appConfig === void 0 ? void 0 : appConfig.pages) === null || _a === void 0 ? void 0 : _a.forEach(function (_ref2) {
              var url = _ref2.url;

              var _a;

              (_a = url) === null || _a === void 0 ? void 0 : _a.forEach(function (resource) {
                (0, _weAppUtils.resourcePreloader)(resource);
              });
            });
            return _context.abrupt("return", appConfig);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}