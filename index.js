function windowEval(code, context) {
  const proxy = new Proxy(context, {
    get(target, propKey, receiver) {
      return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
      return Reflect.set(target, propKey, value, receiver);
    },
  });
  const func = new Function ('proxy', `with (proxy) {${code}}`);
  return func(proxy);
}

module.exports = windowEval;
