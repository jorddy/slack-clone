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
  MdExpandMore,
  MdAdd
} from "react-icons/md";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const SidebarOption = ({
  Icon,
  title,
  id,
  addChannel
}: {
  Icon?: IconType;
  title: string;
  id?: string;
  addChannel?: boolean;
}) => {
  const { push } = useRouter();
  const ctx = trpc.useContext();

  const { mutate: createChannel } = trpc.proxy.channel.create.useMutation({
    onSuccess: () => ctx.invalidateQueries(["channel.getAll"])
  });

  const handleChannel = () => {
    if (addChannel) {
      const name = window.prompt("Enter a channel name");

      if (name) {
        createChannel({ name });
      }
    }

    if (!addChannel) {
      if (id) {
        push(`/room/${id}`);
      }
    }
  };

  return (
    <li
      onClick={handleChannel}
      className='flex p-3 gap-2 items-center cursor-pointer hover:opacity-90 hover:bg-slack-accent'
    >
      {Icon && (
        <>
          <Icon className='h-6 w-6' />
          <h3>{title}</h3>
        </>
      )}
      {!Icon && (
        <>
          <span>#</span> {title}
        </>
      )}
    </li>
  );
};

export default function Sidebar() {
  const { data: channels, isRefetching } = trpc.proxy.channel.getAll.useQuery();

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

        <hr className='border border-gray-400' />
        <SidebarOption Icon={MdExpandMore} title='Channels' />
        <hr className='border border-gray-400' />

        <SidebarOption Icon={MdAdd} title='Add channel' addChannel />

        {channels?.map(channel => (
          <SidebarOption
            key={channel.id}
            id={channel.id}
            title={channel.name}
          />
        ))}

        {isRefetching && <p>Refreshing...</p>}
      </ul>
    </aside>
  );
}
