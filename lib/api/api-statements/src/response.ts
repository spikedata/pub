import { response as CoreResponse, constants as CoreConstants } from "@spike/api-core";
import * as constants from "./constants";

export interface PdfErrorResponse extends CoreResponse.ErrorResponse {
  authenticity: constants.Authenticity; // for PdfSuccessResponse its in response.data.authenticity, for PdfErrorResponse it's response.authenticity (because most errors have no data - i.e. response.data === undefined)
}

export type Break = {
  prev_id: number;
  cur_id: number;
  prev_date: Date;
  cur_date: Date;
  amount: number;
  diff: number;
};

export type ValidBreaks = {
  breaks?: Break[];
  valid: boolean;
};

export enum PdfDataType {
  BankStatementNoBalance = "BankStatementNoBalance",
  BankStatementNormal = "BankStatementNormal",
  CreditCardBreakdown = "CreditCardBreakdown",
  CreditCardBreakdownMultiUser = "CreditCardBreakdownMultiUser",
  CreditCardSimple = "CreditCardSimple",
}
export interface StatementInfo {
  bank?: CoreConstants.BankCode;
  accountNumber?: string;
  statementNumber?: string;
  dates: {
    issuedOn?: Date | string;
    from?: Date | string;
    to?: Date | string;
  };
  nameAddress?: string[];
}

export interface CreditCardStatementInfo extends StatementInfo {
  accountType?: string;
  statementNumber?: string;
  statementBalance?: number;
}

export interface TransactionNoBalance {
  id: number;
  date: Date | string;
  description: string[];
  amount?: number; // balance brought forward may not have an amount
}

export interface Transaction extends TransactionNoBalance {
  balance: number;
}

export interface BankStatementNoBalance {
  type: PdfDataType.BankStatementNoBalance;
  parser: // determinant = PdfParser.bankStatementsNoBalance
  "NEDBANK_ACCBAL_WEB";
  statement: StatementInfo;
  transactions: TransactionNoBalance[];
  valid: boolean;
  authenticity: constants.Authenticity;
}

export interface BankStatementNormal {
  type: PdfDataType.BankStatementNormal;
  parser: // determinant = PdfParser.bankStatementsNormal
  | "ABSA_ACTIVESAVE_ALL_0"
    | "ABSA_CHEQUEACCOUNT_EMAIL_0"
    | "ABSA_CHEQUEACCOUNT_WEB_0"
    | "ABSA_ENQUIRY"
    | "ABSA_ESTATEMENT_WEB_0"
    | "BIDVEST_BUSINESSDEBITCARD_EMAIL_0"
    | "BIDVEST_BUSINESS_EMAIL_0"
    | "BIDVEST_BUSINESS_EMAIL_201902"
    | "BIDVEST_BUSINESS_GPO_EMAIL"
    | "BIDVEST_BUSINESS_WEB_0"
    | "CAPITEC_ESTATEMENT_WEB_0"
    | "CAPITEC_ESTATEMENT_WEB_1"
    | "DEA_ALL_0"
    | "FNB_6"
    | "FNB_FLEXI_ALL_0"
    | "FNB_INTERIM_STATEMENT_WEB_0"
    | "FNB_INTERIM2_0"
    | "FNB_RETAIL_ALL_0"
    | "FNB_TRANSACTIONHISTORYDOWNLOAD_WEB_0"
    | "INVESTEC_BANKACCOUNT"
    | "INVESTEC_CALLACCOUNT"
    | "MERCANTILE1"
    | "NEDBANK_ALL_EMAIL_0"
    | "NEDBANK_ALL_EMAIL_201711"
    | "NEDBANK_BUSINESS"
    | "NEDBANK_BUSINESS_201911"
    | "NEDBANK_ESTATEMENT_WEB_0"
    | "NEDBANK_PROVISIONAL_STATEMENT_WEB_0"
    | "NEDBANK_PROVISIONAL_STATEMENT_WEB_1"
    | "RMB_RETAIL_ALL_0"
    | "SASFIN"
    | "STANDARDBANK_ALL_EMAIL_0"
    | "STANDARDBANK_COPYSTATEMENT"
    | "STANDARDBANK_CURRENTACCOUNT"
    | "STANDARDBANK_CUSTOMSTATEMENT_WEB_0"
    | "STANDARDBANK_ESTATEMENT_WEB_0"
    | "STANDARDBANK_STATEMENT2"
    | "STANDARDBANK_STATEMENT3"
    | "STANDARDBANK_STATEMENT4"
    | "STANDARDBANK_STATEMENT5"
    | "TYME";
  statement: StatementInfo;
  transactions: Transaction[];
  valid: boolean;
  authenticity: constants.Authenticity;
  breaks?: Break[];
}

// spike-api-pdf/src/outputs/pdf/success/credit-card-breakdown.ts
export interface CreditCardBreakdownTransaction {
  id: number;
  category: string;
  transactionDate: Date | string;
  processDate: Date | string;
  description: string[];
  amount: number;
}

// spike-api-pdf/src/outputs/pdf/success/credit-card-breakdown.ts
export interface CreditCardBreakdownBreak {
  category: string;
  expected: number;
  actual: number;
  diff: number;
}

export interface CreditCardBreakdownShared {
  statement: CreditCardStatementInfo;
  transactions: CreditCardBreakdownTransaction[];
  valid: boolean;
  authenticity: constants.Authenticity;
  breaks?: CreditCardBreakdownBreak[];
}

export interface CreditCardBreakdown extends CreditCardBreakdownShared {
  type: PdfDataType.CreditCardBreakdown;
  parser: // determinant = PdfParser.creditCardBreakdown

  "ABSA_CREDITCARD_EMAIL_0" | "NEDBANK_CREDITCARD";
}

export type CreditCardBreakdownMultiUser = {
  type: PdfDataType.CreditCardBreakdownMultiUser;
  parser: // determinant = PdfParser.creditCardBreakdown

  "STANDARDBANK_CREDITCARD";
  all: CreditCardBreakdownShared[];
};

export type CreditCardSimple = {
  type: PdfDataType.CreditCardSimple;
  parser: // determinant = PdfParser.creditCardSimple
  | "CAPITEC_CREDITCARD_0"
    | "DISCOVERY_0"
    | "DISCOVERY_CREDITCARD_ALL_0"
    | "FNB_CREDITCARD_ALL_0"
    | "RMB_CREDITCARD_ALL_0";
  statement: StatementInfo;
  transactions: TransactionNoBalance[];
  valid: boolean;
  authenticity: constants.Authenticity;
};

export interface PdfSuccessResponse extends CoreResponse.StandardResponse {
  data:
    | BankStatementNoBalance
    | BankStatementNormal
    | CreditCardSimple
    | CreditCardBreakdown
    | CreditCardBreakdownMultiUser;
}
