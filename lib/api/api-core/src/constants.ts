export enum TYPES {
  NOTSET = 0,
  // request
  INPUTS = 1,
  // response
  SUCCESS = 2,
  INTERIM = 3, // NOT required in /pdf
  ERROR = 4,
}

export enum BLAME {
  NOTSET = 0,
  SPIKE = 1,
  SITE = 2,
  USER = 3,
  CLIENT = 4,
}

export const Bank = {
  ABS: { code: "ABS", name: "ABSA" },
  BID: { code: "BID", name: "Bidvest" },
  CAP: { code: "CAP", name: "Capitec" },
  DEA: { code: "DEA", name: "Document Exchange Association" },
  DIS: { code: "DIS", name: "Discovery" },
  FNB: { code: "FNB", name: "FNB" },
  INV: { code: "INV", name: "Investec" },
  NED: { code: "NED", name: "Nedbank" },
  MRC: { code: "MRC", name: "Mercantile Bank" },
  RMB: { code: "RMB", name: "RMB" },
  SAS: { code: "SAS", name: "Safin" },
  STD: { code: "STD", name: "Standard Bank" },
  TYM: { code: "TYM", name: "TYME" },
};
