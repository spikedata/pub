// const spikeApi = require("@spike/api");
const fs = require("fs");
const path = require("path");
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
    console.warn("no links found in:", dataDir);
  }
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

async function link({ token: tokenPath, dataDir, name }) {
  // config
  const { linkUrl, localPort } = config;

  // load token
  if (!fs.existsSync(tokenPath)) {
    console.error("token not found:", tokenPath);
    process.exit(-1);
  }
  const token = fs.readFileSync(tokenPath, "utf8");

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
  open(`${linkUrl}?callback=${callback}&token=${token}&linkId=${name}`);
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

async function query(argv) {
  console.log("TODO: query");
}

//#endregion

//#region command line

const Query = {
  transactions: "transactions",
  statements: "statements",
  estatement: "estatement",
};
const queries = Object.keys(Query);

const defaultDataDir = path.resolve(path.join(__dirname, "..", "data"));
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
        demandOption: true,
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
        demandOption: true,
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
      d: {
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
