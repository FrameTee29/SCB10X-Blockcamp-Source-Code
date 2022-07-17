import BankAccountCard from "@components/Card/BankAccountCard";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import useBankContractStore from "store/useBankContract/useBankContractStore";
import useConnectorStore from "store/useConnector/useConnectorStore";
import DepositForm from "./components/DepositForm";

const Deposit = () => {
  const { currentAccount, isSupportNetwork } = useConnectorStore();
  const { allAccount, getAllMyAccount } = useBankContractStore();

  useEffect(() => {
    getAllMyBankAccount();
  }, [currentAccount]);

  const getAllMyBankAccount = async () => {
    if (isSupportNetwork) {
      await getAllMyAccount();
    }
  };

  return (
    <div className="text-white max-w-xl mx-auto">
      <div className="mt-6 flex flex-col justify-center items-center">
        <div>
          <Typography variant="h4">Deposit</Typography>
        </div>
        <div className="mt-4 py-6 w-full  flex flex-row space-x-2 overflow-x-auto">
          {allAccount?.map((item) => {
            return <BankAccountCard accountName={item} key={item} />;
          })}
        </div>
        <div className="flex space-x-2 mt-2">
          {allAccount.map((_, index) => (
            <div className="w-2 h-2 bg-white rounded-md" key={index} />
          ))}
        </div>
        <div className="mt-8 w-full">
          <DepositForm />
        </div>
      </div>
    </div>
  );
};

export default Deposit;
