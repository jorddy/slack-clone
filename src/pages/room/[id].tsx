import Image from "next/image";
import AppLayout from "@/components/app-layout";
import { useRouter } from "next/router";
import { type InferQueryOutput, trpc } from "@/utils/trpc";
import { type FormEvent, type RefObject, useRef } from "react";
import { MdOutlineInfo, MdOutlineStarBorder } from "react-icons/md";
import { useScrollBottom } from "@/utils/scroll-bottom";
import { authorize } from "@/utils/authorize";
import { useSession } from "next-auth/react";

export { authorize as getServerSideProps };

const ChatInput = ({
  channelId,
  chatBottomRef,
  messages
}: {
  channelId: string;
  chatBottomRef: RefObject<HTMLDivElement | null>;
  messages: InferQueryOutput<"message.getByChannel">;
}) => {
  const { data: session } = useSession();
  const ctx = trpc.useContext();

  const { data: channel } = trpc.proxy.channel.getById.useQuery({
    id: channelId
  });

  const { mutate: createMessage } = trpc.proxy.message.create.useMutation({
    onMutate: async newMessage => {
      await ctx.cancelQuery(["message.getByChannel", { id: channelId }]);
      ctx.setQueryData(["message.getByChannel", { id: channelId }], [
        ...messages,
        {
          text: newMessage.message,
          createdAt: new Date(),
          user: {
            image: session?.user.image,
            name: session?.user.name
          }
        }
      ] as any);
    },
    onSuccess: () =>
      ctx.invalidateQueries(["message.getByChannel", { id: channelId }])
  });

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    createMessage({
      message: formData.get("message") as string,
      channelId
    });

    chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
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

const Message = ({
  message
}: {
  message: InferQueryOutput<"message.getByChannel">[0];
}) => {
  return (
    <div className='flex gap-3 items-center p-5'>
      {message.user.image && message.user.name && (
        <div className='relative h-12 w-12'>
          <Image
            src={message.user.image}
            alt={message.user.name}
            layout='fill'
            className='object-cover rounded-full'
          />
        </div>
      )}

      <div>
        <h4 className='flex gap-2 items-center font-semibold'>
          {message.user.name}{" "}
          <span className='font-normal text-gray-500 text-sm'>
            {message.createdAt.toUTCString()}
          </span>
        </h4>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default function RoomPage() {
  const { query } = useRouter();
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const { data: channel, isLoading: loadingChannel } =
    trpc.proxy.channel.getById.useQuery(
      {
        id: query.id as string
      },
      {
        enabled: !!query.id
      }
    );

  const { data: messages, isLoading: loadingMessages } =
    trpc.proxy.message.getByChannel.useQuery(
      {
        id: query.id as string
      },
      {
        enabled: !!query.id
      }
    );

  useScrollBottom(chatBottomRef, query.id as string, loadingMessages);

  if (!query.id || typeof query.id !== "string") {
    return null;
  }

  if (loadingChannel || loadingMessages) {
    return (
      <AppLayout>
        <section className='mt-16 col-span-4 grid place-content-center h-full'>
          <div className='relative h-10 w-10'>
            <Image src='/spinner.svg' alt='loading spinner' layout='fill' />
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <section className='mt-16 col-span-4 overflow-y-auto'>
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
          {messages?.length === 0 && <p className='p-4'>No messages !</p>}
          {messages?.map(message => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={chatBottomRef} className='pb-48'></div>
        </div>

        <ChatInput
          channelId={query.id}
          chatBottomRef={chatBottomRef}
          messages={messages!}
        />
      </section>
    </AppLayout>
  );
}
