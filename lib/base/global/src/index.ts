import "./global";
import {
  LogLevel,
  AlertLevel,
  UtilFormat,
  AlertUtilFormat,
  ILoggerConfig,
  ILoggerSettings,
  ILoggerInputs,
  ILogger,
  AdditionalLoggerCapabilities,
} from "./i-logger";
import { ISingleton, ISingletonConfig, ISingletonInputs } from "./i-singleton";
import { RecursivePartial } from "./RecursivePartial";

export {
  // i-logger
  LogLevel,
  AlertLevel,
  UtilFormat,
  AlertUtilFormat,
  ILoggerConfig,
  ILoggerSettings,
  ILoggerInputs,
  ILogger,
  AdditionalLoggerCapabilities,
  // i-singleton
  ISingleton,
  ISingletonConfig,
  ISingletonInputs,
  // RecursivePartial
  RecursivePartial,
};
