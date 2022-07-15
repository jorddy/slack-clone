import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "@/utils/trpc";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <div className='h-screen overflow-hidden'>
        <Head>
          <title>Slack 2.0 Clone</title>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
