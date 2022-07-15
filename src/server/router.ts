import { t } from "./trpc";
import { channelRouter } from "./routers/channel";
import { messageRouter } from "./routers/message";

export const appRouter = t.router({
  channel: channelRouter,
  message: messageRouter
});

export type AppRouter = typeof appRouter;
