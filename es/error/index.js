import { addErrorHandler, getAppStatus, unloadApplication } from 'single-spa';
import { runLifecycleHook } from '../hooks';
import { getScope } from '../weapp';
import { LifecycleHookEnum } from '@saasfe/we-app-types';
export var errorHandler = function errorHandler(error, activeScopes) {
  // 向外抛出错误
  Promise.reject(error); // 执行生命周期钩子

  return runLifecycleHook(LifecycleHookEnum.onError, activeScopes, {
    error: error
  });
};
addErrorHandler(function (error) {
  var pageName = error.appOrParcelName || error.appName || error.name;
  var activeScope = getScope(pageName);
  errorHandler(error, [activeScope]).then(function () {
    if (getAppStatus(pageName) === 'SKIP_BECAUSE_BROKEN') {
      unloadApplication(pageName);
    }
  });
});