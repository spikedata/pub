/*global SpikeApi, DropArea*/

const _pass = undefined; // change this if you have a password protected pdf

(() => {
  // TODO: inputs
  const APIKEY = "00000000-0000-4000-a000-000000000001";
  const USERKEY = "00000000-0000-4000-a000-000000000002";
  const _MOCK = false;

  //#region SpikeApi call + mock

  const pdf = _MOCK ? pdfMock : pdfDirect;

  async function pdfDirect(fileName, pass, buffer) {
    try {
      // request
      console.log(`requesting ${SpikeApi.config.url.pdf} ...`);
      const spikeResponse = await SpikeApi.pdf(APIKEY, USERKEY, fileName, pass, buffer);

      // process response
      if (spikeResponse.type === SpikeApi.enums.TYPES.SUCCESS) {
        return spikeResponse;
      } else {
        return `ERROR: ${SpikeApi.enums.TYPES.toString(spikeResponse.type)}: ${spikeResponse.code}`;
      }
    } catch (e) {
      if (e instanceof SpikeApi.PdfTooLargeError) {
        return "EXCEPTION: the pdf is too large";
      } else if (e instanceof SpikeApi.InputValidationError) {
        return `EXCEPTION: invalid inputs:\n ${e.validationErrors.join("\n ")}`;
      } else if (!e.response) {
        // net connection error (e.g. down, timeout) or > axios maxBodyLength limit
        // e : AxiosResponse
        return "EXCEPTION: net connection error";
      } else {
        // http status error (e.g. 500 internal server error, 413 too big)
        // e : AxiosResponse
        return `EXCEPTION: http status error: ${e.response.status} ${e.response.statusText}`;
      }
    }
  }

  let toggle = true;
  async function pdfMock(/*fileName, pass, buffer*/) {
    toggle = !toggle;
    if (toggle) {
      throw new Error("problem");
    }
    return {
      requestId: "10000000-0000-4000-a000-000000000001",
      code: "pdf/success/bank-statement-normal",
      type: 2,
      data: {
        file: "1.pdf",
        statement: {
          bank: "ABS.0",
          accountNumber: "9017446437",
          dates: {
            issuedOn: "2018-09-02T00:00:00",
            from: "2018-08-01T00:00:00",
            to: "2018-08-31T00:00:00",
          },
          nameAddress: ["Mr. J Smith", "10 Main Road", "Cape Town", "8001"],
        },
        transactions: [
          {
            id: 1,
            date: "2017-09-12T00:00:00.000Z",
            description: ["Deposit"],
            amount: 1600.01,
            balance: 1600.01,
          },
          {
            id: 2,
            date: "2017-09-12T00:00:00.000Z",
            description: ["#Monthly Account Fee"],
            amount: -100,
            balance: 1000.01,
          },
          {
            id: 3,
            date: "2017-09-12T00:00:00.000Z",
            description: ["Woolworths"],
            amount: -500,
            balance: 1100.01,
          },
        ],
        valid: true,
      },
    };
  }

  //#endregion

  function init() {
    new DropArea("drop-area", onDrop);

    document.getElementById("fileElem").addEventListener("change", onChoosePdfs, false);
  }

  function onDrop(files) {
    shared(files);
  }

  function onChoosePdfs(e) {
    shared(e.target.files);
  }

  function shared(files) {
    files = [...files];
    files.forEach(async (file, i) => {
      await readFile(i, file);
    });
  }

  function readFile(i, file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = async function (event) {
        const base64Txt = event.target.result.replace(/^data:application\/pdf;base64,/, "");
        await uploadPdf(i, file, base64Txt);
        resolve(); // don't bother with reject() - errors already handled by uploadPdf()
      };
      reader.readAsDataURL(file);
    });
  }

  async function uploadPdf(i, file, base64Txt) {
    console.log(`${i} ${file.name}`);
    output(`sending ${file.name} to https://api-v6.spikedata.co.za/pdf ...`);
    const res = await pdf(file.name, _pass, base64Txt);
    output(res);
  }

  function output(val) {
    const el = document.getElementById("json-output");
    el.innerText = val ? JSON.stringify(val, null, 2) : "";
  }

  init();
})();
