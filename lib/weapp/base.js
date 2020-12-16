"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _get = _interopRequireDefault(require("lodash-es/get"));

var _weAppTypes = require("@saasfe/we-app-types");

var _weAppUtils = require("@saasfe/we-app-utils");

var _hooks = require("../hooks");

var _using = require("../hooks/using");

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var Base = /*#__PURE__*/function () {
  function Base(config) {
    _classCallCheck(this, Base);

    this.children = [];
    this.data = {};
    this.isStarted = false;
    this.config = config;

    if (config) {
      this.name = config.name;
      this.parent = config.parent;
      this.type = config.type;

      if (config.hookName) {
        this.hookName = config.hookName;
      }

      if (config.hooks) {
        (0, _hooks.usingHooks)(config.hooks, [this.compoundScope(this)]);
      }
    }
  } // 执行


  _createClass(Base, [{
    key: "start",
    value: function start() {
      if (this.isStarted) {
        return;
      }

      this.isStarted = true;
      this.children.forEach(function (child) {
        child.start();
      });
    }
  }, {
    key: "compoundScope",
    value: function compoundScope(base) {
      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _a;

      if (base.type === _weAppTypes.BaseType.root) {
        if (!scope.product) {
          scope.product = base;
          scope.productName = base.name;
        }

        if (!scope.root) {
          var sandbox = this.getSandbox(scope);
          scope.root = ((_a = sandbox === null || sandbox === void 0 ? void 0 : sandbox.getContext) === null || _a === void 0 ? void 0 : _a.call(sandbox)) || window;
          scope.sandbox = sandbox;
        }

        return scope;
      }

      scope["".concat(base.type, "Name")] = base.name;
      scope[base.type] = base;

      if (base.hookName) {
        scope.hookName = base.hookName;
      }

      return this.compoundScope(base.parent, scope);
    }
  }, {
    key: "getInited",
    value: function getInited() {
      var _a;

      return (_a = this.initDeferred) === null || _a === void 0 ? void 0 : _a.promise;
    }
  }, {
    key: "requireChildrenInited",
    value: function requireChildrenInited() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var pInited, pSelfInited, initStatus;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pInited = [];
                pSelfInited = this.getInited();

                if (pSelfInited) {
                  pInited.push(pSelfInited);
                } else if (this.children) {
                  this.children.forEach(function (child) {
                    // 为undefined，则直接向下一级探索
                    var pChildInited = child.getInited();

                    if (pChildInited) {
                      pInited.push(pChildInited);
                    } else {
                      var pChildrenInited = child.requireChildrenInited();
                      pInited.push(pChildrenInited);
                    }
                  });
                }

                _context.next = 5;
                return Promise.all(pInited);

              case 5:
                initStatus = _context.sent;
                return _context.abrupt("return", initStatus);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "getConfig",
    value: function getConfig(pathname) {
      var config = Object.assign({}, this.config); // 先从本级获取

      if (pathname) {
        config = (0, _get["default"])(this.config, pathname); // 再向上级查找

        if (config === undefined && this.type !== _weAppTypes.BaseType.root) {
          config = this.parent.getConfig(pathname);
        }
      }

      return config;
    }
  }, {
    key: "setConfig",
    value: function setConfig(config, value) {
      if (typeof config === 'string') {
        this.config[config] = value;
        return;
      }

      this.config = Object.assign(Object.assign({}, this.config), config);
    }
  }, {
    key: "getData",
    value: function getData(pathname) {
      var traced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!pathname) {
        return;
      }

      var data = (0, _get["default"])(this.data, pathname);

      if (traced && !data && this.type !== _weAppTypes.BaseType.root) {
        data = this.parent.getData(pathname, traced);
      }

      return data;
    }
  }, {
    key: "setData",
    value: function setData(pathname, data) {
      if (_typeof(pathname) === 'object') {
        this.data = Object.assign(Object.assign({}, this.data), pathname);
        return;
      }

      this.data[pathname] = data;
    }
  }, {
    key: "usingHooks",
    value: function usingHooks(params, scopes) {
      (0, _hooks.usingHooks)(params, scopes || [this.compoundScope(this)]);
    }
  }, {
    key: "configHooks",
    value: function configHooks(params, scopes) {
      (0, _using.configHooks)(params, scopes || [this.compoundScope(this)]);
    }
  }, {
    key: "getResourceLoader",
    value: function getResourceLoader() {
      // 先从全局设置对应scope中获取配置
      var scope = this.compoundScope(this);
      var scopeName = (0, _weAppUtils.getScopeName)(scope);
      var config = (0, _config.getGlobalConfig)(_weAppTypes.ConfigName.resourceLoader, scopeName);

      if (!config && this.type !== _weAppTypes.BaseType.root) {
        config = this.parent.getResourceLoader();
      }

      return config;
    }
  }, {
    key: "setResourceLoader",
    value: function setResourceLoader(resourceLoader, scopes) {
      (0, _config.setResourceLoader)(resourceLoader, (resourceLoader === null || resourceLoader === void 0 ? void 0 : resourceLoader.scopes) || scopes || [this.compoundScope(this)]);
    }
  }, {
    key: "getPageContainer",
    value: function getPageContainer() {
      var config; // 从全局设置对应scope中获取配置

      var scope = this.compoundScope(this);
      var scopeName = (0, _weAppUtils.getScopeName)(scope);
      config = (0, _config.getGlobalConfig)(_weAppTypes.ConfigName.pageContainer, scopeName); // 由于可以通过 setPageContainer 设置页面容器
      // 可能会设置到全站或应用级别
      // 所以需要向上遍历页面容器

      if (!config && this.type !== _weAppTypes.BaseType.root) {
        config = this.parent.getPageContainer();
      }

      return config;
    }
  }, {
    key: "setPageContainer",
    value: function setPageContainer(pageContainer, scopes) {
      (0, _config.setPageContainer)(pageContainer, scopes || [this.compoundScope(this)]);
    }
  }, {
    key: "getRender",
    value: function getRender() {
      // 先从全局设置对应scope中获取配置
      var scope = this.compoundScope(this);
      var scopeName = (0, _weAppUtils.getScopeName)(scope);
      var config = (0, _config.getGlobalConfig)(_weAppTypes.ConfigName.render, scopeName);

      if (!config && this.type !== _weAppTypes.BaseType.root) {
        config = this.parent.getRender();
      }

      return config;
    }
  }, {
    key: "setRender",
    value: function setRender(render, scopes) {
      (0, _config.setRender)(render, scopes || [this.compoundScope(this)]);
    }
  }, {
    key: "setSandbox",
    value: function setSandbox(sandbox, scopes) {
      (0, _config.setSandbox)(sandbox, scopes || [this.compoundScope(this)]);
    }
  }, {
    key: "getSandbox",
    value: function getSandbox(pageScope) {
      var scope = pageScope || this.compoundScope(this);
      var scopeName = (0, _weAppUtils.getScopeName)(scope);
      var config = (0, _config.getGlobalConfig)(_weAppTypes.ConfigName.sandbox, scopeName);

      if (!config && this.type !== _weAppTypes.BaseType.root) {
        config = this.parent.getSandbox();
      }

      return config;
    }
  }, {
    key: "getRouterType",
    value: function getRouterType() {
      return this.getData(_weAppTypes.DataName.routerType, true) || _weAppTypes.RouterType.browser;
    }
  }, {
    key: "registerChildren",
    value: function registerChildren(cfgs, Child) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var pChildren, children;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                pChildren = cfgs.map(function (config) {
                  return _this.registerChild(config, Child);
                });
                _context2.next = 3;
                return Promise.all(pChildren);

              case 3:
                children = _context2.sent;
                return _context2.abrupt("return", children.filter(function (child) {
                  return child;
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
    }
  }, {
    key: "registerChild",
    value: function registerChild(config, Child) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var child;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                child = this.getChild(config.name);

                if (!child) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", child);

              case 3:
                child = new Child(Object.assign(Object.assign({}, config), {
                  parent: this
                }));
                this.children.push(child);
                return _context3.abrupt("return", child);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "setInitDeferred",
    value: function setInitDeferred() {
      if (!this.initDeferred || this.initDeferred.finished()) {
        this.initDeferred = new _weAppUtils.Deferred();
      }
    }
  }, {
    key: "setInited",
    value: function setInited() {
      this.setInitDeferred();
      this.initDeferred.resolve(this);
    }
  }, {
    key: "getChild",
    value: function getChild(name) {
      var child = this.children.find(function (c) {
        return c.name === name;
      });
      return child;
    }
  }]);

  return Base;
}();

exports["default"] = Base;