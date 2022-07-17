import addressList from "@config/constants/address-list";
import { storageKey } from "@config/constants/storageKey";
import localStorageService from "@utils/localStorageService";
import { ethers } from "ethers";
import create, { GetState, SetState } from "zustand";
import { IUseConnector } from "./useConnector.interface";

const initialStore = {
  isSupportNetwork: true,
  isConnect: false,
  currentAccount: "",
  hashChainId: "",
};

const useConnectorStore = create<IUseConnector>(
  (set: SetState<IUseConnector>, get: GetState<IUseConnector>) => ({
    ...initialStore,
    requestAccount: async () => {
      try {
        const account = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];
        set({ currentAccount: account[0] });
      } catch (err: any) {
        if (err.code === 4001) {
          console.log(err.message);
        }
      }
    },
    getAccount: async () => {
      try {
        const ethAccounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const [account] = ethAccounts as string[];
        set({ currentAccount: account });
      } catch (err) {
        console.log(err);
      }
    },
    getAccountChange: async () => {
      await window.ethereum.on("accountsChanged", (accounts) => {
        const accountChange = accounts as string[];
        if (accountChange[0]) {
          set({ currentAccount: accountChange[0] });
        } else {
          set({ isConnect: false });
          localStorageService.clearItem();
        }
      });
    },
    getChainId: async () => {
      if (typeof window.ethereum !== "undefined") {
        const chainId = (await window.ethereum.request({
          method: "eth_chainId",
        })) as string;
        set({ hashChainId: chainId });
        addressList[chainId]
          ? set({ isSupportNetwork: true })
          : set({ isSupportNetwork: false });
      }
    },
    chainChanged: async () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.on("chainChanged", () => window.location.reload());
      }
    },
    loadApplication: async () => {
      if (typeof window.ethereum !== "undefined") {
        const isConnectFromLocalStorage = localStorageService.getItem(
          storageKey.isConnect
        );
        if (isConnectFromLocalStorage) {
          await get().connectMetamask();
        }
      }
    },
    connectMetamask: async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          await get().getChainId();
          await get().chainChanged();
          await get().requestAccount();
          await get().getAccount();
          if (get().currentAccount !== undefined) {
            await get().getAccountChange();
            localStorageService.setItem(storageKey.isConnect, String(true));
            set({ isConnect: true });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  })
);

export default useConnectorStore;
