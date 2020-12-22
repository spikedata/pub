# web-link-cli

Demonstrates how to `link` an account with Spike, and issues queries against that account.

## Setup

- add your Spike token to [config.js](./src/config.js)
- create an ngrok account
  - the app.js registers a service on localhost in order to receive a callback from link.spikedata.co.za once the linkage is complete
  - you can use ngrok in order to make a local service publicly accessible
  - see https://ngrok.com/

## Usage

```sh
# setup ngrok
ngrok http 3500 # see ./src/config.js : localPort
# copy `Forwarding` url from ngrok output to ./src/config.js : callback.url.prod

# list linked accounts
node ./src/app.js list

# link an account
node ./src/app.js link --name ilan

# query a linked account
node ./src/app.js query --name ilan
```
