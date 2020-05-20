import * as enums from "../../enums";
import { GwClientErrorFactory, createUnused } from "../../shape";

// typescript typecheck
const factory: GwClientErrorFactory = {
  // parent
  type: enums.TYPES.ERROR,
  create: createUnused,
  validate: {
    type: "array",
    items: {
      type: "string",
    },
    minItems: 1,
  },
  sanitize: undefined,
  passThrough: true, // from lambda-gw
  noSessionId: true, // shapeExplorer

  // override in instance
  message: undefined,
  code: "error/array-of-strings",
  blame: undefined,
  examples: {
    default: ["string1"],
  },
};
export default factory;
