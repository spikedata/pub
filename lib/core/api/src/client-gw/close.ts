import * as enums from "../enums";
import InputValidationError from "../lib/inputValidationError";
import * as Schema from "../lib/schema";
import * as uuid from "../lib/uuid";
import * as composerBasic from "./composer/basic";
import { ClientGwComposedShapeFactory } from "../shape";

const code = "close";
const type = enums.TYPES.INPUTS;
const channel = enums.Channel.Bchan;
const sessionBased = true;

//#region examples

const examples = {
  default: {
    sessionId: uuid.testUuid(),
    final: true,
  },
};

//#endregion

//#region create

const create = function (sessionId) {
  const instance = {
    sessionId,
    final: true,
  };
  const errors = Schema.validate(code, validate, instance);
  if (errors) {
    throw new InputValidationError(errors);
  }
  return instance;
};

//#endregion

//#region validate

const composer = composerBasic;

const additionalSchema = undefined; // no additional data

const validate = composerBasic.compose(true, true, additionalSchema);

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
