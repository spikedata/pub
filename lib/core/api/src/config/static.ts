import FN from "../function";

const _server = "https://api.spikedata.co.za";

export const url = {
  // web-session
  accounts: _server + FN["accounts"].url,
  estatement: _server + FN["estatement"].url,
  login: _server + FN["login"].url,
  "login-interim-input": _server + FN["login-interim-input"].url,
  "login-interim-wait": _server + FN["login-interim-wait"].url,
  statements: _server + FN["statements"].url,
  transactions: _server + FN["transactions"].url,
  close: _server + FN["close"].url,

  // pdf
  pdf: _server + FN["pdf"].url,
  csv: _server + FN["csv"].url,
};

// this function is forr internal use
export function changeServer({ webSession, lambdaPdf, lambdaCsv }) {
  // web-session
  url.accounts = webSession + FN["accounts"].url;
  url.estatement = webSession + FN["estatement"].url;
  url.login = webSession + FN["login"].url;
  url["login-interim-input"] = webSession + FN["login-interim-input"].url;
  url["login-interim-wait"] = webSession + FN["login-interim-wait"].url;
  url.statements = webSession + FN["statements"].url;
  url.transactions = webSession + FN["transactions"].url;
  url.close = webSession + FN["close"].url;

  // pdf
  url.pdf = lambdaPdf + FN["pdf"].url;
  url.csv = lambdaCsv + FN["csv"].url;
}
