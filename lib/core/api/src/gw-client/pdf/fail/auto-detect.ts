import * as enums from "../../../enums";
import { GwClientErrorFactory } from "../../../shape";

const Types = {
  "scan-rule-auto": "has been scanned - meta data matched a known scanner - like Canon, Ricoh", //meta-rule
  "broken-utf16-auto":
    "the pdf has been modified and re-saved with utf16 encoding - we don't support this encoding", // detect-function
  "broken-encoding-auto":
    "the pdf has been modified and re-saved with an unknown encoding - the text is unreadable", // detect-function
  "junk-rule-auto":
    "this matches a known pdf document which we see frequently and don't support - like Game Credit Statements, CIPC documents, IDs, etc...", // text-rule
  "new-todo-rule-auto":
    "Forthcoming feature - i.e. a new parser which we've identified but not yet had time to implement", // text-rule
  "unsupported-rule-auto":
    "text matched a known unsupported pdf format - like Africa Bank Loan Statements, Absa Investment Summaries, Bidvest Cardholder Statements, etc...", // text-rule
};

const examples = {
  scan: {
    type: "scan-rule-auto",
    message: Types["scan-rule-auto"],
  },
  utf16: {
    type: "broken-utf16-auto",
    message: Types["broken-utf16-auto"],
  },
  encoding: {
    type: "broken-encoding-auto",
    message: Types["broken-encoding-auto"],
  },
  junk: {
    type: "junk-rule-auto",
    message: Types["junk-rule-auto"],
  },
  newTodo: {
    type: "new-todo-rule-auto",
    message: Types["new-todo-rule-auto"],
  },
  unsupported: {
    type: "unsupported-rule-auto",
    message: Types["unsupported-rule-auto"],
  },
};

const create = function (type) {
  return {
    type,
    message: Types[type],
  };
};

const validate = {
  type: "object",
  properties: {
    type: {
      required: true,
      type: "string",
      enum: Object.keys(Types),
    },
    message: {
      required: false,
      type: "string",
    },
  },
};

const sanitize = undefined;

// typescript typecheck
const factory: GwClientErrorFactory = {
  code: "pdf/fail/auto-detect",
  type: enums.TYPES.ERROR,
  passThrough: true,

  // error
  blame: enums.BLAME.USER,
  noSessionId: true,
  message: "the pdf matched a pattern which we don't process",

  // data
  examples,
  create,
  validate,
  sanitize,
};
export default factory;
