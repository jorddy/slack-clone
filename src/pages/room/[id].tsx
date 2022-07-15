import { useRouter } from "next/router";

export default function RoomPage() {
  const { query } = useRouter();

  if (!query.id) {
    return null;
  }

  return <div>{query.id}</div>;
}
