import chai from "chai";
import AjvExt from "../../build/module/lib/ajvExt.mjs";

//#region chai setup

const { expect } = chai;

//#endregion

describe("testFixSchema", function() {
  let source = {
    rootObject: {
      type: "object",
      properties: {
        p_a: {
          type: "string",
          required: true,
        },
        p_b: {
          type: "string",
        },
      },
    },

    rootArray: {
      type: "array",
      items: {
        type: "object",
        properties: {
          p_a: {
            type: "string",
            required: true,
          },
        },
      },
    },

    subObject: {
      type: "object",
      properties: {
        p_a: {
          type: "object",
          required: true,
          properties: {
            c_a: {
              type: "string",
              required: true,
            },
          },
        },
        p_b: {
          type: "string",
        },
      },
    },

    subArray: {
      type: "object",
      properties: {
        p_a: {
          type: "array",
          required: true,
          items: {
            type: "object",
            properties: {
              c_a: {
                type: "string",
                required: true,
              },
            },
          },
        },
        p_b: {
          type: "string",
        },
      },
    },
  };
  let expected = {
    rootObject: {
      type: "object",
      required: ["p_a"],
      properties: {
        p_a: {
          type: "string",
        },
        p_b: {
          type: "string",
        },
      },
    },

    rootArray: {
      type: "array",
      items: {
        type: "object",
        required: ["p_a"],
        properties: {
          p_a: {
            type: "string",
          },
        },
      },
    },

    subObject: {
      type: "object",
      required: ["p_a"],
      properties: {
        p_a: {
          type: "object",
          required: ["c_a"],
          properties: {
            c_a: {
              type: "string",
            },
          },
        },
        p_b: {
          type: "string",
        },
      },
    },

    subArray: {
      type: "object",
      required: ["p_a"],
      properties: {
        p_a: {
          type: "array",
          items: {
            type: "object",
            required: ["c_a"],
            properties: {
              c_a: {
                type: "string",
              },
            },
          },
        },
        p_b: {
          type: "string",
        },
      },
    },
  };
  for (let test in source) {
    it(test, function() {
      let schema = source[test];
      let fixed = AjvExt.fixSchema(schema);
      expect(fixed).to.deep.equal(expected[test]);
    });
  }
});
