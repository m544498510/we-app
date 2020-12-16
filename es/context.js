var context = {};
export function setContext(c, value) {
  if (typeof c === 'string') {
    context[c] = value;
    return;
  }

  context = Object.assign(Object.assign({}, context), c);
}
export function getContext() {
  return context;
}