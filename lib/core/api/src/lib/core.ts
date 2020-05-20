import * as Enum from "./enum";

export const xor = function (a, b) {
  a = !!a;
  b = !!b;
  return a ^ b;
};

export const oneOf = function (...args: any[]) {
  let t = 0,
    f = 0;
  for (const a of args) {
    if (a !== undefined) {
      // includes various falsey values e.g. 0, [], '', null
      ++t;
    } else {
      ++f;
    }
  }
  return t === 1 && f === args.length - 1;
};

// from: https://medium.freecodecamp.org/elegant-patterns-in-modern-javascript-roro-be01e7669cbd
export const requiredParam = function (param): any {
  const requiredParamError = new Error(`Required parameter, "${param}" is missing.`);
  // preserve original stack trace
  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(requiredParamError, requiredParam);
  }
  throw requiredParamError;
};

export const isFunction = function (functionToCheck) {
  if (!functionToCheck) {
    return false;
  }
  const fn = Object.prototype.toString.call(functionToCheck);
  return fn === "[object Function]" || fn === "[object AsyncFunction]";
};

// https://stackoverflow.com/a/44198641/609428
export const isValidDate = function (date) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
};

export const isObject = function (obj) {
  return !!(obj && Object.prototype.toString.call(obj) === "[object Object]");
};

export const isEnum = function (e) {
  return !!(e && e[Enum.nameKey]);
};

export const isString = function (x) {
  return typeof x === "string" || x instanceof String;
};
