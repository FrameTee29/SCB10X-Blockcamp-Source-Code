import AddTokenSupport from "@components/AddTokenSupport/AddTokenSupport";
import BankAccountCard from "@components/Card/BankAccountCard";
import { tokenSupported } from "@config/constants/token-supported";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import useBankContractStore from "store/useBankContract/useBankContractStore";
import useConnectorStore from "store/useConnector/useConnectorStore";
import useUIStore from "store/useUI/useUIStore";
import { ModalViews } from "store/useUI/useUIStore.interface";

const Home = () => {
  const { openModal, setModalView } = useUIStore();
  const { isSupportNetwork, currentAccount } = useConnectorStore();
  const { allAccount, getAllMyAccount } = useBankContractStore();

  const handleOpenCreateBankAccount = () => {
    setModalView(ModalViews.CREATE_BANK_ACCOUNT);
    openModal();
  };

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
      {/* <div className="flex justify-center mt-4">
        <AddTokenSupport />
      </div> */}
      <div className="mt-4 flex flex-col space-y-2 justify-center items-center">
        <Typography variant="h4">My Accounts</Typography>
      </div>

      {/* <div className="mb-2 mt-6 text-center">
        <button
          className="bg-blue1 px-2 py-2 rounded-md hover:bg-blue-500 text-white text-sm"
          onClick={handleOpenCreateBankAccount}
        >
          Create Bank Account
        </button>
      </div> */}
      <div className="mt-8 max-w-3xl mx-auto space-y-4 flex flex-col items-center">
        {allAccount?.map((item) => {
          return <BankAccountCard accountName={item} key={item} />;
        })}
        <div
          className="border-dashed hover: cursor-pointer text-center flex flex-col w-full min-w-[270px] max-w-sm bg-secondary border rounded-lg border-purple2 px-4 py-4 "
          onClick={handleOpenCreateBankAccount}
        >
          <div className="text-sm text-pink-500 font-bold">
            Create Bank account
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <AddTokenSupport />
        </div>
      </div>
    </div>
  );
};

export default Home;
