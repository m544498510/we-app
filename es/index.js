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
/* 路由拦截与singleSpa初始化的顺序必须是事件拦截、初始化singleSpa、方法拦截 */
// 路由事件拦截


import './routing/event-intercept'; // singleSpa初始化

import { start as startSingleSpa } from 'single-spa'; // 路由方法拦截

import { startRouting } from './routing/routing';
/* 以上顺序不可动，否则无法做路由事件拦截 */

import { registerApps, requireChildrenInited, startRootProduct, usingHooks, configHooks, setHomepage, registerHookPages, setResourceLoader, setPageContainer, setRender, setRouterType, setBasename, setSkeletonContainer } from './weapp';
import { buildinHooks } from './hooks';
import { setContext } from './context';
import { DefaultResourceLoader } from '@saasfe/we-app-resource-loader';
import { RouterType } from '@saasfe/we-app-types';
var startPromise; // 设置resourceLoader

setResourceLoader(DefaultResourceLoader); // 注册内置扩展

usingHooks(buildinHooks);

function _start() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return registerHookPages();

          case 2:
            _context.next = 4;
            return requireChildrenInited();

          case 4:
            _context.next = 6;
            return startRouting();

          case 6:
            // 初始化页面
            startRootProduct(); // singleSpa要求必须调用

            startSingleSpa();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

export function start() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!startPromise) {
              // 启动父应用
              startPromise = _start();
            } else {
              // 重启父应用，需要在上次启动之后
              startPromise.then(function () {
                startPromise = _start();
              });
            }

            return _context2.abrupt("return", startPromise);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}
export { setResourceLoader, setPageContainer, setRender, setSkeletonContainer, DefaultResourceLoader, usingHooks, configHooks, registerApps, setHomepage, setContext, RouterType, setRouterType, setBasename };
export { ResourceType } from '@saasfe/we-app-types';
export { isFunction, navigate, getRouteSwitchConfig, getGotoHref, DEFAULTRouteMatch, AppLocation, parseLocate } from '@saasfe/we-app-utils';