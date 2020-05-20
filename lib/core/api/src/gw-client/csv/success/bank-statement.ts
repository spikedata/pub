import * as enums from "../../../enums";
import { GwClientShapeFactory } from "../../../shape";
import * as Nested from "../../../lib/nested";
import * as breaks from "../../nested/breaks";
import * as transactionsNoBalance from "../../nested/transactions-no-balance";

const _nested = {
  transactionsNoBalance,
  breaks,
};

export const code = "csv/success/bank-statement";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = true; // shapeExplorer

//#region examples

const statement = {
  bank: "ABS",
  accountNumber: undefined,
  dates: {
    issuedOn: undefined,
    from: "2018-08-01T00:00:00.000Z",
    to: "2018-08-31T00:00:00.000Z",
  },
  nameAddress: ["Mr. J Smith"],
};

export const examples = {
  success: {
    parser: "ABS1",
    statement,
    transactions: _nested.transactionsNoBalance.examples.default,
    valid: true,
  },
  successWithBreaks: {
    parser: "ABS1",
    statement,
    transactions: _nested.transactionsNoBalance.examples.default,
    breaks: _nested.breaks.examples.default,
    valid: false,
  },
};

//#endregion

//#region validate

export const validate = {
  id: "/bank-statement-csv",
  type: "object",
  properties: {
    parser: {
      required: true,
      type: "string",
      enum: enums.CsvParser.bankStatements,
    },
    statement: {
      required: true,
      // same as ../nested/statement-info.js but with optional params
      type: "object",
      properties: {
        bank: {
          required: true,
          type: "string",
          enum: Object.values(enums.Bank).map((x) => x.code),
        },
        accountNumber: {
          required: false,
          type: "string",
        },
        dates: {
          required: true,
          type: "object",
          properties: {
            issuedOn: {
              required: false,
              // type: "any",
              format: "date-or-iso-str",
            },
            from: {
              required: false,
              // type: "any",
              format: "date-or-iso-str",
            },
            to: {
              required: false,
              // type: "any",
              format: "date-or-iso-str",
            },
          },
        },
        nameAddress: {
          required: false,
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    transactions: {
      required: true,
      $ref: _nested.transactionsNoBalance.validate.id,
    },
    valid: {
      required: true,
      type: "boolean",
    },
    breaks: {
      required: false,
      $ref: _nested.breaks.validate.id,
    },
  },
};

export const nested = [_nested.transactionsNoBalance, _nested.breaks];
const { shapes, schemas } = Nested.resolve(validate.id, nested);
export const nestedShapes = shapes;
export const nestedSchemas = schemas;

//#endregion

//#region sanitize

export const sanitize = {
  statement: {
    nameAddress: "[redacted]",
  },
};

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
