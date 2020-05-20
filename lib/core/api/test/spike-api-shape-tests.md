# Spike API Shape Tests

Inputs from the users request traverse multiple links before they can be actioned and then traverse multiple links back:

- input
  - client -> gw
  - gw -> lambda
- implementation
  - e.g. scrape /login, create a scrapeResult (output), and marshall it back (e.g. over bchan)
- output
  - lambda -> gw
  - gw -> client

The purpose of these tests is to ensure that all input, intermediate and output shapes are specified correctly by the developers, and to perform a roundtrip marshalling ins to outs using the shape `.examples`.

## How to run

```sh
mocha ${SPIKE_ROOT}/spike-api-private/test/index
```
