import * as enums from "../../enums";
import InputValidationError from "../../lib/inputValidationError";
import * as Schema from "../../lib/schema";
import * as uuid from "../../lib/uuid";
import * as composerCodeData from "../composer/codeData";
import { ClientGwComposedShapeFactory } from "../../shape";

const code = "login-interim-input/std-otp";
const type = enums.TYPES.INPUTS;
const channel = enums.Channel.Bchan;
const sessionBased = true;

//#region examples

const examples = {
  default: {
    sessionId: uuid.testUuid(),
    final: false,
    code: code,
    data: "12345",
  },
};

//#endregion

//#region create

// NOTE: final=false: normally you want to do /accounts & /transactions after login
const create = function (sessionId, final = false, otp) {
  const instance = {
    sessionId,
    final,
    code,
    data: otp,
  };
  const errors = Schema.validate(code, validate, instance);
  if (errors) {
    throw new InputValidationError(errors);
  }
  return instance;
};

//#endregion

//#region validate

const composer = composerCodeData;

const additionalSchema = undefined;

const dataSchema = {
  required: true,
  type: "string", // NOTE: string is safer than number - leading 0's are stripped from numbers
};

const validate = composerCodeData.compose(true, true, true, dataSchema, additionalSchema);

//#endregion

//#region sanitize

const ownSanitize = "*****";

const sanitize = {
  data: ownSanitize,
};

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
  dataSchema,
  validate,
  ownSanitize,
  sanitize,
};
export default factory;
