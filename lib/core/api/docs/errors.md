# Errors

## Schema v instance

There are currently only 2 error schemas:

1. `array-of-strings`
2. `no-data`

There are many instances of these schemas:

- array-of-strings
  - error/common/dev/invalid-inputs
- no-data
  - all the rest

## Old notes

`source` = code from which errors originate:

- gw
  - created by gw code without being sent to lambda
  - e.g.
    - can be client errors like bad inputs, auth, session timedout/in-use etc...
    - or internal plumbing errors - timeouts, exceptions, microservice probs etc...
- lambda
  - /lambda/general
    - general errors which should be exposed to client
    - e.g. /lambda/general/site-change-detected
  - /lambda/fn
    - fn specific errors which should be exposed to client
    - e.g. fnb statements removed
  - /lambda/internal
    - errors which are not exposed to client
    - e.g. TODO

`type` = error vs success / interim

- success and interim will usually involve a UX component in order to:
  - obtain user input - e.g. enter abs-pass or std-otp
  - display FN results - e.g. accounts list, transactions etc...
- errors
  - all errors are terminal
    - i.e. you can't send any futher requests on this session
    - i.e. there's no user input to capture
  - you prob want to use a UX component to display the error to user

Current design decision:

- We don't validate any of the error .data
- We don't sanitize any of the error .data

NOTE: you `create` and `error` instance using the wrapper shape

- It's redundant to have a `create` or `marshall` function on the error shape e.g.
  - gw/src/lib/error caller would call: `error.create(InvalidInputs, ["field1 invalid"])`
  - create would just send it back: `function create(code, data) { return data; }`
- `wrapper.create(code, data)` does the creation, error shape (no-data, array-of-strings, ...) will validate if the shape has data
