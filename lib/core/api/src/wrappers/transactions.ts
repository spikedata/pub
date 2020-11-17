import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (TOKEN, sessionId, final, accountNumber, numDays) {
  // inputs
  const inputs = shapes.getShape("client-gw/transactions").create(sessionId, final, accountNumber, numDays); // throws InputValidationError

  // request
  const url = config.url.transactions;
  return await shared.request(TOKEN, url, inputs);
});
