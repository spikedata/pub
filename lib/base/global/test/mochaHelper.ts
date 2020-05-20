enum RUNTYPE {
  Mocha = 1,
  Console = 2,
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      runtype: RUNTYPE;
    }
  }
}

export function initGlobal() {
  // // logger
  // if (!global.log) {
  //   config.logger.init(config.log);
  //   global.log = config.logger;
  // }

  // global.SPIKE_DEBUG = config.spikeDebug;

  // mocha vs cli
  global.runtype = typeof describe === "undefined" ? RUNTYPE.Console : RUNTYPE.Mocha;
}
