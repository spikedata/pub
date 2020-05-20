import * as enums from "../../enums";
import { GwClientShapeFactory } from "../../shape";

const code = "login/interim-input-std-otp";
const type = enums.TYPES.INTERIM;
const noData = true;
const passThrough = true; // from lambda-gw

//#region examples

// noData
const examples = undefined;

//#endregion

//#region validate

// noData
const validate = undefined;

//#endregion

//#region sanitize

const sanitize = undefined;

//#endregion

// typescript typecheck
const factory: GwClientShapeFactory = {
  code,
  passThrough,
  noData,
  type,
  examples,
  create: undefined,
  validate,
  sanitize,
  noSessionId: false,
};
export default factory;
