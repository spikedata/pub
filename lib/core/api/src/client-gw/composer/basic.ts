import * as objectUtil from "../../lib/object";

export const composedSchema = {
  type: "object",
  properties: {
    sessionId: {
      required: true,
      type: "string",
      format: "uuidV4",
    },
    final: {
      required: true,
      type: "boolean",
    },
  },
};

export const compose = function (sessionIdRequired, finalRequired, additionalSchema) {
  let composedSchemaLocal;
  if (additionalSchema) {
    composedSchemaLocal = objectUtil.mergeObjectsClone(composedSchema, {
      properties: additionalSchema,
    });
  } else {
    composedSchemaLocal = objectUtil.clone(composedSchema);
  }
  composedSchemaLocal.properties.sessionId.required = sessionIdRequired;
  composedSchemaLocal.properties.final.required = finalRequired;
  return composedSchemaLocal;
};

// create data that will be sent over bchan to lambda
//  - translate from "client-gw/*" (bchan shapes) to "gw-lambda/bchan/composer"
export const decompose = function (shape, instance) {
  // EXAMPLE client-gw bchan instances and marshalled results:
  //  - accounts = { sessionId: "xx", final: false } => no data
  //    => { final: false, code: "accounts", data: undefined }
  //  - transactions = { sessionId: "xx", final: true, numDays: 90, accountNumber: "1234567890" }
  //    => { final: true, code: "transactions", data: { numDays: 90, accountNumber: "1234567890" } }
  // ALGORITHM:
  //  - clone instance and remove composer fields { sessionId, final }
  //  - all remaining fields are .data
  const code = shape.code; // instance.code only exists on ./codeData composed shapes - not basic composed shapes
  const clone = Object.assign({}, instance); // shallow clone is fine
  delete clone.sessionId;
  delete clone.final;
  return { code, data: clone };
};
