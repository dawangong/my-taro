/*
 * @Author: your name
 * @Date: 2021-01-28 14:32:52
 * @LastEditTime: 2021-07-28 18:01:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /my-taro/src/utils/serialize.ts
 */
export const indexOf = (haystack, needle) => {
  for (var i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) return i;
  }
  return -1;
}

export const stringify = (obj, replacer, spaces, cycleReplacer) => {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
}

export const stringifyError = (value) => {
  var err = {
    stack: value.stack,
    message: value.message,
    name: value.name
  };

  for (var i in value) {
    if (Object.prototype.hasOwnProperty.call(value, i)) {
      err[i] = value[i];
    }
  }

  return err;
}

export const serializer = (replacer, cycleReplacer) => {
  var stack = [];
  var keys = [];

  if (cycleReplacer == null) {
    cycleReplacer = function (key, value) {
      if (stack[0] === value) {
        return '[Circular ~]';
      }
      return '[Circular ~.' + keys.slice(0, indexOf(stack, value)).join('.') + ']';
    };
  }

  return function (key, value) {
    if (stack.length > 0) {
      var thisPos = indexOf(stack, this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);

      if (~indexOf(stack, value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value);
    }

    return replacer == null
      ? value instanceof Error ? stringifyError(value) : value
      : replacer.call(this, key, value);
  };
}
