// import { constants as CommonConstants } from "@spike/api-core";
import { response as CommonResponse } from "@spike/api-core";
import * as constants from "./constants";

export interface PdfErrorResponse extends CommonResponse.ErrorResponse {
  authenticity: constants.Authenticity; // for PdfSuccessResponse its in response.data.authenticity, for PdfErrorResponse it's response.authenticity (because most errors have no data - i.e. response.data === undefined)
}

// spike-api-pdf/src/outputs/nested/breaks.ts
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

export interface StatementInfo {
  bank?: string; // spikeApi.enums.Banks
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
  parser: string; // ../parsers/index.ts : bankStatements.noBalance
  statement: StatementInfo;
  transactions: TransactionNoBalance[];
  valid: boolean;
  authenticity: constants.Authenticity;
}

export interface BankStatementNormal {
  parser: string; // ../parsers/index.ts : bankStatements.normal
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

export interface CreditCardBreakdown {
  parser: string; // ../parsers/index.ts : creditCard.breakdown

  statement: CreditCardStatementInfo;
  transactions: CreditCardBreakdownTransaction[];
  valid: boolean;
  authenticity: constants.Authenticity;
  breaks?: CreditCardBreakdownBreak[];
}

export type CreditCardBreakdownMultiUser = CreditCardBreakdown[]; // only difference is the range of allowable .parser strings
// parser: string; // ../parsers/index.ts : creditCard.breakdownMultiUser

export type CreditCardSimple = BankStatementNoBalance; // only difference is the range of allowable .parser strings
// parser: string; // ../parsers/index.ts : creditCard.simple

export interface PdfSuccessResponse extends CommonResponse.StandardResponse {
  data:
    | BankStatementNoBalance
    | BankStatementNormal
    | CreditCardSimple
    | CreditCardBreakdown
    | CreditCardBreakdownMultiUser;
}
