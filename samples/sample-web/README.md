# Sample Web CDN

Sample app demonstrating how to access Spike API. See full [docs](https://app.spikedata.co.za/docs/code/) online.

This sample demonstrates how to use the Spike API in your own web application.

There are 2 demos:

- [/pdf-cdn](./src/ux/pdf-cdn/app.js) - a simple demo showing how to access the spike-api directly from your front-end code
  - **warning!** this method is not secure - your spike-api keys can be stolen
- [/pdf](./src/ux/pdf/app.js) - a production ready demo showing how to keep your spike-api keys safe by accessing the spike-api from your webserver

## Register

- First register for an account on [spike](https://app.spikedata.co.za/)
- Get your apikey and userkey from the settings page - you'll use them below

## How to run

- run the proxy server locally

  ```sh
  git clone https://github.com/spikedata/sample-web
  cd sample-web
  npm i

  # run pdf sample
  vi ./src/server/config.js # enter your apikey & userkey
  npm run start
  ```

- now browse the 2 samples:
  - http://localhost:5000/pdf-cdn/
  - http://localhost:5000/pdf/
