function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import Product from './product';
import { BuildinProductName, HookAppName, ScopeNameDivider } from '@saasfe/we-app-utils';
import { getActivePageScopes } from './app';
import { DefaultResourceLoader } from '@saasfe/we-app-resource-loader';
import { RouterType, BaseType, DataName } from '@saasfe/we-app-types';
import { getPageConfigs } from '../hooks';

var RootProduct = /*#__PURE__*/function (_Product) {
  _inherits(RootProduct, _Product);

  var _super = _createSuper(RootProduct);

  function RootProduct() {
    var _this;

    _classCallCheck(this, RootProduct);

    _this = _super.apply(this, arguments);
    _this.type = BaseType.root;
    _this.parent = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(RootProduct, [{
    key: "registerProducts",
    value: function registerProducts() {
      var _this2 = this;

      var cfgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.setInitDeferred();
      var pProducts = cfgs.map(function (cfg) {
        return _this2.registerProduct(cfg);
      });
      Promise.all(pProducts).then(function () {
        _this2.setInited();
      });
      return pProducts;
    }
  }, {
    key: "registerProduct",
    value: function registerProduct(cfg) {
      return this.registerChild(cfg, Product);
    }
  }, {
    key: "getProduct",
    value: function getProduct(productName) {
      var product = this.getChild(productName);

      if (!product || product.type !== BaseType.product) {
        return;
      }

      return product;
    }
  }, {
    key: "getScope",
    value: function getScope(scopeName) {
      var scope = this.parseScopeName(scopeName);

      if (!scope) {
        return;
      }

      if (scope.hookName) {
        var buildinProduct = this.getProduct(BuildinProductName); // we-app 延迟加载时，buildinProduct会不存在，导致报错

        if (buildinProduct) {
          var hookApp = buildinProduct.getApp(HookAppName);
          scope.product = buildinProduct;
          scope.app = hookApp;
          scope.page = hookApp.getPage(scope.hookName);
        }
      } else if (scope.pageName) {
        if (!scope.productName) {
          scope.product = this;
          scope.app = this.getApp(scope.appName);
          scope.page = scope.app.getPage(scope.pageName);
        } else {
          scope.product = this.getProduct(scope.productName);
          scope.app = scope.product.getApp(scope.appName);
          scope.page = scope.app.getPage(scope.pageName);
        }
      }

      return scope;
    }
  }, {
    key: "registerHookPages",
    value: function registerHookPages() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var pageConfigs, hookApp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 注册hook页面
                pageConfigs = getPageConfigs();
                _context.next = 3;
                return this.registerHookApp();

              case 3:
                hookApp = _context.sent;
                hookApp.registerPages(pageConfigs);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "registerHookApp",
    value: function registerHookApp() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var buildinProduct, hookApp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.registerProduct({
                  name: BuildinProductName
                });

              case 2:
                buildinProduct = _context2.sent;
                _context2.next = 5;
                return buildinProduct.registerApp({
                  name: HookAppName
                });

              case 5:
                hookApp = _context2.sent;
                return _context2.abrupt("return", hookApp);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "parseScopeName",
    value: function parseScopeName(scopeName) {
      var scope = {
        scopeName: scopeName
      };
      var paths = scopeName.split(ScopeNameDivider);
      var pathsLen = paths.length;

      if (pathsLen === 3) {
        scope.productName = paths[0];
        scope.appName = paths[1];
        scope.pageName = paths[2];

        if (paths[1] === HookAppName) {
          scope.hookName = paths[2];
        }
      } else if (pathsLen === 2) {
        // 可能是产品、微应用，也可能是微应用、页面
        var name = paths[0];
        var child = this.getChild(name);

        if (child) {
          if (child.type === BaseType.product) {
            scope.productName = name;
            scope.product = child;
            scope.appName = paths[1];
          } else {
            scope.appName = paths[0];
            scope.app = child;
            scope.pageName = paths[1];
          }
        }
      } else if (pathsLen === 1) {
        // 可能是产品，可能是微应用
        var _name = paths[0];

        var _child = this.getChild(_name);

        if (_child) {
          if (_child.type === BaseType.product) {
            scope.productName = _name;
            scope.product = _child;
          } else {
            scope.appName = _name;
            scope.app = _child;
          }
        }
      }

      if (Object.keys(scope).length === 1) {
        return;
      }

      return scope;
    }
  }]);

  return RootProduct;
}(Product);

var rootProduct = new RootProduct({
  resourceLoader: DefaultResourceLoader,
  routerType: RouterType.browser
});
export var registerApps = rootProduct.registerApps.bind(rootProduct);
export var usingHooks = rootProduct.usingHooks.bind(rootProduct);
export var configHooks = rootProduct.configHooks.bind(rootProduct);
export var registerHookPages = rootProduct.registerHookPages.bind(rootProduct);
export var startRootProduct = rootProduct.start.bind(rootProduct);
export var getScope = rootProduct.getScope.bind(rootProduct);
export var setConfig = rootProduct.setConfig.bind(rootProduct);
export var compoundScope = function compoundScope(base) {
  return rootProduct.compoundScope(base || rootProduct);
};
export var requireChildrenInited = rootProduct.requireChildrenInited.bind(rootProduct);
export var setData = rootProduct.setData.bind(rootProduct);
export var getData = rootProduct.getData.bind(rootProduct);
export var setResourceLoader = rootProduct.setResourceLoader.bind(rootProduct);
export var setPageContainer = rootProduct.setPageContainer.bind(rootProduct);
export var setRender = rootProduct.setRender.bind(rootProduct);
export var setRouterType = function setRouterType(routerType) {
  setData(DataName.routerType, routerType);
};
export var setBasename = function setBasename(basename) {
  setData(DataName.basename, basename);
};
export var setSkeletonContainer = function setSkeletonContainer(container) {
  setData('skeletonContainer', container);
};
export { getActivePageScopes };