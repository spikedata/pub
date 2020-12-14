const spikeApi = require("@spike/api");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const express = require("express");
const open = require("open");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const config = require("./config");

let server = undefined; // used by link
const userId = 1;

function getUserDir(dataDir, name) {
  return path.join(dataDir, name);
}

function getKeyPath(dataDir, name) {
  return path.join(getUserDir(dataDir, name), "key");
}

function getTransactionsPath(dataDir, name) {
  return path.join(dataDir, name, "transactions.json");
}

//#region list

async function list({ dataDir }) {
  const children = getChildDirs(dataDir).map((x) => path.basename(x));
  if (children.length) {
    console.table(children);
  } else {
    console.warn("no linked accounts found in:", dataDir);
  }
  return children;
}

function getChildDirs(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const results = [];
  const children = fs.readdirSync(dir, {});
  for (const file of children) {
    const fullPath = path.resolve(path.join(dir, file));
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results.push(fullPath);
    }
  }
  return results;
}

//#endregion

//#region link

async function link({ env, token: tokenPath, dataDir, name }) {
  // config
  const { linkUrl, localPort } = config;
  const url = linkUrl[env];

  // load token
  if (!fs.existsSync(tokenPath)) {
    console.error("token not found:", tokenPath);
    process.exit(-1);
  }
  const token = fs.readFileSync(tokenPath, "utf8");

  if (!name) {
    name = await read("Enter a name for this linked account: ");
  }

  // dataDir + check whether name already used
  if (fs.existsSync(dataDir)) {
    const keyPath = getKeyPath(dataDir, name);
    if (fs.existsSync(keyPath)) {
      console.error("already exists, pick another name:", keyPath);
      process.exit(-1);
    }
  } else {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // run express to handle callback from link.spikedata.co.za
  const app = express();
  app.use(express.json());
  const callback = encodeURIComponent(`http://localhost:${localPort}/callback`);
  app.post("/callback", linkCallback.bind({ name, dataDir }));
  server = await app.listen(localPort);

  // launch browser
  open(`${url}?callback=${callback}&token=${token}&linkId=${name}`);
}

async function read(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    rl.question(message, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

function linkCallback(req, res) {
  try {
    console.log("linkCallback", this.name, JSON.stringify(req.body, null, 2));
    if (req.body) {
      res.end("Your account is linked. You may close this window.");

      // save
      const userDir = getUserDir(this.dataDir, this.name);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }
      const keyPath = getKeyPath(this.dataDir, this.name);
      const { buffer, linkId } = req.body;
      if (linkId === this.name) {
        fs.writeFileSync(keyPath, buffer, "utf8");
        console.log("Wrote:", keyPath);
      } else {
        // in this simple example we expect to link one account at a time
        // however your app should handle multiple concurrent account linkages
        console.error(`Failed: received callback for ${linkId}, was expecting ${this.name}`);
      }
    } else {
      res.end("Your account could not be linked, please try again. You may close this window.");
      console.error("Failed: link did not return a token");
    }
  } catch (e) {
    console.error("exception in callback:", e);
  }
  // only link one account at a time - can close after callback received
  server.close();
}

//#endregion

//#region query

async function query({ env, token: tokenPath, dataDir, name, numDays }) {
  // config
  const { queryUrl } = config;
  const url = queryUrl[env];
  if (!url) {
    console.error("can't use env for query:", env);
    process.exit(-1);
  }

  // load token
  if (!fs.existsSync(tokenPath)) {
    console.error("token not found:", tokenPath);
    process.exit(-1);
  }
  const token = fs.readFileSync(tokenPath, "utf8");

  // input name if not supplied
  if (!name) {
    const names = await list({ dataDir });
    if (names.length === 0) {
      console.error("no linked accounts, run `link` first then retry");
      process.exit(-1);
    }
    name = await read("\nWhich linked account do you want to query? (use name, not number): ");
  }

  // dataDir + check whether name already used
  const keyPath = getKeyPath(dataDir, name);
  if (!fs.existsSync(keyPath)) {
    console.error("key not found, pick another name:", keyPath);
    process.exit(-1);
  }
  const key = fs.readFileSync(keyPath, "utf8");

  // query
  const result = await postQueryTransactions(url, token, key, numDays);
  if (result) {
    if (result.type === spikeApi.enums.TYPES.SUCCESS) {
      console.error("success:", JSON.stringify(result.data, null, 2));
    } else {
      console.error("failed:", JSON.stringify(result.data, null, 2));
    }
  } else {
    console.error("failed: no result");
  }
}

async function postQueryTransactions(queryUrl, token, key, numDays) {
  try {
    const body = {
      key,
      query: {
        transactions: {
          numDays,
        },
      },
    };
    const response = await axios.post(queryUrl, body, {
      headers: {
        "Content-Type": "applications/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log("exception:", e);
  }
  return false;
}

//#endregion

//#region command line
const Env = {
  local: "local",
  localDev: "localDev",
  prod: "prod",
};
const Envs = Object.keys(Env);

const Query = {
  transactions: "transactions",
  statements: "statements",
  estatement: "estatement",
};
const queries = Object.keys(Query);

const defaultDataDir = path.resolve(path.join(__dirname, "..", "data"));
const defaultEnv = Env.local;
const defaultQuery = Query.transactions;
const defaultNumDays = 1;

yargs(hideBin(process.argv))
  .options({
    d: {
      alias: "dataDir",
      describe: "root directory below which linked account data will be stored",
      default: defaultDataDir,
      type: "string",
    },
    e: {
      alias: "env",
      demandOption: false,
      describe: "environment - which server to connect to",
      default: defaultEnv,
      choices: Envs,
    },
  })
  .command({
    command: "list",
    desc: "list names of accounts that you have linked previously",
    handler: list,
  })
  .command({
    command: "link",
    desc: "launches the web interface to link a new account",
    builder: {
      n: {
        alias: "name",
        demandOption: false, // will prompt user for a name if not supplied
        describe: "what to name this linked account",
        type: "string",
      },
      t: {
        alias: "token",
        demandOption: true,
        describe: "path to token file",
        type: "string",
      },
    },
    handler: link,
  })

  .command({
    command: "query",
    desc: "query a linked account",
    builder: {
      n: {
        alias: "name",
        demandOption: false,
        describe: "name of previously linked account",
        type: "string",
      },
      t: {
        alias: "token",
        demandOption: true,
        describe: "path to token file",
        type: "string",
      },
      q: {
        alias: "query",
        demandOption: false,
        describe: "which scrape to perform e.g. transactions",
        default: defaultQuery,
        choices: queries,
      },
      x: {
        alias: "numDays",
        demandOption: false,
        describe: "number of days for transactions and estatement queries",
        default: defaultNumDays,
        type: "number",
      },
    },
    handler: query,
  })
  .demandCommand()
  .help()
  .wrap(100).argv;
//#endregion
