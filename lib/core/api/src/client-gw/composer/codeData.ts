/**
 * NOTE:
 * This composer includes basic fields + extra fields: { code, data }
 * see ./compose.md
 */
import * as objectUtil from "../../lib/object";

export const composedSchema = {
  type: "object",
  properties: {
    sessionId: {
      required: true, // shape can specify required value - see compose() below
      type: "string",
      format: "uuidV4",
    },
    final: {
      required: true, // shape can specify required value - see compose() below
      type: "boolean",
    },
    code: {
      required: true, // shape can specify required value - see compose() below
      type: "string",
    },
    data: {
      required: true, // shape can specify required value - see compose() below
      // type: "any"
    },
  },
};

export const compose = function (sessionIdRequired, finalRequired, codeRequired, dataSchema, additionalSchema) {
  // same as basic
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

  // codeData
  composedSchemaLocal.properties.code.required = codeRequired;
  if (dataSchema) {
    composedSchemaLocal.properties.data = dataSchema;
  } else {
    delete composedSchemaLocal.properties.data;
  }
  return composedSchemaLocal;
};

// returns { code, data } that will be sent over bchan to lambda
export const decompose = function (_shape, instance) {
  // EXAMPLE:
  //  - "login-interim-input/abs-pass":
  //    client-gw: { sessionId, final?, code, data }
  //    gw-lambda: { final, code, data }
  // ALGORITHM:
  //  - simply take .code & .data from instance
  return { code: instance.code, data: instance.data };
};
