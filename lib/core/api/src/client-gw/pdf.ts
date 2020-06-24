import fs from "fs";
import path from "path";
import * as enums from "../enums";
import InputValidationError from "../lib/inputValidationError";
import PdfTooLargeError from "../lib/pdfTooLargeError";
import * as Schema from "../lib/schema";
import { ClientGwShapeFactory } from "../shape";
import { PdfRequest } from "../requestTypes";

const code = "pdf";
const type = enums.TYPES.INPUTS;
const marshallTo = "gw-lambda/lchan/pdf";
const channel = enums.Channel.Lchan;
const sessionBased = false;

//#region examples

const examples: Record<string, PdfRequest> = {
  default: {
    file: "absa.pdf",
    buffer: "JVBER...",
    pass: "password", // required if pdf is password protected
  },
};

//#endregion

//#region create

const create = function (pdfPath, pass, buffer) {
  if (!buffer && !pdfPath) {
    throw new InputValidationError(["must supply pdfPath or buffer"]);
  }
  if (buffer) {
    if (!pdfPath) {
      // supplied buffer but didn't say what original filename was
      pdfPath = "not-supplied";
    }
  } else {
    // supplied pdfPath only - not buffer
    buffer = fs.readFileSync(pdfPath);
    buffer = buffer.toString("base64");
  }

  if (buffer.length > PdfTooLargeError.Max) {
    throw new PdfTooLargeError();
  }

  const instance = {
    file: path ? path.basename(pdfPath) : pdfPath,
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

const isBase64EncodedPdf = function (pdfString) {
  return pdfString.slice(0, 5) == "JVBER"; // Buffer.from("%PDF").toString('base64')
};

const validate = function (data) {
  const validationErrors = [];
  if (!data.file) {
    validationErrors.push("missing required input: file");
  }
  if (!data.buffer) {
    validationErrors.push("missing required input: buffer");
  } else if (!isBase64EncodedPdf(data.buffer)) {
    validationErrors.push("invalid buffer: either not a PDF or not base64 encoded");
  }
  return validationErrors.length === 0 ? undefined : validationErrors;
};

// For swagger definition - not used by validate()
const schema = {
  type: "object",
  properties: {
    file: {
      type: "string",
      required: true,
    },
    pass: {
      type: "string",
    },
    buffer: {
      type: "string", // base64 encoded pdf buffer
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
  channel,
  sessionBased,
  examples,
  create,
  validate,
  schema,
  sanitize,
  marshallTo,
};
export default factory;
