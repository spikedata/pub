export const code = "gw-client/nested/transaction-no-balance";

export const validate = {
  id: "/transaction-no-balance", // NOTE: must match root.$ref in parent schema
  type: "object",
  properties: {
    id: { required: true, type: "integer" },
    date: { required: true, format: "date-or-iso-str" },
    description: { required: true, type: "array", items: { type: "string" } },
    amount: { required: false, type: "number" }, // optional: balance brought forward lines have no amount
  },
};

export const examples = {
  1: {
    id: 1,
    date: "2017-09-12T00:00:00.000Z",
    description: ["Deposit"],
    amount: 1600.01,
  },
  2: {
    id: 2, // note: should be 3 - see breaks
    date: "2017-09-12T00:00:00.000Z",
    description: ["#Monthly Account Fee"],
    amount: -100,
  },
  3: {
    id: 3, // note: should be 2 - see breaks
    date: "2017-09-12T00:00:00.000Z",
    description: ["Woolworths"],
    amount: -500,
  },
};
