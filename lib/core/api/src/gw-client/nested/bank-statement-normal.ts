// NOTE: nested/bank-statement was shared by:
// - "statements/success" - (now obsolete) which has an array of nested/bank-statement's
// - "pdf/success/bank-statement-normal"
// NOTE2: there is currently no way to have a mixed array of multiple shapes - e.g. [ "pdf/success/bank-statement-normal", "pdf/success/bank-statement-no-balance" ]
import * as enums from "../../enums";
import * as Nested from "../../lib/nested";
import * as breaks from "./breaks";
import * as statementInfo from "./statement-info";
import * as transactions from "./transactions";

const _nested = {
  "statement-info": statementInfo,
  transactions: transactions,
  breaks,
};

export const code = "gw-client/nested/bank-statement-normal";

export const validate = {
  id: "/bank-statement-normal", // NOTE: was referenced by shape("statements/success").schema.$ref
  type: "object",
  properties: {
    parser: {
      required: true,
      type: "string",
      enum: enums.PdfParser.bankStatementsNormal,
    },
    statement: {
      required: true,
      $ref: _nested["statement-info"].validate.id,
    },
    transactions: {
      required: true,
      $ref: _nested.transactions.validate.id,
    },
    valid: {
      required: true,
      type: "boolean",
    },
    breaks: {
      required: false,
      $ref: _nested.breaks.validate.id,
    },
    buffer: {
      required: false,
      type: "string", // base64 encoded pdf buffer - only used to return pdf e.g. web FNB /statements
    },
  },
};

export const nested = [_nested["statement-info"], _nested.transactions, _nested.breaks];
const { shapes, schemas } = Nested.resolve(validate.id, nested);
export const nestedShapes = shapes;
export const nestedSchemas = schemas;

export const examples = {
  success: {
    parser: "FNB_RETAIL_ALL_0",
    statement: _nested["statement-info"].examples.default,
    transactions: _nested.transactions.examples.default,
    valid: true,
  },
  successWithBreaks: {
    parser: "FNB_RETAIL_ALL_0",
    statement: _nested["statement-info"].examples.default,
    transactions: _nested.transactions.examples.default,
    breaks: _nested.breaks.examples.default,
    valid: false,
  },
};

export const sanitize = {
  statement: _nested["statement-info"].sanitize,
  buffer: "[redacted]",
};
