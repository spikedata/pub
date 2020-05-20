import * as API from "../../../src/index";

///////////////////////////////////////////////////////////////////////////////////////////////////
// Choose shape here:
///////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE: set `let debugFindNested = true;` in $/API/lib/common.js
// let shape = API.response;
// let shape = API.shape["gw-client/transactions/success"];
const shape = API.shape["gw-client/pdf/success/bank-statement-normal"];

///////////////////////////////////////////////////////////////////////////////////////////////////

const examples = Object.keys(shape.examples);
for (const example of examples) {
  log.info("------------------------------");
  log.info(example);
  log.info("------------------------------");
  log.info(
    JSON.stringify(
      {
        sanitize: shape.sanitize,
        example: shape.examples[example],
      },
      null,
      2
    )
  );

  const sanitized = API.common.sanitize(shape.sanitize, shape.examples[example]);
  log.info("sanitized", JSON.stringify(sanitized, null, 2));
}
