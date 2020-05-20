import AjvExt from "./ajvExt";
import BadShapeError from "./badShapeError";
import * as core from "./core";

const compiledSchemas = {};

export const validate = function (code, schema, data, nestedSchemas?) {
  if (schema === undefined) {
    throw new BadShapeError(`shape ${code} schema undefined`);
  }
  if (core.isFunction(schema)) {
    return schema(data);
  }

  // compile the schema once (does fixSchema)
  let ajvExt;
  // console.log("code:", code);
  if (compiledSchemas[code]) {
    ajvExt = compiledSchemas[code];
  } else {
    try {
      ajvExt = new AjvExt(schema, nestedSchemas);
      compiledSchemas[code] = ajvExt;
    } catch (e) {
      throw new BadShapeError(`shape ${code} schema compile errors: ${e.message}`);
    }
  }

  // validation
  return ajvExt.validate(data);
};

export const undefinedArrayItemsCheck = function (arrayData) {
  // json schema considers `undefined` to be a valid element in an array but not `null`
  // when undefined is serialized it is written as null
  // hence validation tests in banksy (spike-pdf) will pass but tests in gateway will fail (after serialize/deserialize)
  // solution = explicitly look for `undefined` in arrays in banksy
  const errors = [];
  arrayData.forEach((x, i) => {
    if (x === undefined) {
      errors.push(`[${i}] is undefined`);
    }
  });
  return errors;
};
