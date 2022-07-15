import { useRouter } from "next/router";

export default function RoomPage() {
  const { query } = useRouter();

  if (!query.id || typeof query.id !== "string") {
    return null;
  }

  return (
    <section className='col-span-4 p-4 overflow-y-auto'>
      <div className=''></div>
    </section>
  );
}
