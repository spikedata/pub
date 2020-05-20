export interface ISingleton {
  config: ISingletonConfig;
  inputs?: ISingletonInputs;
  initialized: boolean;
  init(config: ISingletonConfig, inputs?: ISingletonInputs): Promise<void>; // async function no return
  shutdown(): Promise<void>;
}

export type ISingletonConfig = any;
export type ISingletonInputs = any;
