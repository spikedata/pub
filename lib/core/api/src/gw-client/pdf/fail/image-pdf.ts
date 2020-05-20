import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const factory: GwClientErrorFactory = {
  code: "pdf/fail/image-pdf",
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
  blame: enums.BLAME.USER,
  message: "PDF is image based not text based, and hence can't be parsed",
};
export default factory;
