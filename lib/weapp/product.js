"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./app"));

var _base = _interopRequireDefault(require("./base"));

var _weAppTypes = require("@saasfe/we-app-types");

var _helper = require("./helper");

var _context5 = require("../context");

var _weAppUtils = require("@saasfe/we-app-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
/**
 * 定义产品级别的共用的功能
 * 1. 基础dom结构，每个产品可单独定义
 * 2. 要加载的基础资源，每个产品、微应用可单独定义
 * 3. 页面渲染实现，每个产品、微应用可单独定义
 * 4. 生命周期钩子，每个产品可单独定义，各个钩子根据条件(当前激活的产品、微应用、页面)决定是否被调用
 *    hooks被启用的位置，决定了其判断条件
 */


var Product = /*#__PURE__*/function (_Base) {
  _inherits(Product, _Base);

  var _super = _createSuper(Product);

  function Product(config) {
    var _this;

    _classCallCheck(this, Product);

    _this = _super.call(this, config);
    _this.type = _weAppTypes.BaseType.product;

    if (config.apps) {
      _this.registerApps(config.apps);
    }

    return _this;
  }

  _createClass(Product, [{
    key: "registerApps",
    value: function registerApps(cfgs, parser) {
      var _a;

      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var appConfigs, appListParser, pApps, apps;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setInitDeferred();
                appConfigs = cfgs;
                appListParser = ((_a = parser) === null || _a === void 0 ? void 0 : _a.appListParser) || parser;
                _context.next = 5;
                return this.parseAppConfigs(cfgs, appListParser);

              case 5:
                appConfigs = _context.sent;
                pApps = appConfigs.map(function (cfg) {
                  var _a;

                  return _this2.registerApp(cfg, (_a = parser) === null || _a === void 0 ? void 0 : _a.appConfigParser);
                });
                _context.next = 9;
                return Promise.all(pApps);

              case 9:
                apps = _context.sent;
                this.setInited();
                return _context.abrupt("return", apps);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "getApp",
    value: function getApp(appName) {
      var app = this.getChild(appName);

      if (!app || app.type !== _weAppTypes.BaseType.app) {
        return;
      }

      return app;
    }
  }, {
    key: "registerApp",
    value: function registerApp(config, parser) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var childConfig, child;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                childConfig = config;
                _context2.next = 3;
                return this.parseAppConfig(config, parser);

              case 3:
                childConfig = _context2.sent;
                _context2.next = 6;
                return this.registerChild(childConfig, _app["default"]);

              case 6:
                child = _context2.sent;
                return _context2.abrupt("return", child);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "parseAppConfigs",
    value: function parseAppConfigs(url, parser) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this3 = this;

        var appConfigs, _this$getResourceLoad, _resourceLoader, resourceLoaderOpts;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                appConfigs = url;

                if (!(typeof parser === 'function')) {
                  _context3.next = 6;
                  break;
                }

                _this$getResourceLoad = this.getResourceLoader(), _resourceLoader = _this$getResourceLoad.desc, resourceLoaderOpts = _this$getResourceLoad.config;
                _context3.next = 5;
                return parser(url, {
                  context: (0, _context5.getContext)(),
                  resourceLoader: function resourceLoader(resource, opts) {
                    return _resourceLoader === null || _resourceLoader === void 0 ? void 0 : _resourceLoader.mount(resource, _this3.compoundScope(_this3), Object.assign(Object.assign({}, resourceLoaderOpts), opts));
                  }
                });

              case 5:
                appConfigs = _context3.sent;

              case 6:
                // 预加载 app config
                appConfigs.forEach(function (_ref) {
                  var resource = _ref.url;
                  (0, _weAppUtils.resourcePreloader)(resource, _weAppUtils.ResourcePreloader.preload);
                });
                return _context3.abrupt("return", appConfigs);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "parseAppConfig",
    value: function parseAppConfig(config) {
      var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _helper.transformAppConfig;
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this4 = this;

        var appConfig, _this$getResourceLoad2, _resourceLoader2, resourceLoaderOpts;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                appConfig = config;

                if (!(typeof parser === 'function')) {
                  _context4.next = 6;
                  break;
                }

                _this$getResourceLoad2 = this.getResourceLoader(), _resourceLoader2 = _this$getResourceLoad2.desc, resourceLoaderOpts = _this$getResourceLoad2.config;
                _context4.next = 5;
                return parser(config, {
                  context: (0, _context5.getContext)(),
                  resourceLoader: function resourceLoader(url, opts) {
                    return _resourceLoader2 === null || _resourceLoader2 === void 0 ? void 0 : _resourceLoader2.mount(url, _this4.compoundScope(_this4), Object.assign(Object.assign({}, resourceLoaderOpts), opts));
                  }
                });

              case 5:
                appConfig = _context4.sent;

              case 6:
                appConfig = Object.assign(Object.assign({}, appConfig), config);
                return _context4.abrupt("return", appConfig);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    }
  }]);

  return Product;
}(_base["default"]);

exports["default"] = Product;