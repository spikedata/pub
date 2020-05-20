export const url = "/login-interim-input";
export const swagger = {
  tags: ["Web"],
  method: "post",
  summary:
    "2nd step in a 2-step login process where user input is required - e.g. STD OTP & ABS pass",
  operationId: "login",
};
export const shapes = {
  // NOTE: don't use "client-gw" || "gw-client" prefixes - breaks $refs in swagger
  inputs: ["login-interim-input/abs-pass", "login-interim-input/std-otp"],
  outputs: {
    success: "login-interim-input/success",
    error: [
      // general & web
      "error/common/dev/invalid-inputs",
      "error/common/dev/sent-another-request-after-final-response",
      "error/common/exception",
      "error/common/session-in-use",
      "error/common/session-timed-out",
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
      "error/user/denied",
      "error/user/took-too-long",
    ],
  },
};
export default {
  url,
  swagger,
  shapes,
};
