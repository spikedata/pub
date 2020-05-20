import { ILogger } from "./i-logger";

// Export any global types defined by the package here
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      // so we can use global.log.info() etc...
      log: ILogger;
      SPIKE_DEBUG: boolean;
    }
  }
  // so we can use log.info() etc...
  let log: ILogger;
  let SPIKE_DEBUG: boolean;
}

if (process.env.SPIKE_DEBUG) {
  // console.log("SPIKE_DEBUG");
  global.SPIKE_DEBUG = true;
} else {
  global.SPIKE_DEBUG = false;
}
