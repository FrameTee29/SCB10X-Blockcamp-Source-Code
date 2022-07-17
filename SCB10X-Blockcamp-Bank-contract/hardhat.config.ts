import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

import account from "./utils/account";

const config: HardhatUserConfig = {
  // solidity: "0.8.9",
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: account.getAccounts(),
    },
    kovan: {
      url: process.env.KOVAN_URL,
      accounts: account.getAccounts(),
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: account.getAccounts(),
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: account.getAccounts(),
    },
  },
};

export default config;
