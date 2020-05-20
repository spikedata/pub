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
  message: "username and or password is incorrect",
  code: "error/site/login-failed",
  blame: enums.BLAME.USER,
};
export default factory;
