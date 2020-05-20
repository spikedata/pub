// NOTE: "pdf/success/credit-card-breakdown-multi-user" is an array of "pdf/success/credit-card-breakdown"
// NOTE2: there is currently no way to have a mixed array of multiple shapes - e.g. [ "pdf/success/credit-card-breakdown", "pdf/success/credit-card-simple" ]
import * as enums from "../../../enums";
import { GwClientShapeFactory } from "../../../shape";
import * as Nested from "../../../lib/nested";
import * as objectUtil from "../../../lib/object";
import * as creditCardBreakdown from "./credit-card-breakdown";

const _nested = {
  "credit-card-breakdown": creditCardBreakdown,
};

// Overview shared fields with credit-card-simple specifics
const creditCardBreakdownMultiUser = objectUtil.mergeObjectsClone(
  _nested["credit-card-breakdown"],
  {
    validate: {
      properties: {
        parser: {
          enum: enums.PdfParser.creditCardBreakdownMultiUser, // different parsers to "pdf/success/credit-card-breakdown"
        },
      },
    },

    // NOTE: gw-client/pdf/success/credit-card-breakdown.js has 2 examples = { valid, invalid }
    examples: {
      valid: {
        parser: enums.PdfParser.creditCardBreakdownMultiUser[0],
      },
      invalid: {
        parser: enums.PdfParser.creditCardBreakdownMultiUser[0],
      },
    },
  }
);

export const code = "pdf/success/credit-card-breakdown-multi-user";
export const type = enums.TYPES.SUCCESS;
export const passThrough = true; // from lambda-gw
export const noSessionId = true; // shapeExplorer

//#region examples

export const examples = {
  valid: [creditCardBreakdownMultiUser.examples.valid],
  invalid: [creditCardBreakdownMultiUser.examples.invalid],
};
// console.log(JSON.stringify(examples, null, 2));

//#endregion

//#region validate

export const validate = {
  // array of nested /credit-card
  id: "/credit-card-breakdown-multi-user",
  type: "array",
  items: {
    $ref: creditCardBreakdownMultiUser.validate.id,
  },
};

export const nested = [creditCardBreakdownMultiUser];
const { shapes, schemas } = Nested.resolve(validate.id, nested);
export const nestedShapes = shapes;
export const nestedSchemas = schemas;

//#endregion

//#region sanitize

// NOTE: array sanitizer = will be applied to every element of array by common.sanitize
export const sanitize = [creditCardBreakdownMultiUser.sanitize];

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
