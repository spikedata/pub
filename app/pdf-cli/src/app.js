const defaultConfig = require("./config/default");
const SpikeConfig = require("./command/configure");
const { output } = require("./lib/output");

async function initGlobals(logger, logSettings) {
  if (!global.log) {
    logger.implementation.init(logSettings);
    global.log = logger.implementation;
  }
}

async function initDeps() {}

async function initSelf(spikeConfigFile) {
  if (!spikeConfigFile.token) {
    const x = process.argv[0] + " " + process.argv[1];
    output.red(`token missing in config, try run:\n ${x} configure`);
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
    log.error("init error", err);
    output.error("intialisation failed");
    process.exit(-1);
  }
};

exports.shutdown = async function () {
  _initted = false;
  log.info("spike-pdf-cli shutdown");
  if (global.log && log.shutdown) {
    log.shutdown();
  }
};
