import * as enums from "../../enums";

export const code = "gw-client/nested/statement-info";

export const validate = {
  id: "/statement-info", // NOTE: must match root.$ref in parent schema
  type: "object",
  properties: {
    bank: {
      required: true,
      type: "string",
      enum: Object.values(enums.Bank).map((x) => x.code),
    },
    accountNumber: {
      required: true,
      type: "string",
    },
    dates: {
      required: true,
      type: "object",
      properties: {
        issuedOn: {
          required: false,
          // type: "any",
          format: "date-or-iso-str",
        },
        from: {
          required: true,
          // type: "any",
          format: "date-or-iso-str",
        },
        to: {
          required: true,
          // type: "any",
          format: "date-or-iso-str",
        },
      },
    },
    nameAddress: {
      required: true,
      type: "array",
      items: {
        type: "string",
      },
    },
    statementBalance: { required: false, type: "number" },
  },
};

export const examples = {
  default: {
    bank: "ABS",
    accountNumber: "9017446437",
    dates: {
      issuedOn: "2018-09-02T00:00:00.000Z",
      from: "2018-08-01T00:00:00.000Z",
      to: "2018-08-31T00:00:00.000Z",
    },
    nameAddress: ["Mr. J Smith", "10 Main Road", "Cape Town", "8001"],
  },
};

export const sanitize = {
  nameAddress: "[redacted]",
};
