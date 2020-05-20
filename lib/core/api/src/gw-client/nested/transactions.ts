import * as Nested from "../../lib/nested";
import * as transaction from "./transaction";

const _nested = {
  transaction,
};

export const code = "gw-client/nested/transactions";

export const validate = {
  id: "/transactions", // NOTE: must match root.$ref in parent schema
  type: "array",
  items: {
    $ref: _nested.transaction.validate.id,
  },
};

export const nested = [_nested.transaction];
const { shapes, schemas } = Nested.resolve(validate.id, nested);
export const nestedShapes = shapes;
export const nestedSchemas = schemas;

export const examples = {
  default: [
    _nested.transaction.examples[1],
    _nested.transaction.examples[2],
    _nested.transaction.examples[3],
  ],
};
