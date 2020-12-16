"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setContext = setContext;
exports.getContext = getContext;
var context = {};

function setContext(c, value) {
  if (typeof c === 'string') {
    context[c] = value;
    return;
  }

  context = Object.assign(Object.assign({}, context), c);
}

function getContext() {
  return context;
}