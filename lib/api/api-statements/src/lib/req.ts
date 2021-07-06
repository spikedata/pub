import axios from "axios";
import InputValidationError from "./inputValidationError";

const MAX = 20 * 1024 * 1024;

export default async function request(TOKEN, url, inputs) {
  // check keys
  const validationErrors = [];
  if (!TOKEN) {
    validationErrors.push("token invalid");
  }
  if (validationErrors.length) {
    throw new InputValidationError(validationErrors);
  }

  // request
  const response = await axios.post(url, inputs, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    maxContentLength: MAX,
  });
  if (response.status === 200) {
    return response.data;
  }
  throw response;
}
