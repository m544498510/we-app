import { getScope } from './root-product';
var homepage;
export function setHomepage(scope) {
  homepage = scope;
}
export function matchHomepage(s) {
  var scope = s;

  if (typeof s === 'string') {
    scope = getScope(s);
  }

  var homepageScope = homepage;

  if (typeof homepage === 'string') {
    homepageScope = getScope(homepage);
  }

  if (homepageScope && scope && homepageScope.appName && scope.appName && homepageScope.pageName && scope.pageName && homepageScope.productName === scope.productName && homepageScope.appName === scope.appName && homepageScope.pageName === scope.pageName) {
    return true;
  }

  return false;
}