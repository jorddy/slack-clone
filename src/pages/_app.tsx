import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "@/utils/trpc";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-screen overflow-hidden'>
      <Head>
        <title>Slack 2.0 Clone</title>
      </Head>
      <Header />
      <main className='grid grid-cols-5 h-full'>
        <Sidebar />
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools />
    </div>
  );
}

export default trpc.withTRPC(MyApp);
