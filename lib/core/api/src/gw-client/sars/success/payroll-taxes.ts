import * as enums from "../../../enums";
import { GwClientShapeFactory } from "../../../shape";

export const code = "sars/success/payroll-taxes";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = true; // shapeExplorer

//#region examples

export const examples = {
  default: {
    parser: "SARS_PAYROLLTAXES_WEB_0",
    statement: {
      issuer: "SARS",
      accountNumber: "7700786991",
      dates: {
        issuedOn: "2018-07-06T00:00:00.000Z",
        from: "2017-03-01T00:00:00.000Z",
        to: "2018-02-28T00:00:00.000Z",
      },
      nameAddress: ["THE OLD BISCUIT MILL", "373-5 ALBERT ROAD", "WOODSTOCK", "7925"],
    },
    transactions: [
      {
        date: "2017-04-05T00:00:00.000Z",
        transactionReference: "7700786991LC2017037",
        description: ["DECLARATION"],
        transactionValue: 83958,
        paye: 78191.37,
        sdl: 3387.11,
        uif: 2379.52,
        balance: 83958,
        id: 1,
      },
      {
        date: "2017-04-07T00:00:00.000Z",
        transactionReference: "7700786991LC2017037",
        description: ["PAYMENT"],
        transactionValue: -83958,
        paye: -78191.37,
        sdl: -3387.11,
        uif: -2379.52,
        balance: 0,
        id: 2,
      },
      {
        date: "2018-07-06T00:00:00.000Z",
        description: ["ETI CARRIED FORWARD"],
        transactionValue: 0,
        paye: 0,
        id: 3,
      },
      {
        date: "2017-05-03T00:00:00.000Z",
        transactionReference: "7700786991LC2017049",
        description: ["DECLARATION"],
        transactionValue: 84747.21,
        paye: 78973.41,
        sdl: 3394.28,
        uif: 2379.52,
        balance: 84747.21,
        id: 4,
      },
    ],
  },
};

//#endregion

//#region validate

export const validate = {
  type: "object",
  properties: {
    parser: {
      required: true,
      type: "string",
      enum: ["SARS_PAYROLLTAXES_WEB_0"],
    },
    statement: {
      required: true,
      type: "object",
      properties: {
        issuer: { required: true, type: "string", enum: ["SARS"] },
        accountNumber: { required: true, type: "string" },
        dates: {
          required: true,
          type: "object",
          properties: {
            issuedOn: { required: true, format: "date-or-iso-str" }, // optional - ABSA cheque-account-web does not have issue date
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
    transactions: {
      required: true,
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { required: true, type: "integer" },
          date: { required: false, format: "date-or-iso-str" },
          transactionReference: { type: "string" },
          description: { required: true, type: "array", items: { type: "string" } },
          transactionValue: { required: false, type: "number" },
          paye: { required: true, type: "number" },
          sdl: { type: "number" },
          uif: { type: "number" },
          balance: { type: "number" },
        },
      },
    },
  },
};

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
};
export default factory;
