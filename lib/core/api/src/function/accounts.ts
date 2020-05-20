export const url = "/accounts";
export const swagger = {
  tags: ["Web"],
  method: "post",
  summary: "List all accounts & balances held by user",
  operationId: "accounts",
};
export const shapes = {
  // NOTE: don't use "client-gw" || "gw-client" prefixes - breaks $refs in swagger
  inputs: "accounts",
  outputs: {
    success: ["accounts/success"],
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
