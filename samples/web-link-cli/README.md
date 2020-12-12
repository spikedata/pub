# web-link-cli

Demonstrates how to `link` an account with Spike, and issues queries against that account.

## Setup

- add your Spike token to [config.js](./src/config.js)

## Usage

```sh
# list linked accounts
node ./src/app.js list

# link an account
node ./src/app.js link --name ilan

# query a linked account
node ./src/app.js query --name ilan
```
