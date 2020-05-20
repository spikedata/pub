import * as enums from "../../enums";
import InputValidationError from "../../lib/inputValidationError";
import * as Schema from "../../lib/schema";
import { GwClientShapeFactory } from "../../shape";

const code = "accounts/success";
const type = enums.TYPES.SUCCESS;
const passThrough = true; // from lambda-gw

//#region examples

export interface Instance {
  accountNumber: string;
  currency?: string;
  alias?: string;
  name?: string;
  type?: string;
  currentBalance?: number;
  balance: number;
}

export interface Examples {
  default: Instance[];
}

const examples = {
  default: [
    {
      accountNumber: "10091234567",
      currency: "ZAR",
      alias: "Ilan's account",
      name: "ACCESSACC",
      type: "Current Account",
      currentBalance: 1000.32,
      balance: 1000.32,
    },
    {
      accountNumber: "12345678901",
      currency: "ZAR",
      alias: "Another account",
      name: "CREDIT",
      type: "Credit Account",
      currentBalance: -9000,
      balance: -9000,
    },
  ],
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
  type: "array",
  minItems: 1,
  items: {
    type: "object",
    properties: {
      accountNumber: {
        required: true,
        type: "string",
      },
      currency: {
        required: false,
        type: "string",
      },
      alias: {
        required: false,
        type: "string",
      },
      name: {
        required: true,
        type: "string",
      },
      type: {
        required: false,
        type: "string",
      },
      currentBalance: {
        required: false,
        type: "number",
      },
      balance: {
        required: true,
        type: "number",
      },
    },
  },
};

//#endregion

//#region sanitize

// NOTE: array sanitizer = will be applied to every element of array by common.sanitize
const sanitize = [
  {
    currentBalance: "***",
    balance: "***",
  },
];

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
