import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (TOKEN, sessionId, final, accountNumber, numStatements) {
  // inputs
  const inputs = shapes.getShape("client-gw/statements").create(sessionId, final, accountNumber, numStatements); // throws InputValidationError

  // request
  const url = config.url.statements;
  return await shared.request(TOKEN, url, inputs);
});
