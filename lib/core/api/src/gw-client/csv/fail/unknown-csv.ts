import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "csv/fail/unknown-csv",
  type: enums.TYPES.ERROR,
  passThrough: true, // from lambda-gw
  noData: true,
  blame: enums.BLAME.SPIKE,
  noSessionId: true, // shapeExplorer
  message: "we did not recognise this csv format",
  create: undefined,

  // noData
  examples: undefined,
  validate: undefined,
  sanitize: undefined,
};
export default factory;
