import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const getProductsRouter = createTRPCRouter({
  getAllProducts: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const { page } = input;
      const pageSize = 6;
      const skip = (page - 1) * pageSize;

      const allProducts = await ctx.db.ecommerceProducts.findMany({
        skip,
        take: pageSize,
      });
      return allProducts;
    }),
});
