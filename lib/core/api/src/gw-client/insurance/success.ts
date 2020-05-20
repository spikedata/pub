import * as enums from "../../enums";
import InputValidationError from "../../lib/inputValidationError";
import * as Schema from "../../lib/schema";
import { GwClientShapeFactory } from "../../shape";

const code = "insurance/success";
const type = enums.TYPES.SUCCESS;
const passThrough = true; // from lambda-gw

//#region examples

const examples = {
  default: {
    parser: "LIBERTY_LIFE_COVER_ANNIVERSARY_LETTER",
    name: "CD BUCKLEY",
    policyNumber: "59820434400",
    total: 996.08,
    provider: "Liberty",
    benefits: [
      {
        benefit: "Life Cover",
        premium: 249.44,
        cover: 1552500,
      },
      {
        benefit: "Immediate Expenses Benefit",
      },
      {
        benefit: "Absolute Protector Plus (Ood)",
        premium: 164.69,
        cover: 1035000,
      },
    ],
  },
};

//#endregion

//#region create

// TODO: note not currently used because data created by browserCode - e.g. see [$/spike-web/src/NED.0/accounts.js]
const create = function (todo) {
  const instance = {
    todo,
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
    parser: {
      required: true,
      type: "string",
      enum: enums.PdfParser.insurance,
    },
    name: { required: true, type: "string" },
    policyNumber: { required: true, type: "string" },
    total: { required: true, type: "number" },
    provider: { required: true, type: "string" },

    benefits: {
      required: true,
      type: "array",
      items: {
        type: "object",
        properties: {
          benefit: { required: true, type: "string" },
          details: { /* required: true,*/ type: "string" },
          cover: { /* required: true,*/ type: ["number", "string"] }, // number or RETAIL (e.g. outsurance vehicle cover)
          premium: { /* required: true,*/ type: "number" },
        },
      },
    },
  },
};

//#endregion

//#region sanitize

const sanitize = {
  name: "[redacted]",
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
  noSessionId: true,
};
export default factory;
