import * as enums from "../../../enums";
import { GwClientShapeFactory } from "../../../shape";
import * as objectUtil from "../../../lib/object";
import * as bankStatementNoBalance from "../../nested/bank-statement-no-balance";

// NOTE: nested/bank-statement-no-balance is shared by:
// - "pdf/success/bank-statement-no-balance"
// - "pdf/success/credit-card-simple"
const shared = {
  "bank-statement-no-balance": bankStatementNoBalance,
};

// Overview shared fields with credit-card-simple specifics
const creditCardSimple = objectUtil.mergeObjectsClone(shared["bank-statement-no-balance"], {
  validate: {
    properties: {
      parser: {
        enum: enums.PdfParser.creditCardSimple, // different parsers to "pdf/success/bank-statement-no-balance"
      },
    },
  },
  examples: {
    success: {
      parser: enums.PdfParser.creditCardSimple[0],
    },
  },
});

export const code = "pdf/success/credit-card-simple";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = true; // shapeExplorer

//#region examples

export const examples = creditCardSimple.examples;

//#endregion

//#region validate

export const validate = creditCardSimple.validate;
export const nested = creditCardSimple.nested;
export const nestedShapes = creditCardSimple.nestedShapes;
export const nestedSchemas = creditCardSimple.nestedSchemas;

//#endregion

//#region sanitize

export const sanitize = creditCardSimple.sanitize;

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
