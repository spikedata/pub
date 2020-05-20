import * as API from "../../../build/module/index.mjs";

///////////////////////////////////////////////////////////////////////////////////////////////////
// Choose shape here:
///////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE: set `let debugFindNested = true;` in $/API/lib/common.js
let shape = API.response;
// let shape = API.shape["gw-client/transactions/success"];

///////////////////////////////////////////////////////////////////////////////////////////////////

let examples = Object.keys(shape.examples);
for (let example of examples) {
  console.log("------------------------------");
  console.log(example);
  console.log("------------------------------");
  console.log(
    JSON.stringify(
      {
        validate: shape.validate,
        example: shape.examples[example],
        nestedSchemas: shape.nestedSchemas,
      },
      null,
      2
    )
  );

  let errors = API.common.validateShape(shape, shape.examples[example]);
  console.log("errors", JSON.stringify(errors, null, 2));
}
