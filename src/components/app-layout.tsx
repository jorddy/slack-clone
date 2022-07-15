import { PropsWithChildren } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main className='grid grid-cols-5 h-full'>
        <Sidebar />
        {children}
      </main>
    </>
  );
}
