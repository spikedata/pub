const chalk = require("chalk");
const basicColoredLogger = require("../lib/basicColoredLogger");

const AppLogName = "pdf-cli";

module.exports = {
  singletons: {
    logger: {
      interface: basicColoredLogger,
      implementation: basicColoredLogger,
      implementationName: "basicColoredLogger",
    },
  },

  log: {
    host: AppLogName,
    /* */
    levelFilter: {
      net: true,
      debug: true,
      info: true,
      warn: true,
      error: true,
      fatal: true,
      alertWarn: true,
      alertError: true,
      scrape: true,
      screen: true,
      step: true,
    },
    /* */
    colors: {
      net: chalk.gray,
      debug: chalk.gray,
      info: chalk.gray,
      warn: chalk.gray,
      error: chalk.gray,
      fatal: chalk.red,
      alertWarn: chalk.red,
      alertError: chalk.red,
      scrape: chalk.gray,
      screen: chalk.gray,
      step: chalk.gray,
    },
    quiet: true,
  },

  quiet: true,
};
