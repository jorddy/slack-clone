import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server/router";
import { createContext } from "@/server/trpc";

export default createNextApiHandler({
  router: appRouter,
  createContext
});
