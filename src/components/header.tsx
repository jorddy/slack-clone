import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { MdAccessTime, MdHelpOutline, MdSearch } from "react-icons/md";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className='fixed w-full z-10 px-6 py-3 grid grid-cols-8 gap-4 bg-slack text-white'>
      <div className='col-span-2 flex gap-2 items-center'>
        {session?.user.image && session?.user.name && (
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className='relative h-10 w-10 cursor-pointer hover:opacity-80'
          >
            <Image
              src={session.user.image}
              alt={session.user.name}
              layout='fill'
              className='object-fill rounded-full'
            />
          </button>
        )}
        <MdAccessTime className='h-6 w-6 ml-auto' />
      </div>

      <form
        className='col-span-4 px-4 text-center flex items-center gap-2 bg-slack-accent 
        rounded-md border border-gray-400 focus-within:outline'
      >
        <MdSearch className='h-6 w-6' />
        <input
          type='text'
          placeholder='Search slack...'
          className='bg-transparent flex-1 outline-none'
        />
      </form>

      <div className='col-span-2 self-center justify-self-end'>
        <MdHelpOutline className='h-6 w-6' />
      </div>
    </header>
  );
}
