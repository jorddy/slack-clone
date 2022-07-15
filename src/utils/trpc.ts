import { setupTRPC } from "@trpc/next";
import { AppRouter } from "@/server/router";
import superjson from "superjson";

export const trpc = setupTRPC<AppRouter>({
  config: () => {
    const url = process.env.NEXT_PUBLIC_URL
      ? `https://${process.env.NEXT_PUBLIC_URL}/api/trpc`
      : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : `http://localhost:3000/api/trpc`;

    return { url, transformer: superjson };
  },
  ssr: true
});
