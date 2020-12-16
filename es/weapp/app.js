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

import { BaseType } from '@saasfe/we-app-types';
import Base from './base';
import Page from './page';
import { getScopeName } from '@saasfe/we-app-utils'; // 已注册页面都记录在这里
// 主要用于首次访问时获取activeScopes

var registedPages = [];

var App = /*#__PURE__*/function (_Base) {
  _inherits(App, _Base);

  var _super2 = _createSuper(App);

  function App(config) {
    var _this;

    _classCallCheck(this, App);

    _this = _super2.call(this, config);
    _this.type = BaseType.app;

    if (config) {
      _this.registerPages(config.pages);
    }

    return _this;
  }

  _createClass(App, [{
    key: "registerPages",
    value: function registerPages() {
      var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var cfgs, pages;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cfgs = this.filterPages(configs);

                if (!cfgs) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.registerChildren(cfgs, Page);

              case 4:
                pages = _context.sent;
                registedPages = registedPages.concat(pages);
                return _context.abrupt("return", pages);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "registerPage",
    value: function registerPage(cfg) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var config, page;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = this.filterPages(cfg);

                if (!config) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return this.registerChild(config, Page);

              case 4:
                page = _context2.sent;
                page && registedPages.push(page);
                return _context2.abrupt("return", page);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "filterPages",
    value: function filterPages(cfgs) {
      var filter = this.getConfig('filterPages');

      if (filter && typeof filter === 'function') {
        return filter(cfgs);
      }

      return cfgs;
    }
  }, {
    key: "getPage",
    value: function getPage(pageName) {
      return this.getChild(pageName);
    }
  }, {
    key: "registerChild",
    value: function registerChild(config, Child) {
      var _this2 = this;

      var _super = Object.create(null, {
        registerChild: {
          get: function get() {
            return _get(_getPrototypeOf(App.prototype), "registerChild", _this2);
          }
        }
      });

      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _super.registerChild.call(this, Object.assign(Object.assign({}, config), {
                  type: BaseType.page
                }), Child));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }]);

  return App;
}(Base);

export { App as default };
export function getActivePageScopes(location) {
  var excludePageNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var activeScopes = [];
  var activeFns = registedPages.filter(function (page) {
    var scope = page.compoundScope(page);
    var pageName = getScopeName(scope);
    return excludePageNames.indexOf(pageName) === -1;
  }).map(function (page) {
    return {
      page: page,
      activeFn: page.makeActivityFunction()
    };
  });
  activeFns.forEach(function (_ref) {
    var page = _ref.page,
        activeFn = _ref.activeFn;

    if (activeFn(location)) {
      activeScopes.push(page.compoundScope(page));
    }
  });
  return activeScopes;
}