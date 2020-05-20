import * as noLogger from "../log/noLogger";

export default {
  spikeDebug: true,
  logger: noLogger,
  log: {
    host: "API.TEST",
    /* */
    levelFilter: {
      net: false,
      debug: false,
      info: false,
      warn: false,
      error: true,
      fatal: true,
      alertWarn: false,
      alertError: false,
      scrape: false,
      screen: false,
      step: false,
    },
    quiet: true,
  },
};
