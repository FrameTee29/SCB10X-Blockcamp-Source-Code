import { ethers } from "ethers";
import { rpcList } from "@config/constants/network";

export const getProvider = () => {
  const url = rpcList["0x4"];
  return new ethers.providers.JsonRpcProvider(url);
};

export const getSigner = () => {
  const eth = window.ethereum;
  return new ethers.providers.Web3Provider(window.ethereum as any).getSigner();
};
