function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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
/**
 * 首次访问时，需要执行beforeRouting，
 * 而此时一旦向singleSpa中注册了页面，则会触发singleSpa的reroute，
 * 导致页面直接进入渲染，跳过了生命周期routing
 * 所以，需要先缓存配置，再统一执行singleSpa注册，
 * 在首次访问时，通过调用page的makeActivityFunction，手动获取activeScopes
 */


import { registerApplication, unloadApplication } from 'single-spa';
import { getScopeName, makeSafeScope, ajustPathname, isValidElement, DEFAULTRouteMatch as routeMatchFn } from '@saasfe/we-app-utils';
import { BaseType, LifecycleHookEnum, DataName, RouterType } from '@saasfe/we-app-types';
import { runLifecycleHook } from '../hooks';
import { matchHomepage } from './homepage';
import { getContext } from '../context';
import Base from './base';

var Page = /*#__PURE__*/function (_Base) {
  _inherits(Page, _Base);

  var _super = _createSuper(Page);

  function Page(config) {
    var _this;

    _classCallCheck(this, Page);

    _this = _super.call(this, config);
    _this.type = BaseType.page;

    if (config.path) {
      config.route = config.path;
    }

    _this.setInited();

    return _this;
  }

  _createClass(Page, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var scope = this.compoundScope(this);
      registerApplication(getScopeName(scope), {
        bootstrap: function bootstrap() {
          return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        },
        mount: function mount(customProps) {
          return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return this.load({
                      customProps: customProps,
                      scope: scope
                    });

                  case 2:
                    this.component = _context2.sent;
                    _context2.next = 5;
                    return this.mount({
                      customProps: customProps,
                      scope: scope,
                      component: this.component
                    });

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        },
        unmount: function unmount(customProps) {
          return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return this.unmount({
                      customProps: customProps,
                      scope: scope,
                      component: this.component
                    });

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        }
      }, this.makeActivityFunction(), {
        pageScope: makeSafeScope(scope),
        appBasename: this.getAppBasename(),
        basename: this.getBasename(),
        routerType: this.getRouterType()
      });
    }
  }, {
    key: "getRender",
    value: function getRender() {
      var render = _get(_getPrototypeOf(Page.prototype), "getRender", this).call(this);

      if (render) {
        var renderWrapper = render;

        if (this.type === BaseType.page) {
          var container = this.getPageContainer();
          renderWrapper = {
            mount: function mount(element, node, customProps) {
              render.mount(element, node || container, customProps);
            },
            unmount: function unmount(node, element, customProps) {
              render.unmount(node || container, element, customProps);
            }
          };
        }

        return renderWrapper;
      }
    }
  }, {
    key: "getAppBasename",
    value: function getAppBasename() {
      // 整个站点的路由前缀，如代运营场景中 /xxx/xxx/xxx/saas-crm
      var appBasename = this.getData(DataName.basename, true) || '';
      return ajustPathname("/".concat(appBasename));
    }
  }, {
    key: "getBasename",
    value: function getBasename() {
      var scope = this.compoundScope(this);
      var _scope$productName = scope.productName,
          productName = _scope$productName === void 0 ? '' : _scope$productName,
          _scope$appName = scope.appName,
          appName = _scope$appName === void 0 ? '' : _scope$appName,
          app = scope.app;
      var appBasename = this.getData(DataName.basename, true) || '';
      var basename = app.getConfig('basename');

      if (basename) {
        return ajustPathname("/".concat(appBasename, "/").concat(basename));
      }

      return ajustPathname("/".concat(appBasename, "/").concat(productName, "/").concat(appName));
    }
  }, {
    key: "makeActivityFunction",
    value: function makeActivityFunction() {
      var _this3 = this;

      var config = this.getConfig();
      var routerType = this.getRouterType();
      var routeIgnore = config.routeIgnore,
          afterRouteDiscover = config.afterRouteDiscover;
      var route = config.route; // 兼容规范：https://yuque.antfin-inc.com/ele-fe/zgm9ar/lmk4t9

      route = config.path || route;
      var activityFunction = config.activityFunction; // hook添加的页面会返回activityFunction

      if (activityFunction) {
        return function (location) {
          var match = activityFunction(location);
          afterRouteDiscover && afterRouteDiscover(match);
          return match;
        };
      }

      if (route === true && !routeIgnore) {
        activityFunction = function activityFunction() {
          afterRouteDiscover && afterRouteDiscover(true);
          return true;
        };
      } else {
        activityFunction = function activityFunction(location) {
          var productBasename = _this3.getAppBasename();

          var pathname = location.pathname;

          if (routerType === RouterType.hash) {
            var matchPath = location.hash.match(/^#([^?]*)/);

            if (matchPath) {
              pathname = matchPath[1];
            }

            pathname = pathname || '/';
          } // 匹配首页


          var match = [productBasename, "".concat(productBasename, "/")].indexOf(pathname) > -1 && matchHomepage(_this3.compoundScope(_this3)); // 匹配页面路由

          if (!match) {
            match = routeMatchFn(Object.assign(Object.assign({}, config), {
              route: route,
              basename: _this3.getBasename(),
              appBasename: _this3.getAppBasename(),
              locate: location,
              routerType: routerType
            }));
          }

          afterRouteDiscover && afterRouteDiscover(match);
          return match;
        };
      }

      return activityFunction;
    }
  }, {
    key: "setCustomProps",
    value: function setCustomProps(customProps) {
      this.setData(DataName.customProps, customProps);
    }
  }, {
    key: "load",
    value: function load(_ref) {
      var scope = _ref.scope;
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this$getResourceLoad, resourceLoader, resourceLoaderOpts, url, component;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return runLifecycleHook(LifecycleHookEnum.beforeLoad, [scope]);

              case 2:
                _this$getResourceLoad = this.getResourceLoader(), resourceLoader = _this$getResourceLoad.desc, resourceLoaderOpts = _this$getResourceLoad.config;
                url = this.getConfig('url') || [];
                component = resourceLoader.mount(url, makeSafeScope(scope), resourceLoaderOpts);
                _context4.next = 7;
                return runLifecycleHook(LifecycleHookEnum.afterLoad, [scope]);

              case 7:
                return _context4.abrupt("return", component);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    }
  }, {
    key: "mount",
    value: function mount(_ref2) {
      var customProps = _ref2.customProps,
          scope = _ref2.scope,
          component = _ref2.component;

      var _a;

      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var isContinue, container, render;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return runLifecycleHook(LifecycleHookEnum.beforeMount, [scope]);

              case 2:
                isContinue = _context5.sent;

                if (isContinue) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 6;
                return runLifecycleHook(LifecycleHookEnum.onMountPrevented, [scope]);

              case 6:
                return _context5.abrupt("return");

              case 7:
                container = this.getPageContainer();

                if (isValidElement(container)) {
                  _context5.next = 11;
                  break;
                }

                // 没有渲染容器，但是singleSpa仍然做了渲染
                // 需要调整当前app的状态，以便singleSpa下次再渲染
                unloadApplication(getScopeName(scope));
                return _context5.abrupt("return");

              case 11:
                render = this.getRender();
                (_a = render === null || render === void 0 ? void 0 : render.mount) === null || _a === void 0 ? void 0 : _a.call(render, component, container, Object.assign(Object.assign(Object.assign({}, this.getData(DataName.customProps)), customProps), {
                  context: getContext()
                })); // 页面未渲染则认为没有mount

                _context5.next = 15;
                return runLifecycleHook(LifecycleHookEnum.afterMount, [scope]);

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }, {
    key: "unmount",
    value: function unmount(_ref3) {
      var customProps = _ref3.customProps,
          scope = _ref3.scope,
          component = _ref3.component;

      var _a;

      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var isContinue, container, render, _this$getResourceLoad2, resourceLoader, resourceLoaderOpts, url;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return runLifecycleHook(LifecycleHookEnum.beforeUnmount, [scope]);

              case 2:
                isContinue = _context6.sent;

                if (isContinue) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return");

              case 5:
                container = this.getPageContainer();

                if (container) {
                  render = this.getRender();
                  (_a = render === null || render === void 0 ? void 0 : render.unmount) === null || _a === void 0 ? void 0 : _a.call(render, container, component, Object.assign(Object.assign(Object.assign({}, this.getData(DataName.customProps)), customProps), {
                    context: getContext()
                  }));
                }

                _this$getResourceLoad2 = this.getResourceLoader(), resourceLoader = _this$getResourceLoad2.desc, resourceLoaderOpts = _this$getResourceLoad2.config;
                url = this.getConfig('url') || [];
                resourceLoader.unmount(url, makeSafeScope(scope), resourceLoaderOpts); // afterUnmount

                _context6.next = 12;
                return runLifecycleHook(LifecycleHookEnum.afterUnmount, [scope]);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
    }
  }]);

  return Page;
}(Base);

export { Page as default };