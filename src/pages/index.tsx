import AppLayout from "@/components/app-layout";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Index() {
  return (
    <AppLayout>
      <section className='mt-16 col-span-4 grid place-content-center h-full'>
        <h1>Click a room to see messages</h1>
      </section>
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return { props: { session } };
};
