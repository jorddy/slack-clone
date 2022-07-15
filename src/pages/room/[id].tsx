import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { MdOutlineInfo, MdOutlineStarBorder } from "react-icons/md";

const ChatInput = ({ channelId }: { channelId: string }) => {
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
  };

  return (
    <form onSubmit={sendMessage} className='relative flex justify-center'>
      <input
        type='text'
        name='message'
        placeholder={`Message #${channelId}`}
        className='fixed bottom-7 p-5 w-3/4 border border-gray-500 rounded-sm'
      />
      <button type='submit' hidden></button>
    </form>
  );
};

export default function RoomPage() {
  const { query } = useRouter();

  if (!query.id || typeof query.id !== "string") {
    return null;
  }

  return (
    <section className='col-span-4 overflow-y-auto'>
      <div className='flex p-5 justify-between items-center border-b'>
        <div className='flex gap-2 items-center'>
          <h4 className='lowercase'>
            <strong>#Room-name</strong>
          </h4>
          <MdOutlineStarBorder className='h-6 w-6' />
        </div>

        <p className='flex gap-2 items-center'>
          <MdOutlineInfo className='h-6 w-6' /> Details
        </p>
      </div>

      <div>{/* TODO: List out messages */}</div>

      <ChatInput channelId={query.id} />
    </section>
  );
}
