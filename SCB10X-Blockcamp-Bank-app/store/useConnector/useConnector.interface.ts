interface IInitialStore {
  isSupportNetwork: boolean;
  isConnect: boolean;
  currentAccount: string;
  hashChainId: string;
}

export interface IUseConnector extends IInitialStore {
  requestAccount: () => void;
  getAccount: () => void;
  getAccountChange: () => void;
  getChainId: () => void;
  chainChanged: () => void;
  connectMetamask: () => void;
  loadApplication: () => void;
}
