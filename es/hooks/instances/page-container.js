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

import { getElement, isValidElement } from '@saasfe/we-app-utils';

function DefaultCreatePageContainer(param) {
  if (!param.pageScope.pageName) {
    return;
  }

  var hookScope = param.hookScope;
  var skeletonContainer = param.opts.skeletonContainer;
  var elSkeleton = hookScope.getData('skeletonContainer', true) || getElement(skeletonContainer);

  if (isValidElement(elSkeleton)) {
    var _param$opts = param.opts,
        _param$opts$specialSe = _param$opts.specialSelectors,
        specialSelectors = _param$opts$specialSe === void 0 ? {} : _param$opts$specialSe,
        contentContainer = _param$opts.contentContainer;
    var _param$pageScope = param.pageScope,
        _param$pageScope$prod = _param$pageScope.productName,
        productName = _param$pageScope$prod === void 0 ? '' : _param$pageScope$prod,
        _param$pageScope$appN = _param$pageScope.appName,
        appName = _param$pageScope$appN === void 0 ? '' : _param$pageScope$appN,
        _param$pageScope$page = _param$pageScope.pageName,
        pageName = _param$pageScope$page === void 0 ? '' : _param$pageScope$page;
    var pageContainerId = [productName, appName, pageName].filter(function (n) {
      return n;
    }).join('__');
    var selector = specialSelectors[pageContainerId];
    var elPageContainer = selector && elSkeleton.querySelector(selector);

    if (!isValidElement(elPageContainer)) {
      var elContent = hookScope.getData('contentContainer', true) || getElement(contentContainer, elSkeleton) || elSkeleton;

      if (isValidElement(elContent)) {
        elPageContainer = document.createElement('div');
        elPageContainer.id = pageContainerId;
        elContent.appendChild(elPageContainer);
      }
    }

    return elPageContainer;
  }
}

var hookPageContainerDesc = {
  beforeLoad: function beforeLoad(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var createPageContainer, pageScope, elPageContainer;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 生成页面容器，容器存储到scope中
              createPageContainer = param.opts.createPageContainer, pageScope = param.pageScope;

              if (createPageContainer) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              elPageContainer = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getPageContainer();

              if (!isValidElement(elPageContainer)) {
                elPageContainer = createPageContainer(param);

                if (isValidElement(elPageContainer)) {
                  pageScope === null || pageScope === void 0 ? void 0 : pageScope.setPageContainer(elPageContainer);
                } else {
                  pageScope === null || pageScope === void 0 ? void 0 : pageScope.setPageContainer(null);
                }
              } else {
                pageScope === null || pageScope === void 0 ? void 0 : pageScope.setPageContainer(null);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  },
  beforeMount: function beforeMount(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var pageScope, elPageContainer;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              pageScope = param.pageScope;
              elPageContainer = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getPageContainer();

              if (isValidElement(elPageContainer)) {
                elPageContainer.style.display = '';
              } else {
                pageScope === null || pageScope === void 0 ? void 0 : pageScope.setPageContainer(null);
              }

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  },
  onMountPrevented: function onMountPrevented(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var pageScope, elPageContainer;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // 隐藏页面容器
              pageScope = param.pageScope;
              elPageContainer = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getPageContainer();

              if (isValidElement(elPageContainer)) {
                elPageContainer.style.display = 'none';
              } else {
                pageScope === null || pageScope === void 0 ? void 0 : pageScope.setPageContainer(null);
              }

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
  },
  afterUnmount: function afterUnmount(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var pageScope, elPageContainer;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // 隐藏页面容器
              pageScope = param.pageScope;
              elPageContainer = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getPageContainer();

              if (isValidElement(elPageContainer)) {
                elPageContainer.style.display = 'none';
              } else {
                pageScope === null || pageScope === void 0 ? void 0 : pageScope.setPageContainer(null);
              }

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
  },
  onError: function onError(param) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var pageScope, elPageContainer;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // 隐藏页面容器
              pageScope = param.pageScope;
              elPageContainer = pageScope === null || pageScope === void 0 ? void 0 : pageScope.getPageContainer();

              if (isValidElement(elPageContainer)) {
                elPageContainer.style.display = 'none';
              } else {
                pageScope === null || pageScope === void 0 ? void 0 : pageScope.setPageContainer(null);
              }

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
  }
};
var hookPageContainer = {
  hookName: 'pageContainer',
  hookDesc: hookPageContainerDesc,
  config: {
    createPageContainer: DefaultCreatePageContainer
  }
};
export default hookPageContainer;