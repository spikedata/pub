import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";
import parent from "../no-data";

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
    "This is a new account, internet banking has not been setup properly. FNB requires the user to log in and acknowledge various declarations online.",
  code: "error/fnb/online-banking-legal-documentation",
  blame: enums.BLAME.USER,
};
export default factory;
