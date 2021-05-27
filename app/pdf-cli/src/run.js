const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const App = require("./app");
const Configure = require("./command/configure");
const Folder = require("./command/folder");
const Single = require("./command/single");
const Config = require("./config/index");
const { version } = require("../package.json");

const allConfigs = Object.keys(Config).filter((x) => x !== "checkConfig");
const filterTypes = {
  all: {
    option: 1,
    text: "all",
  },
  "new-only": {
    option: 2,
    text: "new files only",
  },
  "new-and-prev-errors": {
    option: 3,
    text: "new + prev errors",
  },
  pattern: {
    option: 4,
    text: "filename matching a pattern",
  },
  none: {
    option: 5,
    text: "none = quit",
  },
};
const allFilterTypes = Object.keys(filterTypes);
const optionTofilterType = Object.keys(filterTypes).reduce((prev, cur) => {
  prev[filterTypes[cur].option] = cur;
  return prev;
}, {});
// console.log(JSON.stringify(optionTofilterType, null, 2))
const filterTypesMenu = Object.keys(filterTypes).reduce((prev, cur) => {
  const filterType = filterTypes[cur];
  return `${prev}\n${filterType.option}. ${filterType.text}`;
}, "");

yargs(hideBin(process.argv))
  .version(version)
  .command("configure", "Configure the tool with your keys", {}, Configure.command)
  .command(
    "folder",
    "Recurse through a folder and process all .pdfs found",
    {
      /* shared
      config: {
        choices: allConfigs,
        defaultValue: "default",
        help: "config settings",
      },
      quiet: {
        action: "storeTrue",
        defaultValue: false,
        help: "don't print library logs",
      },
      test: {
        action: "storeTrue",
        defaultValue: false,
        help: "don't use this flag, it's used internally for unit tests",
      },
      writeOutputCsv: {
        type: bool,
        defaultValue: true,
        help: "write .csv = just transactions from .pdf",
      },
      writeOutputJson: {
        type: bool,
        defaultValue: true,
        help: "write .json = full result extracted from .pdf",
      },
      writeOutput: {
        type: bool,
        help: "shortcut to set --writeOutput*=true|false",
      },
      // command-specific
      writeIndex: {
        type: bool,
        defaultValue: true,
        help: "write results to index.csv file - useful to switch it off if changing identify() functions",
      },
      index: {
        type: rawPathType,
        help: "path to summary index file",
      },
      folder: {
        type: "string",
        required: true,
        help: "folder with PDF files",
      },
      stripFolder: {
        action: "storeTrue",
        defaultValue: true,
        help: "remove folder from path in outputs",
      },
      filterPath: {
        type: regex,
        help: "regex to match against paths of files found in folder",
      },
      max: {
        type: "int",
        defaultValue: -1,
        help: "End after max files - ignored if max <= 0",
      },
      listFilesOnly: {
        action: "storeTrue",
        defaultValue: false,
        help: "just list files found which match filters",
      },
      concurrent: {
        type: "int",
        defaultValue: 1,
        help: "Number of concurrent requests to execute in parallel",
      },
      filterType: {
        choices: allFilterTypes,
        defaultValue: undefined,
        help: "Specify filtering on commandline, rather than by manual input",
      },
      */
    },
    Folder.command
  )
  .command(
    "single",
    "Process a single .pdf",
    {
      /* shared
      config: {
        choices: allConfigs,
        defaultValue: "default",
        help: "config settings",
      },
      quiet: {
        action: "storeTrue",
        defaultValue: false,
        help: "don't print library logs",
      },
      test: {
        action: "storeTrue",
        defaultValue: false,
        help: "don't use this flag, it's used internally for unit tests",
      },
      writeOutputCsv: {
        type: bool,
        defaultValue: true,
        help: "write .csv = just transactions from .pdf",
      },
      writeOutputJson: {
        type: bool,
        defaultValue: true,
        help: "write .json = full result extracted from .pdf",
      },
      writeOutput: {
        type: bool,
        help: "shortcut to set --writeOutput*=true|false",
      },
      */
      // command-specific
      file: {
        alias: "file",
        demandOption: true,
        describe: "the .pdf file to process",
        type: "string",
      },
      password: {
        alias: "file",
        demandOption: false,
        describe: "the password for the .pdf (if password protected)",
        type: "string",
      },
    },
    Single.command
  )
  .demandCommand()
  .strict()
  .help()
  .wrap(100).argv;
