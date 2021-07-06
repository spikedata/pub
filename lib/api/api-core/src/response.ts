import * as constants from "./constants";

export type ShapeInstance = object | string | string[];

export interface StandardResponse {
  requestId: string; // uuid
  code: string;
  type: constants.TYPES;
  data?: ShapeInstance; // some errors have no data
}

export interface SessionResponse extends StandardResponse {
  sessionId?: string; // uuid
}

export interface ErrorResponse extends StandardResponse {
  message: string;
  blame: constants.BLAME;
}
