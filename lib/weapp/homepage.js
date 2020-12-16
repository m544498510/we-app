"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHomepage = setHomepage;
exports.matchHomepage = matchHomepage;

var _rootProduct = require("./root-product");

var homepage;

function setHomepage(scope) {
  homepage = scope;
}

function matchHomepage(s) {
  var scope = s;

  if (typeof s === 'string') {
    scope = (0, _rootProduct.getScope)(s);
  }

  var homepageScope = homepage;

  if (typeof homepage === 'string') {
    homepageScope = (0, _rootProduct.getScope)(homepage);
  }

  if (homepageScope && scope && homepageScope.appName && scope.appName && homepageScope.pageName && scope.pageName && homepageScope.productName === scope.productName && homepageScope.appName === scope.appName && homepageScope.pageName === scope.pageName) {
    return true;
  }

  return false;
}