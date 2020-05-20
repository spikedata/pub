function isString(x) {
  return typeof x === "string" || x instanceof String;
}

export const nameKey = "__name";

export const Enum = {
  equal(x, y) {
    // convert x,y to numbers
    try {
      if (!Number.isInteger(x)) {
        x = this.fromString(x);
      }
      if (!Number.isInteger(y)) {
        y = this.fromString(y);
      }
    } catch (e) {
      return false;
    }
    return x === y;
  },

  toString(x) {
    if (x === undefined) {
      return x;
    }
    if (isString(x)) {
      return x;
    }
    const all = Object.entries(this);
    for (const a of all) {
      if (a[1] === x) {
        return a[0];
      }
    }
    throw new Error(this[nameKey] + ".toString invalid value: " + x);
  },

  fromString(x) {
    if (x === undefined) {
      return x;
    }
    if (Number.isInteger(x)) {
      return x;
    }
    const all = Object.entries(this);
    for (const a of all) {
      if (a[0] === x) {
        return a[1];
      }
    }
    throw new Error(this[nameKey] + ".fromString invalid key: " + x);
  },

  keys() {
    return (
      Object.entries(this)
        .filter((x) => x[0] !== nameKey)
        //.filter(x => Number.isInteger(x[1]))
        .map((x) => x[0])
    );
  },

  values() {
    // return Object.values(this).filter(Number.isInteger);
    return (
      Object.entries(this)
        .filter((x) => x[0] !== nameKey)
        //.filter(x => Number.isInteger(x[1]))
        .map((x) => x[1])
    );
  },

  validKey(k) {
    return this.hasOwnProperty(k);
  },

  validValue(v) {
    return this.values().indexOf(v) !== -1;
  },
};

export function createEnum(name, keyValues) {
  if (Object.keys(keyValues).indexOf(nameKey) !== -1) {
    throw new Error(`createEnum(${name}) contains reserved key: ${nameKey}`);
  }
  const e = Object.create(Enum);
  e[nameKey] = name;
  return Object.assign(e, keyValues);
}
