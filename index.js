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
  return eval(`with (proxy) {${code}}
//# sourceURL=${options.filename}`);
}

module.exports = windowEval;
