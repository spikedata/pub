export enum PdfType {
  BANK = 0,
  INSURANCE = 1,
}

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
    "CAPITEC_ESTATEMENT_WEB_1",
    "DEA_ALL_0",
    "FNB_6",
    "FNB_FLEXI_ALL_0",
    "FNB_INTERIM_STATEMENT_WEB_0",
    "FNB_INTERIM2_0",
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
    "STANDARDBANK_STATEMENT5",
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
