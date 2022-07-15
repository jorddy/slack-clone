import { t } from "./trpc";
import { channelRouter } from "./routers/channel";

export const appRouter = t.router({
  channel: channelRouter
});

export type AppRouter = typeof appRouter;
