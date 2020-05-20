import * as enums from "../enums";
import InputValidationError from "../lib/inputValidationError";
import * as Schema from "../lib/schema";
import * as uuid from "../lib/uuid";
import * as composerBasic from "./composer/basic";
import { ClientGwComposedShapeFactory } from "../shape";

const code = "login-interim-wait";
const type = enums.TYPES.INPUTS;
const channel = enums.Channel.Bchan;
const sessionBased = true;

//#region examples

const examples = {
  default: {
    sessionId: uuid.testUuid(),
    final: false,
  },
};

//#endregion

//#region create

const create = function (sessionId, final = true) {
  const instance = {
    sessionId,
    // code, // not required atm hardcoded in routeHandler
    final,
  };

  const errors = Schema.validate(code, validate, instance);
  if (errors) {
    throw new InputValidationError(errors);
  }
  return instance;
};

//#endregion

//#region validate

// NOTE: wait requires no inputs so no need to disambiguate in routeHandler i.e. don't need to compose { code, data } into this shape
const composer = composerBasic;

const additionalSchema = undefined;

const validate = composerBasic.compose(true, false, additionalSchema);

//#endregion

//#region sanitize

const ownSanitize = undefined;

const sanitize = undefined;

//#endregion

// typescript typecheck
const factory: ClientGwComposedShapeFactory = {
  code,
  type,
  channel,
  sessionBased,
  examples,
  create,
  composer,
  additionalSchema,
  validate,
  ownSanitize,
  sanitize,
};
export default factory;
