const config = require("./config");
const spikeApi = require("@spike/api-statements");

async function run({ TOKEN, FILE, PASS }) {
  try {
    // request
    console.log(`requesting ${spikeApi.constants.url} ...`);
    const spikeResponse = await spikeApi.pdf(TOKEN, FILE, PASS);

    // process response
    if (spikeResponse.type === spikeApi.constants.TYPES.SUCCESS) {
      console.log("JSON", JSON.stringify(spikeResponse, null, 2));
      console.log("SUCCESS");
    } else {
      console.error("ERROR:", spikeApi.constants.TYPES.toString(spikeResponse.type) + ":" + spikeResponse.code);
    }
  } catch (e) {
    console.error(e);
    if (e instanceof spikeApi.PdfTooLargeError) {
      console.error("EXCEPTION: the pdf is too large");
    } else if (e instanceof spikeApi.InputValidationError) {
      console.error("EXCEPTION: invalid inputs:\n ", e.validationErrors.join("\n "));
    } else {
      if (!e.response) {
        // net connection error (e.g. down, timeout) or > axios maxBodyLength limit
        // e : AxiosResponse
        console.error("EXCEPTION: net connection error:", e.code || e.message);
      } else {
        // http status error (e.g. 500 internal server error, 413 too big)
        // e : AxiosResponse
        console.error("EXCEPTION: http status error:", e.response.status, e.response.statusText);
      }
    }
  }
}

run(config);
