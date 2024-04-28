import { postRouter } from "~/server/api/routers/post";
import { registerRouter } from "~/server/api/routers/register";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { verifyOTPRouter } from "~/server/api/routers/verifyOtp";
import { loginRouter } from "~/server/api/routers/login";
import { getProductsRouter } from "~/server/api/routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  registerUser: registerRouter,
  verifyOtp: verifyOTPRouter,
  loginUser: loginRouter,
  get: getProductsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
