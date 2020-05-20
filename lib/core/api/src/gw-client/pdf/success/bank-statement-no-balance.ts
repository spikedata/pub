import * as enums from "../../../enums";
import { GwClientShapeFactory } from "../../../shape";
import * as bankStatementNoBalance from "../../nested/bank-statement-no-balance";

const _nested = {
  // NOTE: nested/bank-statement-no-balance is shared by:
  // - "pdf/success/bank-statement-no-balance"
  // - "pdf/success/credit-card-simple"
  "bank-statement-no-balance": bankStatementNoBalance,
};

export const code = "pdf/success/bank-statement-no-balance";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = true; // shapeExplorer

//#region examples

export const examples = _nested["bank-statement-no-balance"].examples;

//#endregion

//#region validate

export const validate = _nested["bank-statement-no-balance"].validate;
export const nested = _nested["bank-statement-no-balance"].nested;
export const nestedShapes = _nested["bank-statement-no-balance"].nestedShapes;
export const nestedSchemas = _nested["bank-statement-no-balance"].nestedSchemas;

//#endregion

//#region sanitize

export const sanitize = _nested["bank-statement-no-balance"].sanitize;

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
