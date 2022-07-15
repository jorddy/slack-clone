import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { MdOutlineInfo, MdOutlineStarBorder } from "react-icons/md";

const ChatInput = ({ channelId }: { channelId: string }) => {
  const ctx = trpc.useContext();

  const { mutate: createMessage } = trpc.proxy.message.create.useMutation({
    onMutate: async newMessage => {
      await ctx.cancelQuery(["message.getByChannel"]);
      // Optimistically update to the new value
      ctx.setQueryData(["message.getByChannel"], oldMessages => {
        if (oldMessages) {
          return [...oldMessages, newMessage] as any;
        }
      });
    },
    onSuccess: () => ctx.invalidateQueries(["message.getByChannel"])
  });

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    createMessage({ message: formData.get("message") as string, channelId });
    form.reset();
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

  const { data: messages } = trpc.proxy.message.getByChannel.useQuery({
    id: query.id
  });

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

      <div>
        {messages?.map(message => (
          <p key={message.id}>
            {message.createdAt.toLocaleDateString()} - {message.text}
          </p>
        ))}
      </div>

      <ChatInput channelId={query.id} />
    </section>
  );
}
