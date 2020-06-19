import * as enums from "../enums";
import InputValidationError from "../lib/inputValidationError";
import * as Schema from "../lib/schema";
import { ClientGwShapeFactory } from "../shape";

const code = "login";
const type = enums.TYPES.INPUTS;
const marshallTo = "gw-lambda/lchan/login";
const channel = enums.Channel.Lchan;
const sessionBased = true;
const firstRequestInSession = true;

//#region examples

const examples = {
  "ABS.0": {
    site: "ABS.0",
    user: "username",
    pin: "pin",
    usernum: 1,
  },
  "CAP.0": {
    site: "CAP.0",
    user: "username",
    pass: "password",
  },
  "FNB.0": {
    site: "FNB.0",
    user: "username",
    pass: "password",
  },
  "NED.0": {
    site: "NED.0",
    user: "username",
    pass: "password",
    pin: "pin",
  },
  "RMB.0": {
    site: "RMB.0",
    user: "username",
    pass: "password",
  },
  "STD.2018-01": {
    site: "STD.2018-01",
    user: "username",
    pass: "password",
  },
};

//#endregion

//#region create

const create = function (site, user, pin, pass, usernum) {
  const instance = { site, user, pin, pass, usernum };
  const errors = Schema.validate(code, validate, instance);
  if (errors) {
    throw new InputValidationError(errors);
  }
  return instance;
};

//#endregion

//#region validate

// For swagger definition - not used by validate()
const schema = {
  type: "object",
  properties: {
    site: {
      type: "string",
      required: true,
      enum: enums.Sites.keys(),
    },
    user: {
      type: "string",
      required: true,
    },
    pin: {
      type: "string",
    },
    usernum: {
      type: "string",
    },
  },
};

const validate = function (data) {
  const validationErrors = [];
  if (!data.site) {
    validationErrors.push("missing required input: site");
  } else {
    switch (data.site) {
      case "ABS.0": {
        if (!data.user) validationErrors.push("missing required input: user = Access account number");
        // NOTE: .pass is provided in /login-interim-input
        // if (data.pass)
        //   validationErrors.push(
        //     "additional input: pass = Password must not be supplied"
        //   );
        if (!data.pin) validationErrors.push("missing required input: pin");
        if (!data.usernum) {
          validationErrors.push("missing required input: usernum = User number");
        } else {
          const usernumstr = data.usernum.toString();
          if (usernumstr.match(/[^0-9]/) || parseInt(usernumstr) <= 0 || parseInt(usernumstr) > 9) {
            validationErrors.push("usernum should be an integer between 1 and 9");
          }
        }
        break;
      }
      case "CAP.0": {
        if (!data.user) validationErrors.push("missing required input: user = Username");
        if (!data.pass) validationErrors.push("missing required input: pass = Password/Remote PIN");
        break;
      }
      // eslint-disable-next-line no-fallthrough
      case "RMB.0":
      case "FNB.0": {
        if (!data.user) validationErrors.push("missing required input: user = Username");
        if (!data.pass) validationErrors.push("missing required input: pass = Password");
        break;
      }
      case "NED.0": {
        if (!data.user) validationErrors.push("missing required input: user = Profile number");
        if (!data.pass) validationErrors.push("missing required input: pass = Password");
        if (!data.pin) validationErrors.push("missing required input: pin");
        break;
      }
      case "STD.2018-01": {
        if (!data.user) validationErrors.push("missing required input: user = Email address");
        if (!data.pass) validationErrors.push("missing required input: pass = Password");
        break;
      }
      default:
        validationErrors.push("unknown site: " + data.site);
        break;
    }
  }

  return validationErrors.length === 0 ? undefined : validationErrors;
};

//#endregion

//#region sanitize

// NOTE: custom sanitizer used so that .pin & .pass are not added when they haven't been supplied
const sanitize = function (data) {
  const clone = Object.assign({}, data);
  if (clone.pin) clone.pin = "***";
  if (clone.pass) clone.pass = "***";
  return clone;
};

//#endregion

// typescript typecheck
const factory: ClientGwShapeFactory = {
  code,
  type,
  channel,
  sessionBased,
  examples,
  create,
  validate,
  schema,
  sanitize,
  firstRequestInSession,
  marshallTo,
};
export default factory;
