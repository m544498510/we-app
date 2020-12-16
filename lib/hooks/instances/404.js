"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var is404 = false;
var hook404Desc = {
  page: {
    hooks: ['pageContainer', '500'],
    activityFunction: function activityFunction() {
      return is404;
    }
  },
  beforeRouting: function beforeRouting(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _param$opts$excludePa, excludePages, _param$activePages, activePages, _param$hookPages, hookPages, exPages, alivePages;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _param$opts$excludePa = param.opts.excludePages, excludePages = _param$opts$excludePa === void 0 ? [] : _param$opts$excludePa, _param$activePages = param.activePages, activePages = _param$activePages === void 0 ? [] : _param$activePages, _param$hookPages = param.hookPages, hookPages = _param$hookPages === void 0 ? [] : _param$hookPages;
              exPages = hookPages.concat(excludePages);
              alivePages = activePages.filter(function (activePage) {
                return exPages.indexOf(activePage) === -1;
              });
              is404 = alivePages.length === 0;

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }
};
var hook404 = {
  hookName: '404',
  hookDesc: hook404Desc
};
var _default = hook404;
exports["default"] = _default;