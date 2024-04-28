import { z } from "zod";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const LoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginRouter = createTRPCRouter({
  loggingUser: publicProcedure
    .input(LoginInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, password } = input;
        const user = await ctx.db.user.findUnique({ where: { email } });

        if (!user) {
          return { success: false, message: "Invalid Credentials" };
        } else if (!user.verified) {
          return { success: false, message: "Please verify the email first" };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return { success: false, message: "Invalid Credentials" };
        }

        return { success: true, message: "User Logged In" };
      } catch (error) {
        console.log(error);
      }
    }),
});
