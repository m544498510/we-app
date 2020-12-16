"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPageContainer = setPageContainer;
exports.setResourceLoader = setResourceLoader;
exports.setRender = setRender;
exports.setSandbox = setSandbox;
exports.getGlobalConfig = getGlobalConfig;

var _weAppTypes = require("@saasfe/we-app-types");

var _weAppUtils = require("@saasfe/we-app-utils");

var config = {
  pageContainer: {},
  resourceLoader: {},
  render: {},
  sandbox: {}
};
var configKeys = Object.keys(config);

function setGlobalConfig(pathname, value, scopes) {
  scopes.forEach(function (scope) {
    var scopeName = (0, _weAppUtils.getScopeName)(scope);
    config[pathname][scopeName] = value;
  });
}

function setPageContainer(value, scopes) {
  setGlobalConfig(_weAppTypes.ConfigName.pageContainer, value, scopes);
}

function setResourceLoader(value, scopes) {
  setGlobalConfig(_weAppTypes.ConfigName.resourceLoader, value, scopes);
}

function setRender(value, scopes) {
  setGlobalConfig(_weAppTypes.ConfigName.render, value, scopes);
}

function setSandbox(value, scopes) {
  setGlobalConfig(_weAppTypes.ConfigName.sandbox, value, scopes);
}

function getGlobalConfig(pathname, scopeName) {
  var _a, _b;

  if (configKeys.indexOf(pathname) === -1) {
    return;
  }

  var value = config[pathname][scopeName];

  if (!scopeName) {
    return value;
  }

  if (!value) {
    return value;
  }

  if (pathname === _weAppTypes.ConfigName.resourceLoader) {
    // 没有找到资源加载器描述，向上级查找
    if (!((_a = value) === null || _a === void 0 ? void 0 : _a.desc)) {
      var names = scopeName.split(_weAppUtils.ScopeNameDivider);
      names.pop();
      var name;

      if (names.length > 1) {
        name = names.join(_weAppUtils.ScopeNameDivider);
      } else {
        name = names[1] || '';
      }

      var val = getGlobalConfig(pathname, name);
      value = {
        desc: val === null || val === void 0 ? void 0 : val.desc,
        config: (_b = value) === null || _b === void 0 ? void 0 : _b.config
      };
    }
  }

  return value;
}