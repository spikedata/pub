const deepExtend = require("deep-extend");

exports.mergeObjectsMutate = function (a, b) {
  deepExtend(a, b);
};

exports.mergeObjectsClone = function (a, b) {
  const c = exports.clone(a);
  return deepExtend(c, b);
};

exports.clone = function (a) {
  return deepExtend({}, a);
};

exports.arrayToObject = function (array, key) {
  return array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
};

exports.entriesToObject = function (array, keyElement = 0) {
  const valueElement = keyElement === 0 ? 1 : 0;
  return array.reduce((obj, item) => {
    obj[item[keyElement]] = item[valueElement];
    return obj;
  }, {});
};

exports.addMissingMutate = function (into, from) {
  const keys = Object.keys(from);
  for (const k of keys) {
    if (!into[k]) {
      into[k] = from[k];
    }
  }
};
