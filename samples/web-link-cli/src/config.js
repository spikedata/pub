const linkUrl = {
  local: "http://localhost:3010", // debug sx + local stack (not front-end)
  localDev: "http://localhost:8080", // use vue dev server for debugging front end
  prod: "https://link.spikedata.co.za",
};

// callback
const localPort = 3500;
const callback = {
  localPort,
  url: {
    local: `http://localhost:${localPort}`,
    localDev: `http://localhost:${localPort}`,
    prod: "http://dab7545af247.ngrok.io", // TODO: ngrok Forwarding url here
  },
};

const queryUrl = {
  local: "http://localhost:3001/prod/transactions",
  prod: "https://web-linked.spikedata.co.za/transactions",
};

module.exports = {
  linkUrl,
  queryUrl,
  callback,
};
