import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          title: input.text,
        },
      });
      return todo;
    }),
  update: publicProcedure
    .input(z.object({ id: z.string(), text: z.string(), checked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.text,
          completed: input.checked,
        },
      });
      return todo;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
      return todo;
    }),
});
