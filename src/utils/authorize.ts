import type { GetServerSidePropsContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

export const authorize = async ({ req, res }: GetServerSidePropsContext) => {
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
