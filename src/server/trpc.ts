// import { todoRouter } from "./routers/todo";
// import { router } from "../trpc";

// export const appRouter = router({
//   todo: todoRouter,
//   // Add other routers here
// });

// export type AppRouter = typeof appRouter;

import { initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.session) {
    throw new Error("Not authenticated");
  }
  return opts.next({
    ctx: {
      session: opts.ctx.session,
    },
  });
});