import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (APIKEY, USERKEY, sessionId, final) {
  // inputs
  const inputs = shapes.getShape("client-gw/accounts").create(sessionId, final); // throws InputValidationError

  // request
  const url = config.url.accounts;
  return await shared.request(APIKEY, USERKEY, url, inputs);
});
