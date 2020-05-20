import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (APIKEY, USERKEY, sessionId, final, accountNumber, numStatements) {
  // inputs
  const inputs = shapes
    .getShape("client-gw/statements")
    .create(sessionId, final, accountNumber, numStatements); // throws InputValidationError

  // request
  const url = config.url.statements;
  return await shared.request(APIKEY, USERKEY, url, inputs);
});
