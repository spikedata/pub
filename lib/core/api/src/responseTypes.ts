import * as Enums from "./enums";
import { ShapeInstance } from "./shape";
import { getShape } from "./shapes";

export interface StandardResponse {
  sessionId?: string; // uuid
  requestId: string; // uuid
  code: string;
  type: number; // enums : TYPES
  data?: ShapeInstance;
}

export function getResponseTypeString(response: StandardResponse): string {
  return Enums.TYPES.validValue(response.type) && Enums.TYPES.toString(response.type);
}

export function getResponseBlameString(response: StandardResponse): string {
  let responseBlame;
  const shape = getShape(response.code);
  if (shape) {
    responseBlame = Enums.BLAME.validValue(shape.blame) && Enums.BLAME.toString(shape.blame);
  } else {
    log.fatal("getResponseBlameString = unknown result.code:", response.code);
    responseBlame = Enums.BLAME.toString(Enums.BLAME.SPIKE);
  }
  return responseBlame;
}

export interface ErrorResponse extends StandardResponse {
  data?: any; // undefined, string, string[]
}

//#region pdf

export interface PdfErrorResponse extends ErrorResponse {
  authenticity: Enums.Authenticity;
}

//#region nested

// /spike/v8/pub/lib/core/api/src/gw-client/nested/breaks.ts
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

// /spike/v8/pub/lib/core/api/src/gw-client/nested/statement-info.ts
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
  authenticity: Enums.Authenticity;
}

export interface BankStatementNormal {
  parser: string; // ../parsers/index.ts : bankStatements.normal
  statement: StatementInfo;
  transactions: Transaction[];
  valid: boolean;
  authenticity: Enums.Authenticity;
  breaks?: Break[];
}

// /spike/v8/pub/lib/core/api/src/gw-client/pdf/success/credit-card-breakdown.ts
export interface CreditCardBreakdownTransaction {
  id: number;
  category: string;
  transactionDate: Date | string;
  processDate: Date | string;
  description: string[];
  amount: number;
}

// /spike/v8/pub/lib/core/api/src/gw-client/pdf/success/credit-card-breakdown.ts
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
  authenticity: Enums.Authenticity;
  breaks?: CreditCardBreakdownBreak[];
}

export type CreditCardBreakdownMultiUser = CreditCardBreakdown[]; // only difference is the range of allowable .parser strings
// parser: string; // ../parsers/index.ts : creditCard.breakdownMultiUser

export type CreditCardSimple = BankStatementNoBalance; // only difference is the range of allowable .parser strings
// parser: string; // ../parsers/index.ts : creditCard.simple

export interface PdfSuccessResponse extends StandardResponse {
  data:
    | BankStatementNoBalance
    | BankStatementNormal
    | CreditCardSimple
    | CreditCardBreakdown
    | CreditCardBreakdownMultiUser;
}

//#endregion

//#region csv

/* TODO *

export interface CsvResponse extends StandardResponse {
  data: x | y;
}

/* */

//#endregion

//#region web

/* TODO *

export type AccountsResponse = {
  sessionId: string;
  final?: boolean;
};

export type CloseResponse = {
  sessionId: string;
  final?: boolean;
};

export type EstatementResponse = {
  sessionId: string;
  final?: boolean;
  accountNumber: string;
  numDays: number;
};

export type LoginResponse = {
  site: string;
  user: string;
  pin: string;
  usernum: string;
  pass: string;
};

export type LoginInterimInputAbsaPassResponse = {
  sessionId: string;
  final?: boolean;
  code: string;
  data: string[];
};

export type LoginInterimInputStdOtpResponse = {
  sessionId: string;
  final?: boolean;
  code: string;
  data: string; // note: not number = will remove leading zeros
};

export type LoginInterimWaitResponse = {
  sessionId: string;
  final?: boolean;
};

export type StatementsResponse = {
  sessionId: string;
  final?: boolean;
  accountNumber: string;
  numStatements: number;
};

export type TransactionsResponse = {
  sessionId: string;
  final?: boolean;
  accountNumber: string;
  numDays: number;
};

/* */

//#endregion
