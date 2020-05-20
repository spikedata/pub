import axios from "axios";
import InputValidationError from "../lib/inputValidationError";
import * as uuid from "../lib/uuid";

const MAX = 20 * 1024 * 1024;

export const request = async function (APIKEY, USERKEY, url, inputs) {
  // check keys
  const validationErrors = [];
  if (!uuid.validUuidV4(APIKEY)) {
    validationErrors.push("apikey invalid");
  }
  if (!uuid.validUuidV4(USERKEY)) {
    validationErrors.push("userkey invalid");
  }
  if (validationErrors.length) {
    throw new InputValidationError(validationErrors);
  }

  // request
  const response = await axios.post(url, inputs, {
    headers: {
      "x-api-key": APIKEY,
      "x-user-key": USERKEY,
      "Content-Type": "application/json",
    },
    maxContentLength: MAX,
  });
  if (response.status === 200) {
    return response.data;
  }
  throw response;
};
