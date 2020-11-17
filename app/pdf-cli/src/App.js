const defaultConfig = require("./config/default");
const SpikeConfig = require("./spikeConfig");

async function initGlobals(logger, logSettings) {
  // logger
  if (!global.log) {
    logger.implementation.init(logSettings);
    global.log = logger.implementation;
  }
}

async function initDeps() {}

async function initSelf(spikeConfigFile) {
  if (!spikeConfigFile.token) {
    console.error("token missing in config, re-run `configure`");
    process.exit(-1);
  }
  _config.token = spikeConfigFile.token;
}

exports.ErrorCode = {
  Success: 0,
  Exception: 1,
  ProcessPdfFailed: 2, // one or more pdfs failed
};

let _initted = false;
let _errorCode = exports.ErrorCode.Success;
let _config;

exports.setErrorCode = function (e) {
  _errorCode = e;
};

exports.getErrorCode = function () {
  return _errorCode;
};

exports.config = function () {
  return _config;
};

exports.init = async function (
  { singletons = defaultConfig.singletons, log: logSettings, quiet } = defaultConfig, // config
  args
) {
  if (_initted) {
    global.log.info("already initialised");
    return true;
  }
  _config = { singletons, logSettings, quiet };

  // initGlobals, initDeps, initSelf, fixConfig, shutdown
  try {
    const { logger } = singletons;
    await initGlobals(logger, logSettings);
    if (args.subcommand === "configure") {
      return true; // don't SpikeConfig.read() otherwise we will setup the config file twice
    }
    const spikeConfigFile = await SpikeConfig.read();
    await initDeps();
    await initSelf(spikeConfigFile);
    _initted = true;
    return true;
  } catch (err) {
    const logger = global.log ? global.log.fatal : console.error;
    logger("init error", err);
    throw err;
  }
};

exports.shutdown = async function () {
  _initted = false;
  if (!_config.quiet) {
    if (global.log) {
      log.info("spike-pdf-cli shutdown");
    } else {
      console.log("spike-pdf-cli shutdown");
    }
  }
  if (global.log && log.shutdown) {
    log.shutdown();
  }
};
