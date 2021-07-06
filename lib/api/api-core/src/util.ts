import { TYPES } from "./constants";
import { StandardResponse } from "./response";

export function getResponseTypeString(response: StandardResponse): string {
  return TYPES[response.type];
}
