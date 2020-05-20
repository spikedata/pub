import * as Nested from "../../lib/nested";
import * as transactionNoBalance from "./transaction-no-balance";

const _nested = {
  "transaction-no-balance": transactionNoBalance,
};

export const code = "gw-client/nested/transactions-no-balance";

export const validate = {
  id: "/transactions-no-balance", // NOTE: must match root.$ref in parent schema
  type: "array",
  items: {
    $ref: _nested["transaction-no-balance"].validate.id,
  },
};

export const nested = [_nested["transaction-no-balance"]];
const { shapes, schemas } = Nested.resolve(validate.id, nested);
export const nestedShapes = shapes;
export const nestedSchemas = schemas;

export const examples = {
  default: [
    _nested["transaction-no-balance"].examples[1],
    _nested["transaction-no-balance"].examples[2],
    _nested["transaction-no-balance"].examples[3],
  ],
};
