import type { IconType } from "react-icons";
import {
  MdCreate,
  MdFiberManualRecord,
  MdInsertComment,
  MdInbox,
  MdDrafts,
  MdBookmarkBorder,
  MdFileCopy,
  MdPeopleAlt,
  MdApps,
  MdExpandLess,
  MdExpandMore
} from "react-icons/md";

const SidebarOption = ({}: { Icon: IconType; title: string }) => {
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
        <SidebarOption Icon={MdInsertComment} title='Threads' />
        <SidebarOption Icon={MdInbox} title='Mentions & reactions' />
        <SidebarOption Icon={MdDrafts} title='Saved items' />
        <SidebarOption Icon={MdBookmarkBorder} title='Channel browser' />
        <SidebarOption Icon={MdPeopleAlt} title='People & user groups' />
        <SidebarOption Icon={MdApps} title='Apps' />
        <SidebarOption Icon={MdFileCopy} title='File browser' />
        <SidebarOption Icon={MdExpandLess} title='Show less' />
      </ul>
    </aside>
  );
}
