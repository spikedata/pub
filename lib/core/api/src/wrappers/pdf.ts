import * as shapes from "../shapes";
import * as config from "../config/static";
import * as shared from "./shared";

export default (async function (APIKEY, USERKEY, pdfPath, pass = undefined, buffer = undefined) {
  // inputs
  const inputs = shapes.getShape("client-gw/pdf").create(pdfPath, pass, buffer);

  // request
  const url = config.url.pdf;
  return await shared.request(APIKEY, USERKEY, url, inputs);
});
