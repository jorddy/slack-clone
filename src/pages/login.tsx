import { GetServerSideProps } from "next";
import type { BuiltInProviderType } from "next-auth/providers";
import {
  type ClientSafeProvider,
  getProviders,
  type LiteralUnion,
  signIn
} from "next-auth/react";
import Image from "next/image";

export default function Login({
  providers
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  return (
    <main className='grid place-content-center min-h-screen bg-gray-100'>
      <section className='p-14 flex flex-col items-center gap-3 bg-white shadow-md rounded-md'>
        <div className='relative h-24 w-24'>
          <Image
            src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
            alt='slack logo'
            layout='fill'
            className='object-contain'
          />
        </div>

        <h1 className='text-2xl font-bold'>Sign in to Slack</h1>

        {providers &&
          Object.values(providers).map(provider => (
            <button
              key={provider.name}
              onClick={() =>
                signIn(provider.id, { redirect: true, callbackUrl: "/" })
              }
              className='px-4 py-3 font-semibold text-white bg-green-700 rounded-sm 
              transition hover:bg-green-800'
            >
              Sign in with {provider.name}
            </button>
          ))}
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers }
  };
};
