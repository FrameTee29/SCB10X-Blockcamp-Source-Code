import { ITokenOptions } from "types/addToken.interface";

export const tokenList = {
  USDT: {
    address: "0x459Ec8299daf1a871fEBf9F4938632daae2022a0",
    symbol: "USDT",
    decimals: 18,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
  },
  USDC: {
    address: "0xF35e3c80a5387DD959EC0f6abB9E72eBF7ee4585",
    symbol: "USDC",
    decimals: 18,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  },
};

export const tokenSupported: ITokenOptions[] = [tokenList.USDT, tokenList.USDC];
