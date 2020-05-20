import * as enums from "../../../../enums";
import { GwClientErrorFactory } from "../../../../shape";
import parent from "../../array-of-strings";

// typescript typecheck
const factory: GwClientErrorFactory = {
  // parent
  type: parent.type,
  create: parent.create,
  validate: parent.validate,
  sanitize: parent.sanitize,
  passThrough: parent.passThrough,
  noSessionId: parent.noSessionId,
  // own
  message: "incorrect inputs",
  code: "error/common/dev/invalid-inputs",
  blame: enums.BLAME.CLIENT,
  examples: {
    default: ["Request size limit of 6MB exceeded"],
  },
};
export default factory;
