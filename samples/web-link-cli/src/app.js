// const spikeApi = require("@spike/api");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const config = require("./config");

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
  const server = await app.listen(3000);

  // launch browser
  open(`${linkUrl}?clientId=${clientId}&callback=${callback}&eb=${encryptblock}`);
}

function linkCallback(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  res.end("");
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
