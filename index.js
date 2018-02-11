function windowEval(code, context = {}, options = {}) {
  options.filename = options.filename || 'eval';

  const proxy = new Proxy(context, {
    get(target, propKey, receiver) {
      return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
      return Reflect.set(target, propKey, value, receiver);
    },
  });
  for (const k in context) {
    if (context[k] === context) {
      context[k] = proxy;
    }
  }
  return eval(`with (proxy) {${code}}
//# sourceURL=${options.filename}`);
}

module.exports = windowEval;
