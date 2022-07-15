import { t } from "../trpc";
import { z } from "zod";

export const channelRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => ctx.prisma.channel.findMany()),
  create: t.procedure
    .input(
      z.object({
        name: z.string().min(1).max(30)
      })
    )
    .mutation(({ input, ctx }) =>
      ctx.prisma.channel.create({
        data: { name: input.name }
      })
    )
});
