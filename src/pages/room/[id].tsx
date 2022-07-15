import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { MdOutlineInfo, MdOutlineStarBorder } from "react-icons/md";

const ChatInput = ({ channelId }: { channelId: string }) => {
  const ctx = trpc.useContext();

  const { data: channel } = trpc.proxy.channel.getById.useQuery({
    id: channelId
  });

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
        placeholder={`Message #${channel?.name}`}
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

  const { data: channel, isLoading: loadingChannel } =
    trpc.proxy.channel.getById.useQuery({
      id: query.id
    });

  const { data: messages, isLoading: loadingMessages } =
    trpc.proxy.message.getByChannel.useQuery({
      id: query.id
    });

  if (loadingChannel || loadingMessages) {
    return (
      <section className='col-span-4 grid place-content-center h-full'>
        <div className='relative h-10 w-10'>
          <Image src='/spinner.svg' alt='loading spinner' layout='fill' />
        </div>
      </section>
    );
  }

  return (
    <section className='col-span-4 overflow-y-auto'>
      <div className='flex p-5 justify-between items-center border-b'>
        <div className='flex gap-2 items-center'>
          <h4 className='lowercase'>
            <strong>#{channel?.name}</strong>
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
