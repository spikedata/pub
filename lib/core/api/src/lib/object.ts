// Can't use lodash-es - build/main won't work = used for tests
// import {
//   merge as lodashMerge,
//   cloneDeep as lodashCloneDeep,
//   clone as lodashCloneShallow,
// } from "lodash-es";
import lodashMerge from "lodash/merge";
import lodashCloneDeep from "lodash/cloneDeep";

export function mergeObjectsMutate(base, overrides) {
  // NOTE: mutates base
  // NOTE: works for base=array, i.e. will mutate base = overrides, and return overrides
  return lodashMerge(base, overrides);
}

export function mergeObjectsClone(base, overrides) {
  // NOTE: don't mutate base
  if (Array.isArray(base)) {
    if (!Array.isArray(overrides)) {
      throw new Error("can't mergeObjectsClone array with non-array");
    }
    return lodashMerge([], base, overrides);
  }
  return lodashMerge({}, base, overrides);
}

export function clone(a) {
  return lodashCloneDeep(a);
}
