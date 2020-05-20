export const url = "/close";
export const swagger = {
  tags: ["Web"],
  method: "post",
  summary: "Close an open session",
  operationId: "close",
};
export const shapes = {
  // NOTE: don't use "client-gw" || "gw-client" prefixes - breaks $refs in swagger
  inputs: "close",
  outputs: {
    success: ["close/success"],
    error: [
      // general & web
      "error/common/dev/authorization",
      "error/common/dev/invalid-inputs",
      "error/common/dev/sent-another-request-after-final-response",
      "error/common/exception",
      "error/common/session-in-use",
      "error/common/session-timed-out",
      "error/site/input-validation-failed",
      "error/site/internal",
      "error/site/site-change-detected",
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
