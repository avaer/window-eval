function windowEval(code, context = {}, options = {}) {
  options.filename = options.filename || 'eval';

  const proxy = new Proxy(context, {
    get(target, propKey, receiver) {
      return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
      return Reflect.set(target, propKey, value, receiver);
    },
    has(target, propKey) {
      return true; // trap sets
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
windowEval.browserGlobals = [
  'Array',
  'ArrayBuffer',
  'Atomics',
  'Boolean',
  'DataView',
  'Date',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'Error',
  'escape',
  'eval',
  'EvalError',
  'Float32Array',
  'Float64Array',
  'Function',
  'Infinity',
  'Int16Array',
  'Int32Array',
  'Int8Array',
  'isFinite',
  'isNaN',
  'JSON',
  'Map',
  'Math',
  'NaN',
  'Number',
  'Object',
  'parseFloat',
  'parseInt',
  'Promise',
  'Proxy',
  'RangeError',
  'ReferenceError',
  'Reflect',
  'RegExp',
  'Set',
  'SharedArrayBuffer',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'Uint16Array',
  'Uint32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'undefined',
  'unescape',
  'URIError',
  'WeakMap',
  'WeakSet',
];

module.exports = windowEval;
