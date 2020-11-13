import * as Enum from "./lib/enum";
import FN from "./function/index";

export const TYPES = Enum.createEnum("TYPES", {
  NOTSET: 0,
  INPUTS: 1,
  // FN response
  SUCCESS: 2,
  INTERIM: 3,
  // various errors - from FN or from plumbing
  ERROR: 4,
});

export const BLAME = Enum.createEnum("BLAME", {
  NOTSET: 0,
  SPIKE: 1,
  SITE: 2,
  USER: 3,
  CLIENT: 4,
});

export { FN };

//#region web

export const Sites = Enum.createEnum("Sites", {
  "ABS.0": 1,
  "CAP.0": 2,
  "FNB.0": 3,
  "NED.0": 4,
  "RMB.0": 5,
  "STD.2018-01": 6,
});

// NOTE: could probably use Object.values() like below inside ./function/index.ts?
// const exclude = [FN.login.url, FN["login-interim-input"].url, FN["login-interim-wait"].url];
// const allObjectives = Object.values(FN).filter((x) => exclude.indexOf(x.url) === -1);
// const noStatements = allObjectives.filter((x) => x.url !== FN.statements.url);
const allObjectives = [
  FN.accounts,
  FN.estatement,
  FN.statements,
  FN.transactions,
  FN.close,
  // FN.pdf,
  // FN.csv,
];
const noStatements = [
  FN.accounts,
  FN.estatement,
  // FN.statements,
  FN.transactions,
  FN.close,
  // FN.pdf,
  // FN.csv,
];
export const SiteToFunction = {
  "ABS.0": allObjectives,
  "CAP.0": noStatements,
  "FNB.0": allObjectives,
  "NED.0": noStatements,
  "RMB.0": allObjectives,
  "STD.2018-01": noStatements,
};

export const isSupported = function (site, fn) {
  if (Sites.validKey(site)) {
    return SiteToFunction[site].indexOf(fn) !== -1;
  } else {
    throw new Error("Unknown site: " + site);
  }
};

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

export const SiteToBankName = {
  "ABS.0": Bank.ABS.name,
  "CAP.0": Bank.CAP.name,
  "FNB.0": Bank.FNB.name,
  "NED.0": Bank.NED.name,
  "RMB.0": Bank.RMB.name,
  "STD.2018-01": Bank.STD.name,
};

export const SiteMeta = {
  "ABS.0": {
    created: "2018-01-01",
  },
  "CAP.0": {
    created: "2018-01-01",
  },
  "FNB.0": {
    created: "2018-01-01",
  },
  "NED.0": {
    created: "2018-01-01",
  },
  "RMB.0": {
    created: "2018-01-01",
  },
  "STD.2018-01": {
    created: "2018-01-01",
  },
};

export const bankToSite = {
  ABSA: "ABS.0",
  CAPITEC: "CAP.0",
  FNB: "FNB.0",
  NEDBANK: "NED.0",
  RMB: "RMB.0",
  STANDARDBANK: "STD.2018-01",
};

//#endregion

//#region pdf

export const PdfType = Enum.createEnum("PdfType", {
  BANK: 0,
  INSURANCE: 1,
});

