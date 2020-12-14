const linkUrl = {
  local: "http://localhost:3010", // debug sx + local stack (not front-end)
  localDev: "http://localhost:8080", // use vue dev server for debugging front end
  prod: "https://link.spikedata.co.za",
};
const localPort = 3500;

const queryUrl = {
  local: "http://localhost:3001/prod/transactions",
  prod: "https://web-linked.spikedata.co.za/transactions", // TODO
};

module.exports = {
  linkUrl,
  queryUrl,
  localPort,
};
