const fs = require("fs");
const os = require("os");
const path = require("path");
const userInput = require("./lib/userInput");
const output = require("./lib/output");

function getConfigPath() {
  const home = os.homedir();
  const dir = path.join(home, ".spike");
  const configPath = path.join(dir, "config.json");
  return { dir, configPath };
}

exports.read = async function () {
  const cp = getConfigPath();
  let apiKey;
  let userKey;
  if (!fs.existsSync(cp.configPath)) {
    ({ apiKey, userKey } = await exports.write());
  } else {
    ({ apiKey, userKey } = JSON.parse(fs.readFileSync(cp.configPath, "utf8")));
  }

  return { apiKey, userKey };
};

exports.write = async function () {
  const cp = getConfigPath();

  // first run check
  if (!fs.existsSync(cp.configPath)) {
    console.log("First run detected, creating config file...");
    if (!fs.existsSync(cp.dir)) {
      fs.mkdirSync(cp.dir);
    }
  }

  // please enter apiKey
  while (true) {
    apiKey = await userInput.question("Enter you apiKey: ", false, undefined, undefined);
    if (validUuidV4(apiKey)) {
      break;
    } else {
      output.red("Invalid key entered, please try again");
    }
  }

  // please enter userKey
  while (true) {
    userKey = await userInput.question("Enter you userKey: ", false, undefined, undefined);
    if (validUuidV4(userKey)) {
      break;
    } else {
      output.red("Invalid key entered, please try again");
    }
  }

  const settings = { apiKey, userKey };
  fs.writeFileSync(cp.configPath, JSON.stringify(settings, null, 2), "utf8");
  console.log("wrote config file:", cp.configPath);
  return settings;
};

const uuidV4Regex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
function validUuidV4(s) {
  return uuidV4Regex.test(s);
}
