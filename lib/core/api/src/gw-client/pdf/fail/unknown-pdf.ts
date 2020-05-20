import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "pdf/fail/unknown-pdf",
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
  message: "we did not recognise this pdf format",
};
export default factory;
