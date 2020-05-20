const SpikeApi = require("@spike/api");
const { APIKEY, USERKEY } = require("../config");

module.exports = async (req, res) => {
  let { file, pass, buffer } = req.body; // body = SpikeApi.shape["client-gw/pdf"]
  let proxyResponse = await pdfProxy(APIKEY, USERKEY, file, pass, buffer);
  return res.json(proxyResponse);
};

async function pdfProxy(APIKEY, USERKEY, fileName, pass, buffer) {
  try {
    // request
    console.log(`requesting ${SpikeApi.config.url.pdf} ...`);
    let spikeResponse = await SpikeApi.pdf(APIKEY, USERKEY, fileName, pass, buffer);

    // response
    if (spikeResponse.type === SpikeApi.enums.TYPES.SUCCESS) {
      console.log("SUCCESS");
    } else {
      console.error(
        "ERROR:",
        SpikeApi.enums.TYPES.toString(spikeResponse.type) + ":" + spikeResponse.code
      );
    }
    return spikeResponse;
  } catch (e) {
    if (e instanceof SpikeApi.PdfTooLargeError) {
      console.error(`EXCEPTION: the pdf is too large`);
      return e;
    } else if (e instanceof SpikeApi.InputValidationError) {
      console.error("EXCEPTION: invalid inputs:\n ", e.validationErrors.join("\n "));
      return e;
    } else {
      if (!e.response) {
        console.error("EXCEPTION: ux -> server : net connection error:", e);
      } else {
        console.error(
          "EXCEPTION: ux -> server : http status error:",
          e.response.status,
          e.response.statusText
        );
      }
      delete e.config; // make sure spike-api keys from the axios request are not exposed to the frontend
      return { serverToSpikeError: e };
    }
  }
}
