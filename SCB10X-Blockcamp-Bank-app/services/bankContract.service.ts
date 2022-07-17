import { ethers } from "ethers";
import addressList from "@config/constants/address-list";
import { bankContract } from "./contract.service";
import { parseEther } from "ethers/lib/utils";

const getTenXBankContract = async () => {
  const tenXBankContractAddress = addressList["0x4"].Bank;
  return await bankContract(tenXBankContractAddress);
};

const getAccount = async (address: string, index: number) => {
  const contract = await getTenXBankContract();
  const tx = await contract.account(address, index);
  return tx;
};

const createBankAccount = async (name: string) => {
  const contract = await getTenXBankContract();
  const tx = await contract.createAccount(name);
  await tx.wait();
};

const numberOfAccount = async () => {
  const contract = await getTenXBankContract();
  const tx = await contract.numberOfAccount();
  return ethers.BigNumber.from(tx).toString();
};

const getAllMyAccount = async () => {
  const contract = await getTenXBankContract();
  const tx = await contract.getAllMyAccount();
  return tx;
};

const tokenAccountBalanceOf = async (tokenAddress: string, name: string) => {
  const contract = await getTenXBankContract();
  const tx = await contract.tokenAccountBalanceOf(tokenAddress, name);
  return tx;
};

const deposit = async (
  tokenAddress: string,
  accountName: string,
  amount: number
) => {
  const contract = await getTenXBankContract();
  const tx = await contract.deposit(
    tokenAddress,
    accountName,
    parseEther(String(amount))
  );
  await tx.wait();
};

const withdraw = async (
  tokenAddress: string,
  accountName: string,
  amount: number
) => {
  const contract = await getTenXBankContract();
  const tx = await contract.withdraw(
    tokenAddress,
    accountName,
    parseEther(String(amount))
  );
  await tx.wait();
};

const batchTransfer = async (
  tokenAddress: string[],
  senderName: string[],
  recipientName: string[],
  amount: number[]
) => {
  const amountParseEther = amount.map((item) => parseEther(String(item)));
  const contract = await getTenXBankContract();
  const tx = await contract.batchBankTransfer(
    tokenAddress,
    senderName,
    recipientName,
    amountParseEther
  );
  await tx.wait();
};

const tenXBankContractService = {
  createBankAccount,
  numberOfAccount,
  getAccount,
  getAllMyAccount,
  tokenAccountBalanceOf,
  deposit,
  withdraw,
  batchTransfer,
};

export default tenXBankContractService;
