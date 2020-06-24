export type PdfRequest = {
  file?: string;
  buffer: string | Buffer;
  pass?: string;
};

export type CsvRequest = {
  file?: string;
  buffer: string | Buffer;
};

//#region web

export type AccountsRequest = {
  sessionId: string;
  final?: boolean;
};

export type CloseRequest = {
  sessionId: string;
  final?: boolean;
};

export type EstatementRequest = {
  sessionId: string;
  final?: boolean;
  accountNumber: string;
  numDays: number;
};

export type LoginRequest = {
  site: string;
  user: string;
  pin: string;
  usernum: string;
  pass: string;
};

export type LoginInterimInputAbsaPassRequest = {
  sessionId: string;
  final?: boolean;
  code: string;
  data: string[];
};

export type LoginInterimInputStdOtpRequest = {
  sessionId: string;
  final?: boolean;
  code: string;
  data: string; // note: not number = will remove leading zeros
};

export type LoginInterimWaitRequest = {
  sessionId: string;
  final?: boolean;
};

export type StatementsRequest = {
  sessionId: string;
  final?: boolean;
  accountNumber: string;
  numStatements: number;
};

export type TransactionsRequest = {
  sessionId: string;
  final?: boolean;
  accountNumber: string;
  numDays: number;
};

//#endregion
