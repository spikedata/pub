import * as API from "../../../src/index";

///////////////////////////////////////////////////////////////////////////////////////////////////
// Choose shape here:
///////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE: set `let debugFindNested = true;` in $/API/lib/common.js
const shape = API.response;
// let shape = API.shape["gw-client/transactions/success"];

///////////////////////////////////////////////////////////////////////////////////////////////////

const examples = Object.keys(shape.examples);
for (const example of examples) {
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

  const errors = API.common.validateShape(shape, shape.examples[example]);
  console.log("errors", JSON.stringify(errors, null, 2));
}
