import { FC, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuIcon } from "@heroicons/react/solid";

import Logo from "@components/Logo/Logo";
import { listNavigate } from "@config/navigate/navigate-list";
import ConnectWallet from "@components/ConnectWallet/ConnectWallet";
import useUIStore from "store/useUI/useUIStore";
import { DrawerViews } from "store/useUI/useUIStore.interface";
import useConnectorStore from "store/useConnector/useConnectorStore";
import ConnectWalletButton from "@components/Button/ConnectWalletButton";
import { truncateAddress } from "@utils/common";

const MainNavbar: FC = () => {
  const router = useRouter();
  const { setDrawerView, openDrawer } = useUIStore();
  const { isConnect, currentAccount, loadApplication } = useConnectorStore();

  useEffect(() => {
    loadApplication();
  }, []);

  const handleOpenSidebar = () => {
    setDrawerView(DrawerViews.SIDEBAR);
    openDrawer();
  };

  const pathStart = (path: string) => {
    let basePage;
    if (path.startsWith("/deposit")) {
      basePage = "/deposit";
    } else if (path.startsWith("/withdraw")) {
      basePage = "/withdraw";
    } else if (path.startsWith("/transfer")) {
      basePage = "/transfer";
    } else {
      basePage = path;
    }
    return basePage;
  };

  return (
    <div className="sticky top-0">
      <div className="container mx-auto border-b-[1px] border-third bg-primary">
        <div className="flex w-full items-center h-20 sticky top-0 z-50 text-white px-2">
          {/* Desktop */}
          <div className="hidden lg:flex w-full items-center justify-between">
            <div className="flex items-center">
              <Logo />
              {isConnect && (
                <div className="ml-14">
                  <ul className="mb-0 space-x-6">
                    {listNavigate.map((item) => {
                      return (
                        <Link href={item.slug} key={item.name}>
                          <a
                            className={`no-underline hover:text-white font-semibold ${
                              pathStart(router.pathname) === item.pathName
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          >
                            <li className="inline cursor-pointer">
                              {item.name}
                            </li>
                          </a>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            {isConnect ? (
              <ConnectWalletButton>
                {truncateAddress(currentAccount, 6)}
              </ConnectWalletButton>
            ) : (
              <ConnectWallet />
            )}
          </div>
          {/* Mobile */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <Logo />
            {isConnect ? (
              <div className="flex space-x-2">
                <ConnectWalletButton className="">
                  {truncateAddress(currentAccount, 6)}
                </ConnectWalletButton>
                <MenuIcon
                  className="w-8"
                  onClick={handleOpenSidebar}
                ></MenuIcon>
              </div>
            ) : (
              <ConnectWallet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
