import accounts from "./accounts";
import estatement from "./estatement";
import login from "./login";
import loginInterimInput from "./login-interim-input";
import loginInterimWait from "./login-interim-wait";
import statements from "./statements";
import transactions from "./transactions";
import close from "./close";
import pdf from "./pdf";
import csv from "./csv";

function check(func) {
  if (this[func]) {
    return true;
  } else {
    const funcs = Object.keys(this)
      .filter((x) => x !== "check")
      .join("\n");
    console.error(`invalid function, valid options = \n${funcs}`);
    return false;
  }
}

export default {
  accounts,
  estatement,
  login,
  "login-interim-input": loginInterimInput,
  "login-interim-wait": loginInterimWait,
  statements,
  transactions,
  close,
  pdf,
  csv,
  check,
};
