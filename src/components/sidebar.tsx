import { MdCreate, MdFiberManualRecord } from "react-icons/md";

const SidebarOption = () => {
  return <li>Sidebar option 1</li>;
};

export default function Sidebar() {
  return (
    <aside className='col-span-1 bg-slack text-white'>
      <div className='flex p-4 items-center gap-2 border-t border-b border-gray-400'>
        <div className='flex-1'>
          <h2 className='text-sm font-black pb-1'>SLACK HQ</h2>
          <h3 className='flex gap-1 items-center text-sm text-gray-300'>
            <MdFiberManualRecord className='h-5 w-5 text-green-400' /> Jake Ord
          </h3>
        </div>
        <MdCreate className='h-8 w-8 p-1 bg-white text-slack rounded-full' />
      </div>

      <ul>
        <SidebarOption />
      </ul>
    </aside>
  );
}
