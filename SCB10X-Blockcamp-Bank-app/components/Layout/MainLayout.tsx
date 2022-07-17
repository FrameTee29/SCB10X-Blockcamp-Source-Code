import { FC } from "react";

import MainNavbar from "./MainNavbar";
import Dialog from "@mui/material/Dialog";
import { DialogContent, Drawer } from "@mui/material";
import useUIStore from "store/useUI/useUIStore";
import { DrawerViews, ModalViews } from "store/useUI/useUIStore.interface";
import { XIcon } from "@heroicons/react/solid";
import CreateBankAccountModal from "@components/Modal/CreateBankAccountModal";
import useConnectorStore from "store/useConnector/useConnectorStore";
import { chainList } from "@config/constants/network";
import MainSidebar from "@components/Drawer/Sidebar";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {}

const MainLayout: FC<PageProps> = ({ children, ...props }) => {
  const { isSupportNetwork, isConnect } = useConnectorStore();

  const ModalUI: FC = () => {
    const { displayModal, modalView, closeModal } = useUIStore();

    return (
      <ModalView
        displayModal={displayModal}
        modalView={modalView}
        closeModal={closeModal}
      />
    );
  };

  const ModalView: FC<{
    displayModal: boolean;
    modalView: ModalViews;
    closeModal: () => void;
  }> = ({ displayModal, modalView, closeModal }) => {
    return (
      <Dialog fullWidth open={displayModal} onClose={closeModal}>
        <DialogContent>
          {modalView === ModalViews.CREATE_BANK_ACCOUNT && (
            <CreateBankAccountModal />
          )}
        </DialogContent>
      </Dialog>
    );
  };

  const DrawerUI: FC = () => {
    const { displayDrawer, drawerView, closeDrawer } = useUIStore();

    return (
      <DrawerView
        displayDrawer={displayDrawer}
        drawerView={drawerView}
        closeDrawer={closeDrawer}
      />
    );
  };

  const DrawerView: FC<{
    displayDrawer: boolean;
    drawerView: DrawerViews;
    closeDrawer: () => void;
  }> = ({ displayDrawer, drawerView, closeDrawer }) => {
    return (
      <Drawer open={displayDrawer} anchor="right">
        <div className=" relative bg-primary h-full min-w-[320px]">
          <div className="text-white absolute right-[10px] top-[10px]">
            <XIcon className="w-7" onClick={closeDrawer}></XIcon>
          </div>
          {drawerView === DrawerViews.SIDEBAR && <MainSidebar />}
        </div>
      </Drawer>
    );
  };

  const handleSwitchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
    } catch (switchError: any) {
      if (switchError?.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [chainList["0x4"]],
        });
      }
    }
  };

  return (
    <div>
      {!isSupportNetwork && (
        <div className="bg-orange-500 text-white text-center py-2 text-sm">
          <span>This network is not supported.</span>{" "}
          <span
            className="ml-2 text-black font-bold border-b-2 border-black cursor-pointer"
            onClick={handleSwitchNetwork}
          >
            switch network
          </span>
        </div>
      )}
      <MainNavbar />
      {isSupportNetwork && isConnect && (
        <main className="container mx-auto px-2 pb-8">{children}</main>
      )}
      <ModalUI />
      <DrawerUI />
    </div>
  );
};

export default MainLayout;
