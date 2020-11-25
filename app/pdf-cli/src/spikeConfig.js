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
  let token;
  if (!fs.existsSync(cp.configPath)) {
    ({ token } = await exports.write());
  } else {
    ({ token } = JSON.parse(fs.readFileSync(cp.configPath, "utf8")));
  }

  return { token };
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

  // please enter token
  let token;
  while (true) {
    token = await userInput.question("Enter you token: ", false, undefined, undefined);
    if (validateToken(token)) {
      break;
    } else {
      output.red("Invalid token entered, please try again");
    }
  }

  const settings = { token };
  fs.writeFileSync(cp.configPath, JSON.stringify(settings, null, 2), "utf8");
  console.log("wrote config file:", cp.configPath);
  return settings;
};

function validateToken(token) {
  return true; // TODO
}
