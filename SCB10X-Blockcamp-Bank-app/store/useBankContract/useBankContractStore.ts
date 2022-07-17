import addressList from "@config/constants/address-list";
import tenXBankContractService from "@services/bankContract.service";
import { bankContract } from "@services/contract.service";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import useConnectorStore from "store/useConnector/useConnectorStore";
import create, { GetState, SetState } from "zustand";
import { IUseBankContractStore } from "./useBankContractStore.interface";

const tenXBankContractAddress = addressList["0x4"].Bank;

const initialStore = {
  allAccount: [],
};

const useBankContractStore = create<IUseBankContractStore>(
  (
    set: SetState<IUseBankContractStore>,
    get: GetState<IUseBankContractStore>
  ) => ({
    ...initialStore,
    setClaimer: async (newClaimer: string) => {},
    setFee: async (feePercentage: number) => {},
    getAllMyAccount: async () => {
      const data = await tenXBankContractService.getAllMyAccount();
      set({ allAccount: data });
    },
    getAccount: async (address: string, index: number) => {
      const result = await tenXBankContractService.getAccount(address, index);
    },
    numberOfAccount: async () => {
      if (useConnectorStore.getState().isSupportNetwork) {
        const result = await tenXBankContractService.numberOfAccount();
        return Number(result);
      }
      return 0;
    },
    nameAccount: async (accountName: string) => {
      return "test";
    },
    nameBalanceOf: async (accountName: string) => {
      return 5;
    },
    tokenAccountBalanceOf: async (
      tokenAddress: string,
      accountName: string
    ) => {
      const data = await tenXBankContractService.tokenAccountBalanceOf(
        tokenAddress,
        accountName
      );
      const amount = ethers.utils.formatEther(data);
      return Number(amount);
    },
    createAccount: async (name: string) => {
      await tenXBankContractService.createBankAccount(name);
    },
    deposit: async (
      tokenAddress: string,
      accountName: string,
      amount: number
    ) => {
      await tenXBankContractService.deposit(tokenAddress, accountName, amount);
    },
    withdraw: async (
      tokenAddress: string,
      accountName: string,
      amount: number
    ) => {
      await tenXBankContractService.withdraw(tokenAddress, accountName, amount);
    },
    bankTransfer: async (
      tokenAddress: string,
      senderName: string,
      recipientName: string,
      amount: number
    ) => {},
    batchBankTransfer: async (
      tokenAddress: string[],
      senderName: string[],
      recipientName: string[],
      amount: number[]
    ) => {
      await tenXBankContractService.batchTransfer(
        tokenAddress,
        senderName,
        recipientName,
        amount
      );
    },
  })
);

export default useBankContractStore;
