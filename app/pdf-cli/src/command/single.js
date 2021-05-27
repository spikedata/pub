exports.command = async function (args) {
  try {
    await processSinglePdf(args);
  } catch (ex) {
    // this gets thrown by "read" which is used by userInput.question()
    if (ex.message === "canceled") {
      console.log(); // new-line to restore prompt
      process.exit(-1);
    }

    output.red("An unknown error halted the application");
    log.error("exception", ex);
  }
};

async function processSinglePdf({ input, password, writeOutputJson, writeOutputCsv, quiet }) {
  const requestTime = new Date();
  const { token } = App.config();
  const result = await requestPdf(token, input, password);
  const responseTime = new Date();
  // console.log("JSON", JSON.stringify(response, null, 2));

  // report success | fail
  if (!quiet) {
    if (result === undefined) {
      output.red("error: no response");
    } else if (result.type === spikeApi.enums.TYPES.ERROR) {
      output.red("error:", result.code);
    } else {
      output.green("success");
      // output.white(`${shortFilePath}: SUCCESS:`, result.data.parser, result.code)
    }
  }

  const duration = new Duration(requestTime, responseTime).toString();
  output.gray("Duration:", duration);

  if (result) {
    if (writeOutputJson) {
      pdfHelpers.writeOutputJson(input, result);
    }
    if (writeOutputCsv && result.type == spikeApi.enums.TYPES.SUCCESS) {
      pdfHelpers.writeOutputCsv(input, result.data);
    }
  }
}
