import * as enums from "../../../enums";
import { GwClientShapeFactory } from "../../../shape";

export const code = "pdf/success/credit-card-breakdown";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = true; // shapeExplorer

//#region examples

export const examples = {
  valid: {
    parser: "ABSA_CREDITCARD_EMAIL_0",
    statement: {
      bank: "ABSA",
      accountNumber: "0123456789",
      dates: {
        issuedOn: "2017-11-11T00:00:00.000Z",
        from: "2017-10-01T00:00:00.000Z",
        to: "2017-10-31T00:00:00.000Z",
      },
      nameAddress: ["MR I COPELYN", "20 SYDNEY STREET", "GREEN POINT", "8005"],
      accountType: "VISA Platinum",
    },
    breakdown: [
      {
        category: "PreviousBalance",
        name: "Balance from last statement",
        total: 13495.49,
      },
    ],
    transactions: [
      {
        id: 1,
        category: "PreviousBalance",
        transactionDate: "2017-02-07T00:00:00.000Z",
        processDate: "2017-02-07T00:00:00.000Z",
        description: ["Balance from previous statement"],
        amount: 13495.49,
      },
    ],
    valid: true,
  },

  invalid: {
    parser: "ABSA_CREDITCARD_EMAIL_0",
    statement: {
      bank: "ABSA",
      accountNumber: "0123456789",
      dates: {
        issuedOn: "2017-11-11T00:00:00.000Z",
        from: "2017-10-01T00:00:00.000Z",
        to: "2017-10-31T00:00:00.000Z",
      },
      nameAddress: ["MR I COPELYN", "20 SYDNEY STREET", "GREEN POINT", "8005"],
      accountType: "VISA Platinum",
    },
    breakdown: [
      {
        category: "PreviousBalance",
        name: "Balance from last statement",
        total: 13495.49,
      },
    ],
    transactions: [
      {
        id: 1,
        category: "PreviousBalance",
        transactionDate: "2017-02-07T00:00:00.000Z",
        processDate: "2017-02-07T00:00:00.000Z",
        description: ["Balance from previous statement"],
        amount: 13495.49,
      },
    ],
    valid: false,
    breaks: [
      {
        category: "Transactions",
        expected: 100,
        actual: 101,
        diff: 1,
      },
    ],
  },
};

//#endregion

//#region validate

export const validate = {
  id: "/credit-card-breakdown",
  type: "object",
  properties: {
    parser: {
      required: true,
      type: "string",
      enum: enums.PdfParser.creditCardBreakdown,
    },
    statement: {
      required: true,
      type: "object",
      properties: {
        bank: { required: true, type: "string" },
        accountNumber: { required: true, type: "string" },
        accountType: { type: "string" }, // optional
        statementNumber: { type: "string" }, // optional
        dates: {
          required: true,
          type: "object",
          properties: {
            issuedOn: { format: "date-or-iso-str" }, // optional - ABSA cheque-account-web does not have issue date
            from: { required: true, format: "date-or-iso-str" },
            to: { required: true, format: "date-or-iso-str" },
          },
        },
        nameAddress: {
          required: true,
          type: "array",
          items: { type: "string" },
        },
      },
    },
    breakdown: {
      required: true,
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { required: true, type: "string" },
          name: { required: true, type: "string" },
          total: { required: true, type: "number" },
        },
      },
    },
    transactions: {
      required: true,
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { required: true, type: "integer" },
          category: { required: true, type: "string" },
          transactionDate: { required: false, format: "date-or-iso-str" },
          processDate: { required: true, format: "date-or-iso-str" },
          description: {
            required: true,
            type: "array",
            items: { type: "string" },
          },
          amount: { type: "number" }, // optional: balance brought forward lines have no amount
        },
      },
    },
    valid: { required: true, type: "boolean" },
    breaks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { required: true, type: "string" },
          expected: { required: true, type: "number" },
          actual: { required: true, type: "number" },
          diff: { required: true, type: "number" },
        },
      },
    },
  },
};

//#endregion

//#region sanitize

export const sanitize = {
  statement: {
    nameAddress: "[redacted]", // remove name
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
};
export default factory;
