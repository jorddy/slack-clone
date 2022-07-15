import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "./db";
import superjson from "superjson";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return { req, res, prisma };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC<{ ctx: Context }>()({
  transformer: superjson
});
