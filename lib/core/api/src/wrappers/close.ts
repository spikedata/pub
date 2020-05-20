import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (APIKEY, USERKEY, sessionId) {
  // inputs
  const inputs = shapes.getShape("client-gw/close").create(sessionId); // throws InputValidationError

  // request
  const url = config.url.close;
  return await shared.request(APIKEY, USERKEY, url, inputs);
});
