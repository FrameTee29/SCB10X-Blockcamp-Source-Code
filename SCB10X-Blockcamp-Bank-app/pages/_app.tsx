import { FC, useEffect } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { MetaMaskInpageProvider } from "@metamask/providers";

import "../styles/main.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router, useRouter } from "next/router";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const progress = new ProgressBar({
  size: 4,
  className: "bar-of-progress",
  delay: 100,
});

const TemporaryLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || TemporaryLayout;

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {});
    return () => {
      router.events.off("routeChangeComplete", () => {});
    };
  }, [router.events]);

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
