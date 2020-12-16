import { ConfigName } from '@saasfe/we-app-types';
import { ScopeNameDivider, getScopeName } from '@saasfe/we-app-utils';
var config = {
  pageContainer: {},
  resourceLoader: {},
  render: {},
  sandbox: {}
};
var configKeys = Object.keys(config);

function setGlobalConfig(pathname, value, scopes) {
  scopes.forEach(function (scope) {
    var scopeName = getScopeName(scope);
    config[pathname][scopeName] = value;
  });
}

export function setPageContainer(value, scopes) {
  setGlobalConfig(ConfigName.pageContainer, value, scopes);
}
export function setResourceLoader(value, scopes) {
  setGlobalConfig(ConfigName.resourceLoader, value, scopes);
}
export function setRender(value, scopes) {
  setGlobalConfig(ConfigName.render, value, scopes);
}
export function setSandbox(value, scopes) {
  setGlobalConfig(ConfigName.sandbox, value, scopes);
}
export function getGlobalConfig(pathname, scopeName) {
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

  if (pathname === ConfigName.resourceLoader) {
    // 没有找到资源加载器描述，向上级查找
    if (!((_a = value) === null || _a === void 0 ? void 0 : _a.desc)) {
      var names = scopeName.split(ScopeNameDivider);
      names.pop();
      var name;

      if (names.length > 1) {
        name = names.join(ScopeNameDivider);
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