export const url = "/pdf";
export const swagger = {
  tags: ["Utilities"],
  method: "post",
  summary: "Parse a pdf statement and return transactions and account holder info",
  description: "Note - does not require login",
  operationId: "pdf",
};
export const shapes = {
  inputs: "pdf",
  outputs: {
    // keep in sync with $/spike-db/src/lib/pdfReviewSystem.js: codeToParseResultState - see $/spike-pdf/test/spikeApiEnums.js
    success: [
      "pdf/success/bank-statement-no-balance",
      "pdf/success/bank-statement-normal",
      "pdf/success/credit-card-breakdown-multi-user",
      "pdf/success/credit-card-breakdown",
      "pdf/success/credit-card-simple",
    ],
    error: [
      // general
      "error/common/access/exceeded-max-concurrent-requests",
      "error/common/access/insufficient-credit",
      "error/common/dev/authorization",
      "error/common/dev/invalid-inputs",
      "error/common/exception",
      // pdf specific
      "pdf/fail/auto-detect",
      "pdf/fail/file-not-found",
      "pdf/fail/pdf-read-exception",
      "pdf/fail/invalid-pdf-exception",
      "pdf/fail/password-incorrect",
      "pdf/fail/password-required",
      "pdf/fail/image-pdf",
      "pdf/fail/image-pdf-with-ocr",
      "pdf/fail/pdf-js-error",
      "pdf/fail/pdf-js-exception",
      "pdf/fail/unknown-pdf",
      "pdf/fail/multiple-matching-parsers",
      "pdf/fail/unknown-exception",
      "pdf/fail/failed-to-extract-statement-date",
      "pdf/fail/failed-to-extract-credit-breakdown",
      "pdf/fail/invalid-data-extracted",
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
