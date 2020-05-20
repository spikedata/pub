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
  message: "too many active requests, try again later",
  code: "error/common/access/exceeded-max-concurrent-requests",
  blame: enums.BLAME.CLIENT,
};
export default factory;
