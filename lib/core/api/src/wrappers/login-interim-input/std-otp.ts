import * as shapes from "../../shapes";
import * as config from "../../config/static";
import * as shared from "../shared";

export default (async function (TOKEN, sessionId, final, data) {
  // inputs
  const inputs = shapes.getShape("client-gw/login-interim-input/std-otp").create(sessionId, final, data); // throws InputValidationError

  // request
  const url = config.url["login-interim-input-std-otp"]; // HACK:api
  return await shared.request(TOKEN, url, inputs);
});
