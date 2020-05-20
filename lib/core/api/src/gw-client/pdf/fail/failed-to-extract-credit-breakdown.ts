import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "pdf/fail/failed-to-extract-credit-breakdown",
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
  message: "couldn't find the breakdown/overview section in a credit card statement",
};
export default factory;
