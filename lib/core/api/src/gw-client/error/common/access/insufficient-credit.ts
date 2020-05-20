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
  message: "please purchase more credits",
  code: "error/common/access/insufficient-credit",
  blame: enums.BLAME.CLIENT,
};
export default factory;
