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

var hookSkeletonDesc = {
  beforeRouting: {
    exec: function exec(param) {
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var hookScope, container, _param$opts, template, contentSelector, div, skeletonContainer, df, contentContainer;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                hookScope = param.hookScope; // 渲染骨架

                container = param.opts.container;
                _param$opts = param.opts, template = _param$opts.template, contentSelector = _param$opts.contentSelector; // we-app 延迟加载时，container会不存在

                if (!hookScope.getData('skeletonContainer') && container) {
                  div = document.createElement('div');
                  div.innerHTML = template;
                  skeletonContainer = div.children[0];
                  df = document.createDocumentFragment();
                  df.appendChild(skeletonContainer);

                  if (!container) {
                    // 回溯到父骨架
                    container = hookScope.getData('contentContainer', true);
                  }

                  container.appendChild(df);
                  hookScope.setData('skeletonContainer', skeletonContainer);
                  contentContainer = skeletonContainer.querySelector(contentSelector);
                  hookScope.setData('contentContainer', contentContainer);
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    },
    clear: function clear(param) {
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var hookScope, nextHookDescRunnerParam, nextHookScope, elSkeleton, container;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hookScope = param.hookScope, nextHookDescRunnerParam = param.nextHookDescRunnerParam;
                nextHookScope = nextHookDescRunnerParam.hookScope;
                elSkeleton = hookScope.getData('skeletonContainer');
                container = param.opts.container; // 需要处理取父骨架的情况，取父骨架的内容区

                if (!container) {
                  // 回溯到父骨架
                  container = hookScope.getData('contentContainer', true);
                }

                if (nextHookScope) {
                  _context2.next = 8;
                  break;
                }

                container.removeChild(elSkeleton);
                return _context2.abrupt("return");

              case 8:
                // 跨产品时，是否需要隐藏当前skeleton
                // 当是父子关系时，父级不可清除
                // 不为父子关系则清除
                if (nextHookScope.getData('skeletonContainer', true) !== elSkeleton) {
                  container.removeChild(elSkeleton);
                }

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
    }
  }
};
var hookSkeleton = {
  hookName: 'skeleton',
  hookDesc: hookSkeletonDesc
};
export default hookSkeleton;