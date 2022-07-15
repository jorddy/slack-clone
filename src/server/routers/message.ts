import { t } from "../trpc";
import { z } from "zod";
import { authProcedure } from "../middleware/auth";

export const messageRouter = t.router({
  getByChannel: t.procedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ input, ctx }) =>
      ctx.prisma.message.findMany({
        where: { channelId: input.id },
        orderBy: { createdAt: "asc" }
      })
    ),
  create: authProcedure
    .input(
      z.object({
        message: z.string().min(1).max(300),
        channelId: z.string()
      })
    )
    .mutation(({ input, ctx }) =>
      ctx.prisma.message.create({
        data: {
          text: input.message,
          channel: { connect: { id: input.channelId } },
          user: { connect: { id: ctx.user.id } }
        }
      })
    )
});
