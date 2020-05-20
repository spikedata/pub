# Shape system

The shape system is designed to acheive the following goals:

- validate = validate instances against a json schema
  - nb serialized and deserialized over network can't rely on type systems, also useful
- examples = for documentation
- sanitize = redact sensitive data when logging

Consists of:

- shape = set of static functions (create, validate, sanitize, ...) and members (code, type, examples, ...)
- instance = json object which has the keys defined by the validate schema
- note:
  - the instance doesn't contain the .code and .type fields rather these live on a wrapper
  - e.g. for [gw-client/error/common/dev/invalid-inputs](../src/gw-client/error/common/dev/invalid-inputs.ts):
    ```json
    {
      "requestId": "bf591c54-c9ae-49a3-a267-a765cfe3548c",
      "code": "error/common/dev/invalid-inputs",
      "type": 2, // enums.TYPES.ERROR,
      "data": ["Request size limit of 6MB exceeded"]
    }
    ```
  - `data` above is the **instance**, the **shape** has a `validate` schema indicating that data must be a non-empty array of strings

Composers

- just a way to try do inheritance using static shapes
- e.g. most of the client-gw shapes for web scraping have common fields: `{ sessionId, final, code?, data? }` fields - so we have two `composer` shapes to centralize common code: [basic](../src/client-gw/composer/basic.ts), [codeData](../src/client-gw/composer/codeData.ts)
- see [composer](./composer.md)

Errors

- errors have additional info `{ blame, message }`
- blame is used for billing - spike errors are not billed, user and bank errors are billed (at 1/10th of a credit)

Types

- all shape and instance types are in [shape.ts](../src/shape.ts)

Technical info

- there isn't a way to define `static classes` in typescript
  - `abstract class` comes close
  - however you can't use the `abstract class` for enforcing typechecking (i.e. does shape x implement all abstract class y methods) - because it assumes the methods will be non-static
- we use object literals instead with an `interface` to ensure required fields are implemented
  - tempting to create a single objet literal with fields
  - however this is a problem if we need access to object literal within the definition of the object itself
    - and you can't use object literal within the same block scope as object (i.e. can within fuction bodies, not in field definitions)
  - e.g.
    ```js
    // .cjs code using exports
    let errors = Schema.validate(exports.code, exports.validate, instance);
    // fail: use object literal in .mjs code
    const Accounts = {
      errors: Schema.validate(Accounts.code, Accounts.validate, instance);
    }
    ```
- another option we considered: there is no way to typecheck all the named exports on a module
  - so you can't just create a module which does: `export const code, type, examples, ...`
  - there's no way to typecheck that
  - so we have a `default export factory : XShapeFactory { ... }` at the bottom of many shapes to do static typing
- we also use unit tests to double check things
