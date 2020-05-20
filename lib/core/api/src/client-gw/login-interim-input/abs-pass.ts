import * as enums from "../../enums";
import InputValidationError from "../../lib/inputValidationError";
import * as Schema from "../../lib/schema";
import * as uuid from "../../lib/uuid";
import * as composerCodeData from "../composer/codeData";
import { ClientGwComposedShapeFactory } from "../../shape";

const code = "login-interim-input/abs-pass";
const type = enums.TYPES.INPUTS;
const channel = enums.Channel.Bchan;
const sessionBased = true;

//#region examples

export interface Instance {
  sessionId: string;
  final?: boolean;
  code: string;
  data: string[];
}

export interface Examples {
  default: Instance;
}

const examples: Examples = {
  default: {
    sessionId: uuid.testUuid(),
    final: false,
    code,
    data: ["p", "a", "s"],
  },
};

//#endregion

//#region create

// NOTE: final=false: normally you want to do /accounts & /transactions after login
const create = function (sessionId, final = false, data) {
  const instance = {
    sessionId,
    final,
    code,
    data,
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
  type: "array",
  items: {
    type: "string",
    minItems: 3,
    maxItems: 3,
  },
};

const validate = composerCodeData.compose(true, true, true, dataSchema, additionalSchema);

//#endregion

//#region sanitize

const ownSanitize = "[*,*,*]";

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
