// NOTE: nested/bank-statement is shared by:
// - "pdf/success/bank-statement-no-balance"
// - "pdf/success/credit-card-simple"
// NOTE2: there is currently no way to have a mixed array of multiple shapes - e.g. [ "pdf/success/credit-card-breakdown", "pdf/success/credit-card-simple" ]
// NOTE3: no ".breaks" because we don't have a balance to do running total breaks on
import * as enums from "../../enums";
import * as Nested from "../../lib/nested";
import * as statementInfo from "./statement-info";
import * as transactionsNoBalance from "./transactions-no-balance";

const _nested = {
  "statement-info": statementInfo,
  "transactions-no-balance": transactionsNoBalance,
};

export const code = "gw-client/nested/bank-statement-no-balance";

export const validate = {
  id: "/bank-statement-no-balance", // NOTE: used below, but not strictly required because not currently referenced by another schema i.e. root.$ref
  type: "object",
  properties: {
    parser: {
      required: true,
      type: "string",
      enum: enums.PdfParser.bankStatementsNoBalance,
    },
    statement: {
      required: true,
      $ref: _nested["statement-info"].validate.id,
    },
    transactions: {
      required: true,
      $ref: _nested["transactions-no-balance"].validate.id,
    },
    valid: {
      required: true,
      type: "boolean",
    },
  },
};

export const nested = [_nested["statement-info"], _nested["transactions-no-balance"]];
const { shapes, schemas } = Nested.resolve(validate.id, nested);
export const nestedShapes = shapes;
export const nestedSchemas = schemas;

export const examples = {
  success: {
    parser: "NEDBANK_ACCBAL_WEB",
    statement: _nested["statement-info"].examples.default,
    transactions: _nested["transactions-no-balance"].examples.default,
    valid: true,
  },
};

export const sanitize = {
  statement: _nested["statement-info"].sanitize,
};
