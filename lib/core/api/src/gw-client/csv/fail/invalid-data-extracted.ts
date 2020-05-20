import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "csv/fail/invalid-data-extracted",
  type: enums.TYPES.ERROR,
  passThrough: true, // from lambda-gw
  noData: true,
  blame: enums.BLAME.SPIKE,
  noSessionId: true, // shapeExplorer
  message:
    "we successfully extract the data from the csv however it did not conform to the expected output schema",
  create: undefined,

  // noData
  examples: undefined,
  validate: undefined,
  sanitize: undefined,
};
export default factory;
