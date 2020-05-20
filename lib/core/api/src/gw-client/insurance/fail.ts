import * as enums from "../../enums";
import { GwClientErrorFactory } from "../../shape";

const factory: GwClientErrorFactory = {
  code: "insurance/fail", // override in instance
  type: enums.TYPES.ERROR,
  examples: undefined, // override in instance
  validate: undefined,
  sanitize: undefined,
  noData: true,
  passThrough: true, // from lambda-gw
  noSessionId: true, // shapeExplorer
  create: undefined,
  blame: enums.BLAME.SPIKE,
};
export default factory;
