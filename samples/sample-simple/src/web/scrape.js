const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const spikeApi = require("@spike/api");

function fail(message) {
  console.log(message);
  process.exit(-1);
}

module.exports = async function (
  TOKEN,
  SITE,
  USER,
  PIN,
  PASS,
  USERNUM,
  ACCOUNT_NUMBER,
  NUM_DAYS,
  NUM_STATEMENTS,
  SAVE_FOLDER
) {
  let loginResponse;
  const autoClose = false;
  try {
    let sanitized;

    // login
    console.log(chalk.green(`${spikeApi.config.url.login} ...`));
    loginResponse = await spikeApi.login(TOKEN, SITE, USER, PIN, PASS, USERNUM);
    if (loginResponse.type !== spikeApi.enums.TYPES.SUCCESS && loginResponse.type !== spikeApi.enums.TYPES.INTERIM) {
      return fail("/login failed: " + loginResponse.code);
    }
    sanitized = spikeApi.sanitize(loginResponse);
    console.log("/login success", JSON.stringify(sanitized, null, 2));

    // interims
    if (loginResponse.type === spikeApi.enums.TYPES.INTERIM) {
      switch (loginResponse.code) {
        case "login/interim-input-abs-pass": {
          await loginInterimAbsPass(TOKEN, PASS, loginResponse.sessionId, loginResponse.data);
          break;
        }
        case "login/interim-input-std-otp": {
          await loginInterimStdOtp(TOKEN, loginResponse.sessionId);
          break;
        }
        case "login/interim-wait-cap-2fa": {
          await loginInterimCapWait(TOKEN, loginResponse.sessionId);
          break;
        }
        default: {
          return fail("Unknown login response code:", loginResponse.code);
        }
      }
    }

    // accounts
    console.log(chalk.green(`${spikeApi.config.url.accounts} ...`));
    const accountsResponse = await spikeApi.accounts(TOKEN, loginResponse.sessionId, false);
    if (accountsResponse.type !== spikeApi.enums.TYPES.SUCCESS) {
      return fail("/accounts failed: " + accountsResponse.code);
    }
    sanitized = spikeApi.sanitize(accountsResponse);
    console.log("/accounts success", JSON.stringify(sanitized, null, 2));

    // estatement
    console.log(chalk.green(`${spikeApi.config.url.estatement} ...`));
    const estatementResponse = await spikeApi.estatement(
      TOKEN,
      loginResponse.sessionId,
      false,
      ACCOUNT_NUMBER,
      NUM_DAYS
    );
    if (estatementResponse.type !== spikeApi.enums.TYPES.SUCCESS) {
      return fail("/estatement failed: " + estatementResponse.code);
    }
    if (SAVE_FOLDER) {
      save(estatementResponse, SAVE_FOLDER);
    }
    sanitized = spikeApi.sanitize(estatementResponse);
    console.log("/estatement success", JSON.stringify(sanitized, null, 2));

    // transactions
    console.log(chalk.green(`${spikeApi.config.url.transactions} ...`));
    const transactionsResponse = await spikeApi.transactions(
      TOKEN,
      loginResponse.sessionId,
      false,
      ACCOUNT_NUMBER,
      NUM_DAYS
    );
    if (transactionsResponse.type !== spikeApi.enums.TYPES.SUCCESS) {
      return fail("/transactions failed: " + transactionsResponse.code);
    }
    sanitized = spikeApi.sanitize(transactionsResponse);
    console.log("/transactions success", JSON.stringify(sanitized, null, 2));

    // statements
    if (spikeApi.isSupported(SITE, spikeApi.enums.FN.statements)) {
      console.log(chalk.green(`${spikeApi.config.url.statements} ...`));
      const statementsResponse = await spikeApi.statements(
        TOKEN,
        loginResponse.sessionId,
        autoClose,
        ACCOUNT_NUMBER,
        NUM_STATEMENTS
      );
      if (statementsResponse.type !== spikeApi.enums.TYPES.SUCCESS) {
        return fail("/statements failed: " + statementsResponse.code);
      }
      if (SAVE_FOLDER) {
        save(statementsResponse, SAVE_FOLDER);
      }
      sanitized = spikeApi.sanitize(statementsResponse);
      console.log("/statements success", JSON.stringify(sanitized, null, 2));
    }
  } catch (e) {
    if (e instanceof spikeApi.InputValidationError) {
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
  } finally {
    // close: if you open a session make sure you close it
    // NOTE: if you set autoClose=true above then spike will close the session automatically after /statements completed
    //  and you can skip manual /close below
    if (loginResponse && !autoClose) {
      console.log(chalk.green(`${spikeApi.config.url.close} ...`));
      const closeResponse = await spikeApi.close(TOKEN, loginResponse.sessionId);
      if (closeResponse.type !== spikeApi.enums.TYPES.SUCCESS) {
        // eslint-disable-next-line no-unsafe-finally
        return fail("/close failed: " + loginResponse.code);
      }
      const sanitized = spikeApi.sanitize(closeResponse);
      console.log("/close success", JSON.stringify(sanitized, null, 2));
    }
    console.log(chalk.green("SUCCESS"));
  }
};

async function loginInterimAbsPass(TOKEN, PASS, sessionId, requiredChars) {
  // validate (prev /login response { data })
  if (!Array.isArray(requiredChars) || requiredChars.length !== 3) {
    fail("Expecting array of 3 absa pass chars but received " + requiredChars);
  }

  // inputs
  const data = [PASS[requiredChars[0]], PASS[requiredChars[1]], PASS[requiredChars[2]]];

  // request
  console.log(chalk.green(`${spikeApi.config.url["login-interim-input"]} (abs) ...`));
  const response = await spikeApi.loginInterimInputAbsPass(TOKEN, sessionId, false, data);
  if (response.type !== spikeApi.enums.TYPES.SUCCESS) {
    return fail("/login-interim-input (abs) failed: " + response.code);
  }
  const sanitized = spikeApi.sanitize(response);
  console.log("/login-interim-input (abs) success", JSON.stringify(sanitized, null, 2));
}

async function loginInterimStdOtp(TOKEN, sessionId) {
  // inputs
  const data = await uxInputOtp();

  // request
  console.log(chalk.green(`${spikeApi.config.url["login-interim-input"]} (std) ...`));
  const response = await spikeApi.loginInterimInputStdOtp(TOKEN, sessionId, false, data);
  if (response.type !== spikeApi.enums.TYPES.SUCCESS) {
    return fail("/login-interim-input (std) failed: " + response.code);
  }
  const sanitized = spikeApi.sanitize(response);
  console.log("/login-interim-input (std) success", JSON.stringify(sanitized, null, 2));
}

async function uxInputOtp() {
  console.log(chalk.green("USER INPUT REQUIRED"));
  const otp = await read("Enter OTP: ");
  return otp;
}

async function loginInterimCapWait(TOKEN, sessionId) {
  // inputs
  await read(
    // eslint-disable-next-line quotes
    'Awaiting authorization from you. Please open the Capitec app and click "Yes" to "I want to to sign in to Remote Banking". Then push enter to continue ...'
  );

  // request
  console.log(chalk.green(`${spikeApi.config.url["login-interim-wait"]} (cap) ...`));
  const response = await spikeApi.loginInterimWait(TOKEN, sessionId, false);
  if (response.type !== spikeApi.enums.TYPES.SUCCESS) {
    return fail("/login-interim-wait (cap) failed: " + response.code);
  }
  const sanitized = spikeApi.sanitize(response);
  console.log("/login-interim-wait (cap) success", JSON.stringify(sanitized, null, 2));
}

async function read(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    rl.question(message, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

function save(response, folder) {
  if (response.code !== "file/success") {
    throw new Error("expected file/success");
  }
  const file = response.data.file;
  let buffer = response.data.buffer;
  fs.mkdirSync(folder, { recursive: true });
  const p = path.join(folder, file);
  buffer = Buffer.from(buffer, "base64");
  fs.writeFileSync(p, buffer);
  console.log("file saved to:", p);
}
