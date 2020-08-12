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
  message: "logged in successfully but FNB logged the user off, re-attempted multiple times with same result",
  code: "error/fnb/max-re-logins-failed",
  blame: enums.BLAME.SITE,
};
export default factory;
