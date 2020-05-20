import "../../src/global";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      runtype: number;
      RUNTYPE: any;
    }
  }
}
