import { z } from "zod";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const verifyOtpInput = z.object({
  email: z.string(),
  otp: z.string(),
});
export const verifyOTPRouter = createTRPCRouter({
  verifyOtpProcedure: publicProcedure
    .input(verifyOtpInput)
    .mutation(async ({ ctx, input }) => {
      const { email, otp } = input;

      const userOTPVerifyRec = await ctx.db.oTPVerify.findFirst({
        where: { email },
      });

      if (!userOTPVerifyRec) {
        throw new Error(
          "Account record does'nt exists or has been already verified. Please Register or Login",
        );
      }

      const { expiresAt, otp: hashedOTP } = userOTPVerifyRec;

      if (expiresAt.getTime() < Date.now()) {
        await ctx.db.oTPVerify.deleteMany({
          where: { email },
        });
        throw new Error("Code has expired. PLease request again");
      }

      const validOTP = await bcrypt.compare(otp, hashedOTP);

      if (!validOTP) {
        throw new Error("Invalid OTP");
      }

      await ctx.db.user.update({
        where: { email },
        data: {
          verified: true,
        },
      });
    }),
});
