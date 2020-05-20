import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "csv/fail/unknown-exception",
  type: enums.TYPES.ERROR,
  passThrough: true, // from lambda-gw
  noData: true,
  blame: enums.BLAME.SPIKE,
  noSessionId: true, // shapeExplorer
  message: "an unspecified exception ocurred",
  create: undefined,

  // noData
  examples: undefined,
  validate: undefined,
  sanitize: undefined,
};
export default factory;
