import FN from "../function";

const _server = "https://api-v6.spikedata.co.za";

export const url = {
  // web
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

export function changeServer(server) {
  // web
  url.accounts = server + FN["accounts"].url;
  url.estatement = server + FN["estatement"].url;
  url.login = server + FN["login"].url;
  url["login-interim-input"] = server + FN["login-interim-input"].url;
  url["login-interim-wait"] = server + FN["login-interim-wait"].url;
  url.statements = server + FN["statements"].url;
  url.transactions = server + FN["transactions"].url;
  url.close = server + FN["close"].url;

  // pdf
  url.pdf = _server + FN["pdf"].url;
  url.csv = _server + FN["csv"].url;
}
