const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const Configure = require("./command/configure");
const Folder = require("./command/folder");
const Single = require("./command/single");
const Config = require("./config/index");
const { version } = require("../package.json");

const allConfigs = Object.keys(Config).filter((x) => x !== "checkConfig");
const allFilterTypes = Object.keys(Folder.filterTypes);

yargs(hideBin(process.argv))
  .version(version)
  .command(
    "configure",
    "Configure the tool with your keys",
    {
      config: {
        choices: allConfigs,
        default: "default",
        describe: "Specify filtering on commandline, rather than by manual input",
      },
      verbose: {
        type: "boolean",
        describe: "print log messages",
        default: false,
      },
      jwksUri: {
        type: "string",
        describe: "url for jwks.json to verify jwt token (for unit testing primarily)",
      },
    },
    Configure.command
  )
  .command(
    "folder",
    "Recurse through a folder and process all .pdfs found",
    {
      // shared
      config: {
        choices: allConfigs,
        default: "default",
        describe: "Specify filtering on commandline, rather than by manual input",
      },
      verbose: {
        type: "boolean",
        describe: "print log messages",
        default: false,
      },
      test: {
        type: "boolean",
        default: false,
        describe: "don't use this flag, it's used internally for unit tests",
      },
      writeOutputCsv: {
        type: "boolean",
        default: true,
        describe: "write .csv = just transactions from .pdf",
      },
      writeOutputJson: {
        type: "boolean",
        default: true,
        describe: "write .json = full result extracted from .pdf",
      },
      writeOutput: {
        type: "boolean",
        default: true,
        describe: "shortcut to set --writeOutput*=true|false",
      },
      // command-specific
      writeIndex: {
        type: "boolean",
        default: true,
        describe: "write results to index.csv file - useful to switch it off if changing identify() functions",
      },
      index: {
        type: "string",
        // default: path.join(args.folder, "folder.csv"), // see fixArgs
        describe: "path to summary index file",
      },
      folder: {
        type: "string",
        demand: true,
        describe: "folder with PDF files",
      },
      stripFolder: {
        type: "boolean",
        default: true,
        describe: "remove folder from path in outputs",
      },
      filterPath: {
        type: "string",
        describe: "regex to match against paths of files found in folder",
      },
      max: {
        type: "number",
        default: -1,
        describe: "End after max files - ignored if max <= 0",
      },
      "dry-run": {
        type: "boolean",
        default: false,
        describe: "just list files found which match filters",
      },
      concurrent: {
        type: "number",
        default: 1,
        describe: "Number of concurrent requests to execute in parallel",
      },
      filterType: {
        choices: allFilterTypes,
        default: "all",
        describe: "Specify filtering on commandline, rather than by manual input",
      },
    },
    Folder.command
  )
  .command(
    "single",
    "Process a single .pdf",
    {
      // shared
      config: {
        choices: allConfigs,
        default: "default",
        describe: "Specify filtering on commandline, rather than by manual input",
      },
      verbose: {
        type: "boolean",
        describe: "print log messages",
        default: false,
      },
      test: {
        type: "boolean",
        default: false,
        describe: "don't use this flag, it's used internally for unit tests",
      },
      writeOutputCsv: {
        type: "boolean",
        default: true,
        describe: "write .csv = just transactions from .pdf",
      },
      writeOutputJson: {
        type: "boolean",
        default: true,
        describe: "write .json = full result extracted from .pdf",
      },
      writeOutput: {
        type: "boolean",
        default: false,
        describe: "shortcut to set --writeOutput*=true|false",
      },
      // command-specific
      file: {
        alias: "f",
        demand: true,
        describe: "the .pdf file to process",
        type: "string",
      },
      password: {
        alias: "p",
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
