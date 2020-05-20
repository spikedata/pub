import * as enums from "../enums";
import InputValidationError from "../lib/inputValidationError";
import * as Schema from "../lib/schema";
import * as uuid from "../lib/uuid";
import * as composerBasic from "./composer/basic";
import { ClientGwComposedShapeFactory } from "../shape";

const code = "statements";
const type = enums.TYPES.INPUTS;
const channel = enums.Channel.Bchan;
const sessionBased = true;

//#region examples

const examples = {
  default: {
    sessionId: uuid.testUuid(),
    final: true,
    accountNumber: "1234567890",
    numStatements: 3,
  },
};

//#endregion

//#region create

const create = function (sessionId, final = true, accountNumber, numStatements = 3) {
  const instance = {
    sessionId,
    final,
    accountNumber,
    numStatements,
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

const additionalSchema = {
  accountNumber: {
    type: "string",
    required: true,
    minLength: 10,
  },
  numStatements: {
    required: true,
    type: "integer",
    minimum: 1,
    maximum: 12,
  },
};

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
