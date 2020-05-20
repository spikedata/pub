import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "pdf/fail/unknown-exception",
  type: enums.TYPES.ERROR,
  passThrough: true,
  // noData
  noData: true,
  examples: undefined,
  create: undefined,
  validate: undefined,
  sanitize: undefined,
  // error
  noSessionId: true,
  blame: enums.BLAME.SPIKE,
  message: "an unspecified exception ocurred",
};
export default factory;
