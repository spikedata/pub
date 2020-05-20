import * as enums from "../../../../enums";
import { GwClientErrorFactory } from "../../../../shape";
import parent from "../../no-data";

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
  message: "ABSA logged the user off whilst we were logging in",
  code: "error/site/abs/logged-off",
  blame: enums.BLAME.SITE,
};
export default factory;
