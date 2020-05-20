import * as enums from "../../../enums";
import { GwClientShapeFactory } from "../../../shape";
import * as bankStatementNormal from "../../nested/bank-statement-normal";

const _nested = {
  // NOTE: nested/bank-statement was shared by:
  // - "statements/success" - (now obsolete) which has an array of nested/bank-statement's
  // - "pdf/success/bank-statement-normal"
  "bank-statement-normal": bankStatementNormal,
};

export const code = "pdf/success/bank-statement-normal";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = true; // shapeExplorer

//#region examples

export const examples = _nested["bank-statement-normal"].examples;

//#endregion

//#region validate

export const validate = _nested["bank-statement-normal"].validate;
export const nested = _nested["bank-statement-normal"].nested;
export const nestedShapes = _nested["bank-statement-normal"].nestedShapes;
export const nestedSchemas = _nested["bank-statement-normal"].nestedSchemas;

//#endregion

//#region sanitize

export const sanitize = _nested["bank-statement-normal"].sanitize;

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
