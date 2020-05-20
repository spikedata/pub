import Ajv from "ajv";
import * as core from "./core";
import * as objectUtil from "./object";
import * as uuid from "./uuid";

// see https://json-schema.org/understanding-json-schema/reference/string.html

//#region uuidV4

function uuidV4(input) {
  return uuid.validUuidV4(input);
}

//#endregion

//#region date-or-iso-str

// Used to validate a source object (which has dates as actual new Date() objects) before it is serialized
// USAGE: { format: "date-or-iso-str" }
// NOT: { type: "string", format: "date-or-iso-str" } => new Date() is not a string
// NOT: { type: "date-or-iso-str" } => common misunderstanding of jsonschema custom formatters
const fullIsoDateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
function dateOrIsoStr(input) {
  return typeof input == "string" ? fullIsoDateRegex.test(input) : core.isValidDate(input);
}

//#endregion

//#region regex-or-str

function regexOrStr(input) {
  return input instanceof RegExp ? true : typeof input == "string";
}

//#endregion

class AjvExt {
  ajv: Ajv.Ajv;
  compiled: Ajv.ValidateFunction;

  constructor(schema, nestedSchemas) {
    this.ajv = new Ajv({
      allErrors: true,
      logger: false, // hide "schema id ignored" messages on nestedSchemas
    });

    // custom formats
    this.ajv.addFormat("uuidV4", {
      validate: uuidV4,
    });
    this.ajv.addFormat("date-or-iso-str", {
      validate: dateOrIsoStr,
    });
    this.ajv.addFormat("regex-or-str", {
      validate: regexOrStr,
    });

    // nestedSchemas
    if (nestedSchemas && nestedSchemas.length) {
      for (let x of nestedSchemas) {
        x = AjvExt.fixSchema(x);
        this.ajv.addSchema(x, x.id);
      }
    }

    // fix & compile
    schema = AjvExt.fixSchema(schema);
    this.compiled = this.ajv.compile(schema);
  }

  validate(data) {
    const valid = this.compiled(data);
    if (valid) {
      return undefined;
    } else {
      // return this.ajv.errorsText(this.compiled.errors, { dataVar: "" });
      return this.compiled.errors.map((x) => `${x.dataPath} ${x.message}`);
    }
  }

  // NOTE: doesn't mutate schema
  static fixSchema(schema) {
    const clone = objectUtil.clone(schema);
    this._fixSchema(clone);
    return clone;
  }

  // NOTE: mutates schema
  static _fixSchema(schema) {
    // .required
    //  - root level properties can have .required
    //  - properties on sub-objects or arrays must have .required array at object level

    if (schema.type === "object" && schema.properties) {
      if (!schema.required) {
        schema.required = [];
      }

      for (const key in schema.properties) {
        const property = schema.properties[key];

        // move property.required to schema.required array
        if ({}.hasOwnProperty.call(property, "required")) {
          if (property.required) {
            schema.required.push(key);
          }
          delete property.required;
        }

        // recurse
        if (property.type === "object") {
          AjvExt._fixSchema(property);
          continue;
        } else if (property.type === "array") {
          AjvExt._fixSchema(property.items);
          continue;
        }
      }

      if (schema.required.length === 0) {
        delete schema.required;
      }
    } else if (schema.type === "array") {
      // e.g. /transactions, and /breaks
      AjvExt._fixSchema(schema.items);
    }
  }

  // NOTE: static class properties are stage 3 atm: https://javascript.info/static-properties-methods#static-properties
  static swaggerReplacement() {
    // https://swagger.io/specification/#dataTypes
    return {
      uuidV4: {
        type: "string",
        format: "uuid",
      },
      "date-or-iso-str": {
        type: "string",
        format: "date-time", // https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14
      },
      "regex-or-str": {
        type: "string",
      },
    };
  }
}

export default AjvExt;
