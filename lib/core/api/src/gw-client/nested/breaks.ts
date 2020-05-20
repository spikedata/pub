export const code = "gw-client/nested/breaks";

export const validate = {
  id: "/breaks", // NOTE: must match root.$ref in parent schema
  type: "array",
  items: {
    type: "object",
    properties: {
      prev_id: {
        required: true,
        type: "integer",
      },
      cur_id: {
        required: true,
        type: "integer",
      },
      amount: {
        required: true,
        type: "number",
      },
      diff: {
        required: true,
        type: "number",
      },
    },
  },
};

export const examples = {
  default: [
    {
      prev_id: 1,
      cur_id: 2,
      amount: -100,
      diff: -500,
    },
    {
      prev_id: 2,
      cur_id: 3,
      amount: -500,
      diff: 600,
    },
  ],
};
