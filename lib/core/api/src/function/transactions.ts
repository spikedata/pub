export const url = "/transactions";
export const swagger = {
  tags: ["Web"],
  method: "post",
  summary: "Up to 90 days transaction history",
  operationId: "transactions",
};
export const shapes = {
  // NOTE: don't use "client-gw" || "gw-client" prefixes - breaks $refs in swagger
  inputs: "transactions",
  outputs: {
    success: "transactions/success",
    error: [
      // general & web
      "error/common/dev/authorization",
      "error/common/dev/invalid-inputs",
      "error/common/dev/sent-another-request-after-final-response",
      "error/common/exception",
      "error/common/session-in-use",
      "error/common/session-timed-out",
      "error/site/bank-blocked",
      "error/site/input-validation-failed",
      "error/site/internal",
      "error/site/no-transactions-over-period",
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
