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

var is500 = false;
var hook500Desc = {
  page: {
    hooks: ['pageContainer', '500'],
    activityFunction: function activityFunction() {
      return is500;
    }
  },
  beforeRouting: function beforeRouting() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              is500 = false;

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  },
  onError: function onError(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var hookPageScope, error;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              hookPageScope = param.hookPageScope, error = param.error;

              if (hookPageScope) {
                hookPageScope.setCustomProps({
                  error: error
                });
              }

              is500 = true;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  }
};
var hook500 = {
  hookName: '500',
  hookDesc: hook500Desc
};
var _default = hook500;
exports["default"] = _default;