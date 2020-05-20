import fs from "fs";
import path from "path";
import * as enums from "../enums";
import InputValidationError from "../lib/inputValidationError";
import PdfTooLargeError from "../lib/pdfTooLargeError";
import * as Schema from "../lib/schema";
import { ClientGwShapeFactory } from "../shape";

const code = "csv";
const type = enums.TYPES.INPUTS;
const marshallTo = "gw-lambda/lchan/csv";
const channel = enums.Channel.Lchan;
const sessionBased = false;

//#region examples

const examples = {
  default: {
    file: "abs.csv",
    buffer: "...",
  },
};

//#endregion

//#region create

const create = function (csvPath, pass, buffer) {
  if (!buffer && !csvPath) {
    throw new InputValidationError(["must supply csvPath or buffer"]);
  }
  if (buffer) {
    if (!csvPath) {
      // supplied buffer but didn't say what original filename was
      csvPath = "not-supplied";
    }
  } else {
    // supplied csvPath only - not buffer
    buffer = fs.readFileSync(csvPath);
    buffer = buffer.toString("base64");
  }

  if (buffer.length > PdfTooLargeError.Max) {
    throw new PdfTooLargeError();
  }

  const instance = {
    file: path ? path.basename(csvPath) : csvPath,
    buffer,
    pass,
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
    file: {
      type: "string",
      required: true,
    },
    buffer: {
      type: "string", // base64 encoded csv buffer
      required: true,
    },
  },
};

//#endregion

//#region sanitize

// NOTE: custom sanitizer in order to prevent buffer being deep cloned before being [redacted]
const sanitize = function (data) {
  const temp = data.buffer;
  delete data.buffer;
  const clone = Object.assign({ buffer: "[redacted]" }, data);
  data.buffer = temp;
  return clone;
};

//#endregion

// typescript typecheck
const factory: ClientGwShapeFactory = {
  code,
  type,
  marshallTo,
  channel,
  sessionBased,
  examples,
  create,
  validate,
  sanitize,
};
export default factory;
