import { FC } from "react";
import ConnectWalletButton from "@components/Button/ConnectWalletButton";
import useConnectorStore from "store/useConnector/useConnectorStore";

const ConnectWallet: FC = () => {
  const { connectMetamask } = useConnectorStore();

  return (
    <div>
      <ConnectWalletButton onClick={connectMetamask}>
        Connect wallet
      </ConnectWalletButton>
    </div>
  );
};

export default ConnectWallet;
