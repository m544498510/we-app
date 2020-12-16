"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var is403 = false;
var hook403Desc = {
  page: {
    hooks: ['pageContainer', '500'],
    activityFunction: function activityFunction() {
      return is403;
    }
  },
  beforeRouting: function beforeRouting(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _param$opts$excludePa, excludePages, _param$hookPages, hookPages, pageScope, hookPageScope, pageName, check403, pageAuth, res;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _param$opts$excludePa = param.opts.excludePages, excludePages = _param$opts$excludePa === void 0 ? [] : _param$opts$excludePa, _param$hookPages = param.hookPages, hookPages = _param$hookPages === void 0 ? [] : _param$hookPages, pageScope = param.pageScope, hookPageScope = param.hookPageScope;
              pageName = (0, _weAppUtils.getScopeName)(pageScope); // 从当前路由解析出当前激活的页面

              if (!(pageName && hookPages.concat(excludePages).indexOf(pageName) === -1)) {
                _context.next = 15;
                break;
              }

              if (!pageScope) {
                _context.next = 15;
                break;
              }

              check403 = param.opts.check403;
              pageAuth = pageScope.getConfig('pageAuth');

              if (pageAuth === undefined) {
                pageAuth = pageScope.getConfig('pageAuthCode');
              }

              if (check403) {
                _context.next = 10;
                break;
              }

              is403 = false;
              return _context.abrupt("return");

            case 10:
              _context.next = 12;
              return check403(pageAuth);

            case 12:
              res = _context.sent;
              is403 = !!res;

              if (is403 && hookPageScope) {
                // 设置hook 403页面渲染参数
                hookPageScope.setCustomProps(res);
              }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  },
  beforeMount: function beforeMount() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", !is403);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }
};
var hook403 = {
  hookName: '403',
  hookDesc: hook403Desc
};
var _default = hook403;
exports["default"] = _default;