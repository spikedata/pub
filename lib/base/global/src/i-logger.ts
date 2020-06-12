import { ISingleton, ISingletonInputs } from "./i-singleton";
import { RecursivePartial } from "./RecursivePartial";

export const LogLevel = {
  net: ": NET :",
  debug: ":DEBUG:",
  info: ":INFO :",
  warn: ":WARN :",
  error: ":ERROR:",
  fatal: ":FATAL:",
  alertWarn: ":ALRTW:",
  alertError: ":ALRTE:",
};

export enum AlertLevel {
  Error = 0,
  Warn = 1,
}

// loggers use the same args as `console.log` - i.e. [util.format](https://nodejs.org/docs/latest-v10.x/api/util.html#util_util_format_format_args)
export type UtilFormat = (message?: any, ...optionalParams: any[]) => void;
export type AlertUtilFormat = (level: AlertLevel, message?: any, ...optionalParams: any[]) => void;

// export interface ILoggerConstructor {
//   new (config: ILoggerConfig): ILogger;
// }

export interface ILoggerConfig {
  logger: string; // discriminant
  quiet: boolean;
  levelFilter: {
    net: boolean;
    debug: boolean;
    info: boolean;
    warn: boolean;
    error: boolean;
    fatal: boolean;
    alertWarn: boolean;
    alertError: boolean;
  };
}
export type ILoggerSettings = RecursivePartial<ILoggerConfig>;
export type ILoggerInputs = ISingletonInputs;

export interface ILogger extends ISingleton {
  config: ILoggerConfig;
  inputs?: ILoggerInputs;
  initialized: boolean;
  isCli: boolean;
  init(config: ILoggerConfig, inputs?: ILoggerInputs): Promise<void>;
  shutdown(): Promise<void>;

  net: UtilFormat;
  debug: UtilFormat;
  info: UtilFormat;
  warn: UtilFormat;
  error: UtilFormat;
  fatal: UtilFormat;
  alert: AlertUtilFormat;
}
