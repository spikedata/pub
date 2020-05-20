import * as enums from "../../enums";
import InputValidationError from "../../lib/inputValidationError";
import * as Schema from "../../lib/schema";
import { GwClientShapeFactory } from "../../shape";

const code = "login/interim-input-abs-pass";
const type = enums.TYPES.INTERIM;
const passThrough = true; // from lambda-gw

//#region examples

export interface Examples {
  default: number[];
}

const examples = {
  default: [0, 1, 2],
};

//#endregion

//#region create

// TODO: note not currently used by spike-web
const create = function (todo) {
  const instance = {
    todo,
  };
  const errors = Schema.validate(code, validate, instance);
  if (errors) {
    throw new InputValidationError(errors);
  }
  return instance;
};

//#endregion
//#region validate

const validate = {
  type: "array",
  items: {
    type: "integer",
  },
  minItems: 3,
  maxItems: 3,
};

//#endregion

//#region sanitize

const sanitize = undefined;

//#endregion

// typescript typecheck
const factory: GwClientShapeFactory = {
  code,
  passThrough,
  type,
  examples,
  create,
  validate,
  sanitize,
  noSessionId: false,
};
export default factory;
