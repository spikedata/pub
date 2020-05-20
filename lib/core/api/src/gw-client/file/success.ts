import fs from "fs";
import path from "path";
import * as enums from "../../enums";
import InputValidationError from "../../lib/inputValidationError";
import * as Schema from "../../lib/schema";
import { GwClientShapeFactory } from "../../shape";

const code = "file/success";
const type = enums.TYPES.SUCCESS;
const passThrough = true; // from lambda-gw

//#region examples

const examples = {
  pdf: {
    file: "absa-estatement.pdf",
    buffer: "...",
    ext: ".pdf",
  },
  zip: {
    file: "fnb-statements.zip",
    buffer: "...",
    ext: ".zip",
  },
};

//#endregion

//#region create

const create = function (filePath, buffer, ext) {
  if (!buffer) {
    buffer = fs.readFileSync(filePath);
    buffer = buffer.toString("base64");
  }
  const instance = {
    file: path.basename(filePath),
    buffer,
    ext,
  };
  const errors = Schema.validate(code, validate, instance);
  if (errors) {
    throw new InputValidationError(errors);
  }
  return instance;
};

//#endregion

//#region validate

const validate = {
  type: "object",
  properties: {
    file: { required: true, type: "string" },
    buffer: { required: true, type: "string" },
    ext: { required: true, type: "string" },
  },
};

//#endregion

//#region sanitize

// NOTE: custom sanitizer in order to prevent buffer being deep cloned before being [redacted]
const sanitize = function (data) {
  const clone = {
    file: data.file,
    buffer: "[redacted]",
    ext: data.ext,
  };
  return clone;
};

//#endregion

// typescript typecheck
const factory: GwClientShapeFactory = {
  code,
  passThrough,
  type,
  examples,
  create,
  validate,
  sanitize,
  noSessionId: false,
};
export default factory;
