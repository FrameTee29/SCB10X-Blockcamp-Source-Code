import { tokenSupported } from "@config/constants/token-supported";
import { formatNumber } from "@utils/format";
import { formatUnits } from "ethers/lib/utils";
import React, { FC, useEffect, useState } from "react";
import { GiWhiteBook } from "react-icons/gi";
import useBankContractStore from "store/useBankContract/useBankContractStore";
interface BankAccountCardProps {
  accountName: string;
}

const BankAccountCard: FC<BankAccountCardProps> = ({ accountName }) => {
  const { tokenAccountBalanceOf , allAccount } = useBankContractStore();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [balanceOf, setBalanceOf] = useState<
    {
      tokenAddress: string;
      amount: number;
    }[]
  >([]);

  useEffect(() => {
    getAllBalance();
  }, [allAccount]);

  const getAllBalance = async () => {
    const data = await Promise.all(
      tokenSupported.map(async (item) => {
        const balance = tokenAccountBalanceOf(item.address, accountName);
        return { tokenAddress: item.address, amount: await balance };
      })
    );
    const amountArr = data.map((item) => item.amount);
    const sum = amountArr.reduce((a, b) => a + b, 0);
    setTotalSupply(sum);
    setBalanceOf(data);
  };

  const displayToken = (tokenAddress: string, amount: number) => {
    const tokenData = tokenSupported.find((f) => f.address === tokenAddress);
    return (
      <div className="flex items-center">
        <img src={tokenData?.image} className="w-7 h-7" />
        <div className="font-semibold text-white mx-2">
          {formatNumber(amount)}
        </div>
        <div className="font-semibold text-white">{tokenData?.symbol}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full min-w-[270px] max-w-sm bg-secondary border rounded-lg border-purple2 px-4 py-4 ">
      <div className="flex items-center space-x-2">
        <GiWhiteBook></GiWhiteBook>
        <span className="text-sm">{accountName}</span>
      </div>
      <div className="flex justify-end">
        <span className="font-bold text-lg text-purple1">
          {formatNumber(totalSupply)}
        </span>
      </div>
      <div className="border-t mt-4 border-gray-600 py-1">
        <div className="text-sm text-gray-400 hover:text-white">
          <div className="grid grid-cols-1 gap-2 mt-3">
            {balanceOf.map((item, index) => (
              <React.Fragment key={index}>
                {displayToken(item.tokenAddress, item.amount)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountCard;
