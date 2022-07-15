import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "@/utils/trpc";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <main className='grid grid-cols-5 min-h-full'>
        <Sidebar />
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default trpc.withTRPC(MyApp);
