export const rpcList = {
  "0x4":
    "https://eth-rinkeby.alchemyapi.io/v2/Qt8Wyhov29nWxq4df9Gc0EY75sD8CeGA",
};

export const chainList = {
  "0x4": {
    chainId: "0x6545",
    chainName: "Rinkeby Test Network",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [rpcList["0x4"]],
    blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
    iconUrls: [],
  },
};
