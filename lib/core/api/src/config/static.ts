import FN from "../function";

const _server = "https://api.spikedata.co.za";

export const url = {
  // web-session
  accounts: _server + FN["accounts"].url,
  estatement: _server + FN["estatement"].url,
  login: _server + FN["login"].url,
  "login-interim-input": _server + FN["login-interim-input"].url,
  "login-interim-input-abs-pass": _server + "/login-interim-input-abs-pass", // HACK:api
  "login-interim-input-std-otp": _server + "/login-interim-input-std-otp", // HACK:api
  "login-interim-wait": _server + FN["login-interim-wait"].url,
  statements: _server + FN["statements"].url,
  transactions: _server + FN["transactions"].url,
  close: _server + FN["close"].url,

  // pdf
  pdf: _server + FN["pdf"].url,
  csv: _server + FN["csv"].url,
};

// this function is forr internal use
export function changeServer({ lambdaWebSession, lambdaPdf, lambdaCsv }) {
  // web-session
  url.accounts = lambdaWebSession + FN["accounts"].url;
  url.estatement = lambdaWebSession + FN["estatement"].url;
  url.login = lambdaWebSession + FN["login"].url;
  url["login-interim-input"] = lambdaWebSession + FN["login-interim-input"].url;
  url["login-interim-input-abs-pass"] = lambdaWebSession + "/login-interim-input-abs-pass"; // HACK:api
  url["login-interim-input-std-otp"] = lambdaWebSession + "/login-interim-input-std-otp"; // HACK:api
  url["login-interim-wait"] = lambdaWebSession + FN["login-interim-wait"].url;
  url.statements = lambdaWebSession + FN["statements"].url;
  url.transactions = lambdaWebSession + FN["transactions"].url;
  url.close = lambdaWebSession + FN["close"].url;

  // pdf
  url.pdf = lambdaPdf; // + FN["pdf"].url;
  url.csv = lambdaCsv; // + FN["csv"].url;
}
