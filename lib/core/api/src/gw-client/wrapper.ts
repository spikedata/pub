import * as Enums from "../enums";
import * as common from "../lib/common";
import InputValidationError from "../lib/inputValidationError";
import * as Schema from "../lib/schema";
import * as uuid from "../lib/uuid";
// NOTE: circular require problem - can't use Shapes in root scope
// const Shapes = require("../shapes");
import AccountsSuccess, { Examples as AccountsSuccessExamples } from "./accounts/success";
import ErrorCommonDevInvalidInputs from "./error/common/dev/invalid-inputs";
import LoginInterimInputAbsPass, {
  Examples as LoginInterimInputAbsPassExamples,
} from "./login/interim-input-abs-pass";

const Shapes = {
  "gw-client/accounts/success": AccountsSuccess,
  "gw-client/login/interim-input-abs-pass": LoginInterimInputAbsPass,
  "gw-client/error/common/dev/invalid-inputs": ErrorCommonDevInvalidInputs,
};

export default abstract class Wrapper {
  public static code = "gw-client/wrapper"; // specified by wrapped.data. This .code is only used as wrapperCode in common.validateWrapped
  public static type = Enums.TYPES.NOTSET; // specified by wrapped.data

  //#region create

  public static create = function (requestId, sessionId, code, type, data?) {
    return {
      requestId,
      sessionId,
      code,
      type,
      data,
    };
  };

  public static createError = function (requestId, code, data?) {
    return Wrapper.create(requestId, undefined, code, Enums.TYPES.ERROR, data);
  };

  //#endregion

  //#region examples

  public static examples = {
    "gw-client/wrapper[gw-client/accounts/success]": Wrapper.create(
      uuid.testUuid(),
      uuid.testUuid(),
      Shapes["gw-client/accounts/success"].code,
      Shapes["gw-client/accounts/success"].type,
      (Shapes["gw-client/accounts/success"].examples as AccountsSuccessExamples).default
    ),
    "gw-client/wrapper[login/interim-input-abs-pass]": Wrapper.create(
      uuid.testUuid(),
      uuid.testUuid(),
      Shapes["gw-client/login/interim-input-abs-pass"].code,
      Shapes["gw-client/login/interim-input-abs-pass"].type,
      (Shapes["gw-client/login/interim-input-abs-pass"]
        .examples as LoginInterimInputAbsPassExamples).default
    ),
    "gw-client/wrapper[gw-client/error/common/dev/invalid-inputs]": Wrapper.createError(
      uuid.testUuid(),
      Shapes["gw-client/error/common/dev/invalid-inputs"].code,
      (Shapes["gw-client/error/common/dev/invalid-inputs"].examples as any).default
    ),
  };

  //#endregion

  //#region validate

  public static wrapperSchema = {
    type: "object",
    properties: {
      requestId: {
        required: true,
        type: "string",
        format: "uuidV4",
      },
      sessionId: {
        required: false, // not for final responses (NOTE: one-off requests like /pdf only send one response = final response)
        type: "string",
        format: "uuidV4",
      },
      code: {
        required: true,
        type: "string",
      },
      type: {
        required: true,
        type: "integer",
        enum: Enums.TYPES.values(),
      },
      data: {
        required: false, // see depends on shape.noData
        //type: "any"
      },
    },
  };

  public static validate = function (wrappedInstance) {
    common.validateWrapped(Wrapper, wrappedInstance);
  };

  //#endregion

  //#region marshall

  // create wrapped data
  //  .data = marshall or passThrough (from lambda-gw => gw-client)
  //  input* were created on lambda - see lambda-gw/*chan/wrapper.createResponse
  public static marshall = function (requestId, sessionId = undefined, inputCode, inputData) {
    const { outputShape, outputCode, outputData } = common.marshall(
      undefined,
      Wrapper,
      inputCode,
      inputData
    );
    // create instance which matches wrapperSchema
    const wrappedInstance = Wrapper.create(
      requestId,
      sessionId,
      outputCode,
      outputShape.type,
      outputData
    );
    const errors = Schema.validate(Wrapper.code, Wrapper.validate, wrappedInstance);
    if (errors) {
      throw new InputValidationError(errors);
    }
    return wrappedInstance;
  };

  //#endregion

  //#region sanitize

  public static sanitize = function (wrappedInstance) {
    return common.sanitizeWrapped(Wrapper, wrappedInstance);
  };

  //#endregion

  //#region log

  public static log = function (wrappedInstance) {
    const sanitized = Wrapper.sanitize(wrappedInstance);
    global.log.net("GW -> Client", JSON.stringify(sanitized, null, 2));
  };

  //#endregion
}
