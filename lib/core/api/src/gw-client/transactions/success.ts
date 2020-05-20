import * as enums from "../../enums";
import InputValidationError from "../../lib/inputValidationError";
import { GwClientShapeFactory } from "../../shape";
import * as Nested from "../../lib/nested";
import * as breaks from "../nested/breaks";
import * as transactions from "../nested/transactions";
import * as PdfCommon from "../../lib/pdf/common";
import * as Schema from "../../lib/schema";

const _nested = {
  transactions,
  breaks,
};

export const code = "transactions/success";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = false;

//#region examples

export const examples = {
  success: {
    accountNumber: "9017446437",
    transactions: _nested.transactions.examples.default,
    breaks: undefined,
    valid: true,
  },
  successWithBreaks: {
    accountNumber: "9017446437",
    transactions: _nested.transactions.examples.default,
    breaks: _nested.breaks.examples.default,
    valid: false,
  },
};

//#endregion

//#region create

export const create = function (requestId, accountNumber, transactions, scraperName) {
  PdfCommon.add_id(transactions);
  const { breaks, valid } = PdfCommon.validate(requestId, transactions, scraperName);
  const instance = { accountNumber, transactions, valid, breaks };
  const errors = Schema.validate(code, validate, instance, nestedSchemas);
  if (errors) {
    throw new InputValidationError(errors);
  }
  return instance;
};

//#endregion

//#region validate

export const validate = {
  id: "/transactions/success",
  type: "object",
  properties: {
    accountNumber: {
      required: true,
      type: "string",
    },
    transactions: {
      required: true,
      $ref: _nested.transactions.validate.id,
    },
    valid: {
      required: false, // HACK
      type: "boolean",
    },
    breaks: {
      required: false,
      $ref: _nested.breaks.validate.id,
    },
  },
};

export const nested = [_nested.transactions, _nested.breaks];
const { shapes, schemas } = Nested.resolve(validate.id, nested);
export const nestedShapes = shapes;
export const nestedSchemas = schemas;

//#endregion

//#region sanitize

export const sanitize = undefined; // don't need to sanitize

//#endregion

// typescript typecheck
const factory: GwClientShapeFactory = {
  code,
  passThrough,
  type,
  examples,
  create: undefined, // spike-pdf doesn't call .create() atm
  validate,
  sanitize,
  noSessionId,
  // nested
  nested,
  nestedSchemas,
  nestedShapes,
};
export default factory;
