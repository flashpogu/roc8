/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const RegisterInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

// NODEMAILER

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  auth: {
    user: "mathilde.herman14@ethereal.email",
    pass: "6xYk4dYKcqYsW2cf5n",
  },
});

export const registerRouter = createTRPCRouter({
  createNewUser: publicProcedure
    .input(RegisterInput)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;
      try {
        const existingUser = await ctx.db.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          return { success: false, message: "User already exists" };
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const hashedPassword: string = await bcrypt.hash(password, 8);
        await ctx.db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            verified: false,
          },
        });
        try {
          const otp = `${Math.floor(10000000 + Math.random() * 90000000)}`;

          // Mail options
          const mailOptions = {
            from: "mathilde.herman14@ethereal.email",
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> to verify your email address`,
          };

          // Hash the OTP
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const hashedOTP: string = await bcrypt.hash(otp, 8);

          // Save to db

          const userTosendOTP = await ctx.db.user.findUnique({
            where: { email },
          });
          await ctx.db.oTPVerify.create({
            data: {
              userId: userTosendOTP?.id ?? 5000,
              otp: hashedOTP,
              email,
              createdAt: new Date(),
              expiresAt: new Date(Date.now() + 3600000), // Expires in 1 hour
            },
          });

          // send email
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          await transporter.sendMail(mailOptions);
        } catch (error) {}
      } catch (error) {
        console.log(error);
      }
    }),
});
