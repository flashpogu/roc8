import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

const AddProductInput = z.object({
  userId: z.number(),
  productId: z.number(),
});

export const getProductsRouter = createTRPCRouter({
  getAllProducts: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
      const { page } = input;
      const pageSize = 6;
      const skip = (page - 1) * pageSize;
      const allProducts = await ctx.db.products.findMany({
        skip,
        take: pageSize,
      });
      return allProducts;
    }),

  addProductToSelected: publicProcedure
    .input(AddProductInput)
    .query(async ({ ctx, input }) => {
      const { userId, productId } = input;

      const user = await ctx.db.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }

      const product = await ctx.db.products.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new Error("Product not found");
      }

      const updatedUser = await ctx.db.user.update({
        where: { id: userId },
        data: {
          products: {
            connect: [
              {
                id: productId,
              },
            ],
          },
        },
      });
      return updatedUser;
    }),

  addProductToDeselect: publicProcedure
    .input(AddProductInput)
    .query(async ({ ctx, input }) => {
      const { userId, productId } = input;

      const user = await ctx.db.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }

      const product = await ctx.db.products.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new Error("Product not found");
      }

      const updatedUser = await ctx.db.user.update({
        where: { id: userId },
        data: {
          products: {
            disconnect: [
              {
                id: productId,
              },
            ],
          },
        },
      });
      return updatedUser;
    }),
});
