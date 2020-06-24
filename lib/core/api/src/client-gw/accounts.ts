import * as enums from "../enums";
import InputValidationError from "../lib/inputValidationError";
import * as Schema from "../lib/schema";
import * as uuid from "../lib/uuid";
import * as composerBasic from "./composer/basic";
import { ClientGwComposedShapeFactory } from "../shape";
// import { AccountsRequest } from "../requestTypes";

const Accounts: ClientGwComposedShapeFactory = {
  code: "accounts",
  type: enums.TYPES.INPUTS,
  channel: enums.Channel.Bchan,
  sessionBased: true,
  noData: false,

  //#region examples

  examples: {
    default: {
      sessionId: uuid.testUuid(),
      final: true,
    },
  },

  //#endregion

  //#region create

  create: function (sessionId, final = true) {
    const instance = {
      sessionId,
      final,
    };
    const errors = Schema.validate(Accounts.code, Accounts.validate, instance);
    if (errors) {
      throw new InputValidationError(errors);
    }
    return instance;
  },

  //#endregion

  //#region validate

  composer: composerBasic,

  additionalSchema: undefined, // no additional data

  validate: composerBasic.compose(true, true, undefined),

  //#endregion

  //#region sanitize

  ownSanitize: undefined,

  sanitize: undefined,

  //#endregion
};

export default Accounts;
