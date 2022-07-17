interface IInitialStore {
  allAccount: Array<string>;
}

export interface IUseBankContractStore extends IInitialStore {
  setClaimer: (newClaimer: string) => void;
  setFee: (feePercentage: number) => void;
  getAllMyAccount: () => void;
  getAccount: (address: string, index: number) => void;
  numberOfAccount: () => Promise<number>;
  nameAccount: (accountName: string) => Promise<string>;
  nameBalanceOf: (accountName: string) => Promise<number>;
  tokenAccountBalanceOf: (
    tokenAddress: string,
    accountName: string
  ) => Promise<number>;
  createAccount: (name: string) => void;
  deposit: (tokenAddress: string, accountName: string, amount: number) => void;
  withdraw: (tokenAddress: string, accountName: string, amount: number) => void;
  bankTransfer: (
    tokenAddress: string,
    senderName: string,
    recipientName: string,
    amount: number
  ) => void;
  batchBankTransfer: (
    tokenAddress: string[],
    senderName: string[],
    recipientName: string[],
    amount: number[]
  ) => void;
}
