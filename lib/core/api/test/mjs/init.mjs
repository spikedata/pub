function initGlobals(config) {
  // logger
  if (!global.log) {
    config.logger.init(config.log);
    global.log = config.logger;
  }

  global.SPIKE_DEBUG = config.spikeDebug;

  // mocha vs cli
  global.RUNTYPE = {
    Mocha: 1,
    Console: 2,
  };
  global.runtype = typeof describe === "undefined" ? global.RUNTYPE.Console : global.RUNTYPE.Mocha;
}

export const init = function(config) {
  initGlobals(config);
};

export const shutdown = function() {};
