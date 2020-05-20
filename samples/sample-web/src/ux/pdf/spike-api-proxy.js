/*global SpikeApi, axios */

// NOTE:
// - SpikeApiProxy makes a call to the proxy server (http://localhost:5000/pdf)
// - /pdf makes the call to the spike api and returns the result
// - this means that your Spike keys (APIKEY and USERKEY) are hidden i.e. not accessible in the front-end code

// eslint-disable-next-line no-unused-vars
var SpikeApiProxy = {
  pdf: async function(file, pass, buffer) {
    // inputs
    var inputs = SpikeApi.getShape("client-gw/pdf").create(file, pass, buffer); // throws SpikeApi.InputValidationError||PdfTooLargeError

    // request to proxy (not Spike API directly)
    var MAX = 6 * 1024 * 1024;
    var url = "/pdf";
    var response = await axios.post(url, inputs, {
      headers: {
        "Content-Type": "application/json",
      },
      maxContentLength: MAX,
      maxBodyLength: MAX,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw response;
  },
};
