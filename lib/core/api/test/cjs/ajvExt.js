const chai = require("chai");
const AjvExt = require("../../build/main/lib/ajvExt").default;

//#region chai setup

const { expect } = chai;

//#endregion

describe("testFixSchema", function () {
  const source = {
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
  const expected = {
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
  for (const test in source) {
    it(test, function () {
      const schema = source[test];
      const fixed = AjvExt.fixSchema(schema);
      expect(fixed).to.deep.equal(expected[test]);
    });
  }
});
