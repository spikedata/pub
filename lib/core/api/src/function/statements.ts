export const url = "/statements";
export const swagger = {
  tags: ["Web"],
  method: "post",
  summary: "Archived history statement (some banks may charge)",
  operationId: "statements",
};
export const shapes = {
  // NOTE: don't use "client-gw" || "gw-client" prefixes - breaks $refs in swagger
  inputs: "statements",
  outputs: {
    success: ["file/success"],
    error: [
      // general & web
      "error/common/dev/authorization",
      "error/common/dev/function-not-supported-on-site",
      "error/common/dev/invalid-inputs",
      "error/common/dev/sent-another-request-after-final-response",
      "error/common/exception",
      "error/common/session-in-use",
      "error/common/session-timed-out",
      "error/fnb/statements-disabled",
      "error/site/bank-blocked",
      "error/site/input-validation-failed",
      "error/site/internal",
      "error/site/no-statements-available",
      "error/site/site-change-detected",
      "error/site/site-maintenance",
      "error/site/site-unreachable",
      "error/site/site-unresponsive",
    ],
  },
};
export default {
  url,
  swagger,
  shapes,
};
