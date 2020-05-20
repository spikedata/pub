export const url = "/login";
export const swagger = {
  tags: ["Web"],
  method: "post",
  summary: "Initiate a session by logging in to an internet banking account",
  operationId: "login",
};
export const shapes = {
  inputs: "login",
  outputs: {
    success: "login/success",
    interim: [
      "login/interim-input-abs-pass",
      "login/interim-input-std-otp",
      "login/interim-wait-cap-2fa",
    ],
    error: [
      // general & web
      "error/common/access/exceeded-max-concurrent-requests",
      "error/common/access/insufficient-credit",
      "error/common/dev/authorization",
      "error/common/dev/invalid-inputs",
      "error/common/exception",
      "error/fnb/online-banking-legal-documentation",
      "error/site/bank-blocked",
      "error/site/captcha",
      "error/site/input-validation-failed",
      "error/site/internal",
      "error/site/login-failed",
      "error/site/ok-got-it",
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
