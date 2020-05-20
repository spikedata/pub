import * as enums from "../../../../enums";
import { GwClientErrorFactory } from "../../../../shape";
import parent from "../../no-data";

// typescript typecheck
const factory: GwClientErrorFactory = {
  // parent
  type: parent.type,
  create: parent.create,
  validate: parent.validate,
  sanitize: parent.sanitize,
  noData: parent.noData,
  examples: parent.examples,
  passThrough: parent.passThrough,
  noSessionId: parent.noSessionId,
  // own
  message:
    "You previously sent a request with .final=true and now have sent another request whilst the session is shutting down",
  code: "error/common/dev/sent-another-request-after-final-response",
  blame: enums.BLAME.CLIENT,
};
export default factory;
