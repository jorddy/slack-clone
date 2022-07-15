import { GetServerSideProps } from "next";
import type { BuiltInProviderType } from "next-auth/providers";
import {
  type ClientSafeProvider,
  getProviders,
  type LiteralUnion,
  signIn
} from "next-auth/react";

export default function Login({
  providers
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}) {
  console.log(providers);

  return (
    <>
      <div>hi</div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers }
  };
};
