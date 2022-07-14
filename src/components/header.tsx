import Image from "next/image";
import { MdAccessTime } from "react-icons/md";

export default function Header() {
  return (
    <header className='flex p-4'>
      <div className='flex-[0.3] flex items-center'>
        <div className='relative w-10 h-10'>
          <Image
            src='/placeholder.png'
            alt='Profile picture'
            layout='fill'
            className='object-fill rounded-full'
          />
        </div>
        <MdAccessTime />
      </div>
    </header>
  );
}
