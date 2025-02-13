// import { z } from "zod";
// import { router, protectedProcedure } from "../trpc";
// import { prisma } from "../db";

// export const todoRouter = router({
//   // Create a new todo
//   create: protectedProcedure
//     .input(z.object({ title: z.string() }))
//     .mutation(async ({ input, ctx }) => {
//       const todo = await prisma.todo.create({
//         data: {
//           title: input.title,
//           userId: ctx.session.user.id,
//         },
//       });
//       return todo;
//     }),

//   // Get all todos for the current user
//   getAll: protectedProcedure.query(async ({ ctx }) => {
//     const todos = await prisma.todo.findMany({
//       where: { userId: ctx.session.user.id },
//     });
//     return todos;
//   }),

//   // Update a todo (mark as completed)
//   update: protectedProcedure
//     .input(z.object({ id: z.string(), completed: z.boolean() }))
//     .mutation(async ({ input, ctx }) => {
//       const todo = await prisma.todo.update({
//         where: { id: input.id },
//         data: { completed: input.completed },
//       });
//       return todo;
//     }),

//   // Delete a todo
//   delete: protectedProcedure
//     .input(z.object({ id: z.string() }))
//     .mutation(async ({ input, ctx }) => {
//       await prisma.todo.delete({
//         where: { id: input.id },
//       });
//       return { success: true };
//     }),
// });
import { z } from "zod";
// import { protectedProcedure, router } from "../trpc";
import { prisma } from "../db";
import { protectedProcedure, router } from "server/trpc";

export const todoRouter = router({
  // Create a new todo
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const todo = await prisma.todo.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
      return todo;
    }),

  // Get all todos for the current user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const todos = await prisma.todo.findMany({
      where: { userId: ctx.session.user.id },
    });
    return todos;
  }),

  // Update a todo (mark as completed)
  update: protectedProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const todo = await prisma.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
      return todo;
    }),

  // Delete a todo
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await prisma.todo.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});