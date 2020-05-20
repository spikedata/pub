export const url = "/csv";
export const swagger = {
  tags: ["Utilities"],
  method: "post",
  summary: "Parse a csv statement and return transactions and account holder info",
  description: "Note - does not require login",
  operationId: "csv",
};
export const shapes = {
  inputs: "csv",
  outputs: {
    // keep in sync with $/spike-db/src/lib/pdfReviewSystem.js: codeToParseResultState - see $/spike-csv/test/spikeApiEnums.js
    success: ["csv/success/bank-statement"],
    error: [
      // general
      "error/common/access/exceeded-max-concurrent-requests",
      "error/common/access/insufficient-credit",
      "error/common/dev/authorization",
      "error/common/dev/invalid-inputs",
      "error/common/exception",
      // csv specific
      "csv/fail/unknown-csv",
      "csv/fail/multiple-matching-parsers",
      "csv/fail/unknown-exception",
      "csv/fail/invalid-data-extracted",
    ],
  },
  additional: {
    // enums,
    // schemas
  },
};
export default {
  url,
  swagger,
  shapes,
};
