# Composed shapes

## Overview

Given:

- a custom shape: `{ a: 1, b: 2 }` with code = `my-shape`
- some common fields: `{ sessionId, code, final }`

A `wrapped shape` is one where:

- the custom shape is contained within the `instance.data` of a parent shape i.e.
- `{ sessionId, code: "my-shape", final, data: { a: 1, b: 2 } }`

A `composed shape` is one where:

- the common fields are mixed in with the custom shape i.e.
- `{ sessionId, code: "my-shape", final, a: 1, b: 2 }`
- NOTE: no `.data` field

There are 2 composers atm - `basic` and `codeData`. The key decision is whether the route to which the instance is sent can take multiple types or not. e.g.:

- `/login-interim-input` can take in an `abs-pass` or `std-otp` - hence we use `codeData`
- all others (including `/login-interim-wait`) only take in one shape

We want to prevent the user from having to supply redundant `.code`s - so if the route is not ambiguous (i.e. only takes in one shape) then the function name effectively determines the shape.

## Usage

- `client-gw` shapes are `composed` not `wrapped`
- they have common keys `{ sessionId, final? }`

## Examples

```js
// basic
"accounts":
  client-gw: { sessionId, final? }
  composer: { sessionId, final }
  gw-lambda: { final, code, data }

// basic
"transactions":
  client-gw: { sessionId, final?, accounts, numDays }
  composer: { sessionId, final }
  gw-lambda: { final, code, data: { accounts, numDays } }

// codeData
// - needs .code because route is ambiguous
// - i.e. /login-interim-input => .code determines whether inputs = std-otp || abs-pass
// - uses .data to make it easy to passThrough to lambda
"login-interim-input/abs-pass":
  client-gw: { sessionId, final?, code, data }
  composer: { sessionId, final, code, data }
  gw-lambda: { final, code, data }
```
