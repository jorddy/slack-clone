import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "./db";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import superjson from "superjson";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  return { req, res, prisma, session };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC<{ ctx: Context }>()({
  transformer: superjson
});
