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

var hookLoadingDesc = {
  beforeLoad: function beforeLoad(_ref) {
    var pageScope = _ref.pageScope,
        element = _ref.opts.element;
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var render;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (element) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              render = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getRender();
              render === null || render === void 0 ? void 0 : render.mount(element, null
              /* 默认渲染到当前页面对应的容器内 */
              );

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  },
  onError: function onError(_ref2) {
    var pageScope = _ref2.pageScope,
        element = _ref2.opts.element;
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var render;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              render = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getRender();
              render === null || render === void 0 ? void 0 : render.unmount(null, element);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  },
  beforeMount: function beforeMount(_ref3) {
    var pageScope = _ref3.pageScope,
        element = _ref3.opts.element;
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var render;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              render = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getRender();
              render === null || render === void 0 ? void 0 : render.unmount(null, element);

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  }
};
var hookLoading = {
  hookName: 'loading',
  hookDesc: hookLoadingDesc
};
var _default = hookLoading;
exports["default"] = _default;