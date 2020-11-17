import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (TOKEN, csvPath, buffer = undefined) {
  // inputs
  const inputs = shapes.getShape("client-gw/csv").create(csvPath, buffer);

  // request
  const url = config.url.csv;
  return await shared.request(TOKEN, url, inputs);
});
