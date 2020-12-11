# web-link-cli

Demonstrates how to `link` an account with Spike, and issues queries against that account.

## Setup

- add your Spike token to [config.js](./src/config.js)

## Usage

```sh
# link an account
node ./src/app.js link

# list linked accounts
node ./src/app.js list

# query a linked account
node ./src/app.js query --id 1 --key xxx
```