// Documents expected values - not an enum
// keep in sync with $/priv/lib/core/pdf/src/parsers/index.ts
// see $/spike-pdf/tools/docs/add-new-parser.md
export const PdfParser = {
  bankStatementsNormal: [
    "ABSA_ACTIVESAVE_ALL_0",
    "ABSA_CHEQUEACCOUNT_EMAIL_0",
    "ABSA_CHEQUEACCOUNT_WEB_0",
    "ABSA_ENQUIRY",
    "ABSA_ESTATEMENT_WEB_0",
    "BIDVEST_BUSINESSDEBITCARD_EMAIL_0",
    "BIDVEST_BUSINESS_EMAIL_0",
    "BIDVEST_BUSINESS_EMAIL_201902",
    "BIDVEST_BUSINESS_GPO_EMAIL",
    "BIDVEST_BUSINESS_WEB_0",
    "CAPITEC_ESTATEMENT_WEB_0",
    "DEA_ALL_0",
    "FNB_FLEXI_ALL_0",
    "FNB_INTERIM_STATEMENT_WEB_0",
    "FNB_RETAIL_ALL_0",
    "FNB_TRANSACTIONHISTORYDOWNLOAD_WEB_0",
    "INVESTEC_BANKACCOUNT",
    "INVESTEC_CALLACCOUNT",
    "MERCANTILE1",
    "NEDBANK_ALL_EMAIL_0",
    "NEDBANK_ALL_EMAIL_201711",
    "NEDBANK_BUSINESS",
    "NEDBANK_BUSINESS_201911",
    "NEDBANK_ESTATEMENT_WEB_0",
    "NEDBANK_PROVISIONAL_STATEMENT_WEB_0",
    "NEDBANK_PROVISIONAL_STATEMENT_WEB_1",
    "RMB_RETAIL_ALL_0",
    "SASFIN",
    "STANDARDBANK_ALL_EMAIL_0",
    "STANDARDBANK_COPYSTATEMENT",
    "STANDARDBANK_CURRENTACCOUNT",
    "STANDARDBANK_CUSTOMSTATEMENT_WEB_0",
    "STANDARDBANK_ESTATEMENT_WEB_0",
    "STANDARDBANK_STATEMENT2",
    "STANDARDBANK_STATEMENT3",
    "STANDARDBANK_STATEMENT4",
    "TYME",
  ],
  bankStatementsNoBalance: ["NEDBANK_ACCBAL_WEB"],
  creditCardBreakdown: ["ABSA_CREDITCARD_EMAIL_0", "NEDBANK_CREDITCARD"],
  creditCardBreakdownMultiUser: ["STANDARDBANK_CREDITCARD"],
  creditCardSimple: [
    "CAPITEC_CREDITCARD_0",
    "DISCOVERY_0",
    "DISCOVERY_CREDITCARD_ALL_0",
    "FNB_CREDITCARD_ALL_0",
    "RMB_CREDITCARD_ALL_0",
  ],
  insurance: [
    "LIBERTY_LIFE_COVER_ANNIVERSARY_LETTER",
    "LIBERTY_LIFE_COVER_POLICY_DOC",
    "OUTSURANCE_2017",
    "OUTSURANCE_ALL",
    "SANLAM",
    "SANTAM_ALL",
    "SANTAM_OTHER",
  ],
  other: ["SARS_PAYROLLTAXES_WEB_0"],
};

export const PdfParserAll = Object.keys(PdfParser).reduce((arr, k) => {
  arr = arr.concat(PdfParser[k]);
  return arr;
}, []);
// console.log(PdfParserAll);

// keep in sync with /spike/v8/priv/lib/core/db/src/lib/pdfReviewSystem.ts : MetaDataState
export enum Authenticity {
  unknown = "unknown", // e.g. pdf/fail/password-incorrect = can't access .meta - see /spike/v8/priv/lib/core/pdf/src/libShapes.ts : pdf.js fail
  multiple = "multiple", // matched multiple rules - this is an error with our rules which we must correct (will stay as a pending error until fixed)
  original = "original",
  library = "library", // library which is not in use by an original pdf pipeline atm (i.e. probably an original pipeline but for a pdf which is not part of our statement library)
  reader = "reader",
  browser = "browser", // similar threat level to reader = pdf software commonly found in a browser (doesn't indicate tampering)
  printToPdf = "printToPdf", // could have used a writer then print-to-pdf. overlaps with browser though - most nedbank statements are Microsoft:PrintToPDF
  writer = "writer",
  scan = "scan",
  unmatched = "unmatched", // manual review pending
  blank = "blank", // means that all the meta.info fields are blank
}
export const AllAuthenticity = Object.keys(Authenticity);

//#endregion

//#region csv

// Documents expected values - not an enum
// keep in sync with $/priv/lib/core/csv/src/parsers/index.ts
export const CsvParser = {
  bankStatements: ["ABS1", "CAP1", "CAP2", "FNB1", "INV1", "NED1", "NED2", "STD1"],
};

export const CsvParserAll = Object.keys(CsvParser).reduce((arr, k) => {
  arr = arr.concat(CsvParser[k]);
  return arr;
}, []);
// console.log(CsvParserAll);

//#endregion

//#region internal

export const Channel = Enum.createEnum("Channel", {
  Lchan: 1, // lambda channel = invoke and result
  Bchan: 2, // back channel = send and receive
});

export const LogLevel = Enum.createEnum("LogLevel", {
  None: 0,
  Full: 1,
  Sanitized: 1,
  CodeType: 2,
});

//#endregion
