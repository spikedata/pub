import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (TOKEN, sessionId, final) {
  // inputs

  const inputs = shapes.getShape("client-gw/login-interim-wait").create(sessionId, final); // throws InputValidationError
  // request
  const url = config.url["login-interim-wait"];
  return await shared.request(TOKEN, url, inputs);
});
