type T_walletAddr = string;

type PathParams = {
  pathBase: string,
  addr: T_walletAddr,
  AppName: string
};

export type {
  T_walletAddr,
  PathParams
}