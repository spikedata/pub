// const spikeApi = require("@spike/api");
const fs = require("fs");
const path = require("path");
const express = require("express");
const open = require("open");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const config = require("./config");

let server = undefined; // used by link
const DIR = path.resolve(path.join(__dirname, "..", "tokens"));
const userId = 1;

async function run() {
  yargs(hideBin(process.argv))
    .command({
      command: "link",
      desc: "launches the web interface to link a new account",
      // builder: () => {},
      handler: link,
    })
    .command({
      command: "list",
      desc: "list linked accounts",
      handler: (argv) => {
        console.log("TODO: list");
      },
    })
    .command({
      command: "query <id>",
      desc: "query a linked account",
      builder: (yargs) =>
        yargs.positional("id", {
          describe: "the id of the linked account as reported by 'list'",
        }),
      handler: query,
    })
    .demandCommand()
    .help()
    .wrap(72).argv;
}

//#region link

const callback = encodeURIComponent("http://localhost:3000/callback");

async function link(argv) {
  const { token, clientId, linkUrl, linkSecret } = config;

  // run express to handle callback
  const app = express();
  app.get("/callback", linkCallback);
  server = await app.listen(3000);

  // make encryptblock
  const encryptblock = "todo";

  // launch browser
  open(`${linkUrl}?clientId=${clientId}&callback=${callback}&eb=${encryptblock}`);
}

function linkCallback(req, res) {
  console.log("linkCallback", JSON.stringify(req.body, null, 2));
  if (req.body) {
    res.end(`Your account is linked with id=${userId}. You may close this window.`);

    // save ./tokens/{userId}
    const filePath = path.join(DIR, "" + userId);
    fs.writeFileSync(filePath, req.body, "utf8");
    console.log("Wrote:", filePath);
  } else {
    res.end("Your account could not be linked, please try again. You may close this window.");
    console.error("Failed: link did not return a token");
  }
  server.close();
}

//#endregion

//#region list

async function list(argv) {
  console.log("TODO: list");
}

//#endregion

//#region query

async function query(argv) {
  console.log("TODO: query");
}

//#endregion

run();
