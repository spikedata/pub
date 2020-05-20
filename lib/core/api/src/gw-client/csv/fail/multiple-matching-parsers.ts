import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "csv/fail/multiple-matching-parsers",
  type: enums.TYPES.ERROR,
  passThrough: true, // from lambda-gw
  noData: true,
  blame: enums.BLAME.SPIKE,
  noSessionId: true, // shapeExplorer
  message: "two or more parsers were found which can process this csv",
  create: undefined,

  // noData
  examples: undefined,
  validate: undefined,
  sanitize: undefined,
};
export default factory;
