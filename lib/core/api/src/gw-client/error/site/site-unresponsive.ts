import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";
import parent from "../no-data";

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
  message: "The bank site took too long to respond. Please try again.",
  code: "error/site/site-unresponsive",
  blame: enums.BLAME.SITE,
};
export default factory;
