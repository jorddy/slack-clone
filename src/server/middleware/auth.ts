import { t } from "../trpc";
import { TRPCError } from "@trpc/server";

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to acces this"
    });
  }

  return next({
    ctx: {
      user: ctx.session.user
    }
  });
});

export const authProcedure = t.procedure.use(authMiddleware);
