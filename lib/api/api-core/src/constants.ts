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

export enum BankName {
  ABS = "ABSA",
  BID = "Bidvest",
  CAP = "Capitec",
  DEA = "Document Exchange Association",
  DIS = "Discovery",
  FNB = "FNB",
  INV = "Investec",
  NED = "Nedbank",
  MRC = "Mercantile Bank",
  RMB = "RMB",
  SAS = "Safin",
  STD = "Standard Bank",
  TYM = "TYME",
}

export enum BankCode {
  ABS = "ABS",
  BID = "BID",
  CAP = "CAP",
  DEA = "DEA",
  DIS = "DIS",
  FNB = "FNB",
  INV = "INV",
  NED = "NED",
  MRC = "MRC",
  RMB = "RMB",
  SAS = "SAS",
  STD = "STD",
  TYM = "TYM",
}
