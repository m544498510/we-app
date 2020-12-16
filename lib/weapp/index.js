"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  setHomepage: true
};
Object.defineProperty(exports, "setHomepage", {
  enumerable: true,
  get: function get() {
    return _homepage.setHomepage;
  }
});

var _homepage = require("./homepage");

var _rootProduct = require("./root-product");

Object.keys(_rootProduct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _rootProduct[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rootProduct[key];
    }
  });
});