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

import { isAncestorScope, resourcePreloader, ResourcePreloader } from '@saasfe/we-app-utils';

function getBasicLibsConfig(param) {
  var hookScope = param.hookScope,
      opts = param.opts;

  var _hookScope$getResourc = hookScope.getResourceLoader(),
      resourceLoader = _hookScope$getResourc.desc,
      resourceLoaderOpts = _hookScope$getResourc.config;

  var basicLibs = opts.url;
  var useSystem = opts.useSystem;
  return {
    hookScope: hookScope,
    basicLibs: basicLibs,
    resourceLoader: resourceLoader,
    resourceLoaderOpts: Object.assign(Object.assign({}, resourceLoaderOpts), {
      useSystem: useSystem
    }),
    opts: opts
  };
}

var hookBasicLibsDesc = {
  beforeRouting: {
    exec: function exec(param) {
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _a, _getBasicLibsConfig, hookScope, resourceLoaderOpts, basicLibs, resourceLoader, opts;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 加载当前scope的基础库
                _getBasicLibsConfig = getBasicLibsConfig(param), hookScope = _getBasicLibsConfig.hookScope, resourceLoaderOpts = _getBasicLibsConfig.resourceLoaderOpts, basicLibs = _getBasicLibsConfig.basicLibs, resourceLoader = _getBasicLibsConfig.resourceLoader, opts = _getBasicLibsConfig.opts;

                if (hookScope.getData('basicLibsLoaded')) {
                  _context.next = 8;
                  break;
                }

                hookScope.setData('basicLibsLoaded', true); // 资源预加载

                basicLibs.forEach(function (resource, i) {
                  resourcePreloader(resource, ResourcePreloader.preload);
                }); // 加载静态资源

                _context.next = 6;
                return basicLibs.reduce(function (p, r) {
                  return p.then(function () {
                    // console.log('basicLibs before', r);
                    resourceLoader.mount(r, param.pageScope, resourceLoaderOpts); // console.log('basicLibs after', r);
                  });
                }, Promise.resolve());

              case 6:
                _context.next = 8;
                return (_a = opts === null || opts === void 0 ? void 0 : opts.afterLoad) === null || _a === void 0 ? void 0 : _a.call(opts);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    },
    clear: function clear(param) {
      return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var hookScope, nextHookDescRunnerParam, nextHookScope, _getBasicLibsConfig2, basicLibs, resourceLoader, resourceLoaderOpts, base;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // scope发生变化时，卸载上一个scope的基础库
                hookScope = param.hookScope, nextHookDescRunnerParam = param.nextHookDescRunnerParam;
                nextHookScope = nextHookDescRunnerParam.hookScope; // nextHookScope与当前hookScope是父子关系，不清除

                if (!nextHookScope || !isAncestorScope(hookScope, nextHookScope)) {
                  _getBasicLibsConfig2 = getBasicLibsConfig(param), basicLibs = _getBasicLibsConfig2.basicLibs, resourceLoader = _getBasicLibsConfig2.resourceLoader, resourceLoaderOpts = _getBasicLibsConfig2.resourceLoaderOpts, base = _getBasicLibsConfig2.hookScope;
                  basicLibs.forEach(function (r) {
                    resourceLoader.unmount(r, param.pageScope, resourceLoaderOpts);
                  });
                  base.setData('basicLibsLoaded', false);
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
    }
  }
};
var hookBasicLibs = {
  hookName: 'basicLibs',
  hookDesc: hookBasicLibsDesc,
  config: {
    url: [],
    useSystem: false
  }
};
export default hookBasicLibs;