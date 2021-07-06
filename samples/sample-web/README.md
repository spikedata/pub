# Sample Web CDN

Sample app demonstrating how to access Spike API. See full [docs](https://app.spikedata.co.za/docs/code/) online.

This sample demonstrates how to use the Spike API in your own web application.

**NOTE**:

- all calls to Spike are authenticated using tokens
- in order to protect your token you must **NOT** make direct calls to Spike from the frontend
- instead you should proxy the call via a web server - i.e. frontend -> server -> spike
  - see:
  - frontend [proxy.ts](./src/ux/proxy.ts)
  - server [/pdf](./src/server/pdf/index.js)

## Register

- First register for an account on [spike](https://app.spikedata.co.za/)
- Get your apikey and userkey from the settings page - you'll use them below

## How to run

- run the proxy server locally

  ```sh
  git clone https://github.com/spikedata/pub
  cd samples/sample-web
  npm i

  # run pdf sample
  code ./src/server/config.js # enter your TOKEN
  npm run start
  ```

- now browse the site:
  - http://localhost:5000/

## Screenshot

![](docs/screenshot.png)
