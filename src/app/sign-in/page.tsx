"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";

type UserType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const logginRegAndVerifiedUser = api.loginUser.loggingUser.useMutation();
  const { register, handleSubmit } = useForm<UserType>();
  const router = useRouter();
  const onSubmit: SubmitHandler<UserType> = (data) => {
    if (data) {
      logginRegAndVerifiedUser.mutate(data);
      router.push("/");
    }
  };
  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-[42vw] rounded-xl border border-gray-300 px-8 pb-28 pt-10">
        <div className="flex flex-col items-center gap-4">
          <h2 className="py-4 text-center text-3xl font-semibold">Login</h2>
          <p className="text-2xl font-semibold">Welcome back to ECOMMERCE</p>
          <p className="text-lg ">The next gen business marketplace</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <label className="flex-1 font-semibold text-gray-700">
            Email
            <input
              className="mt-2 w-full rounded border px-3 py-2 font-normal text-gray-700"
              type="email"
              placeholder="Enter"
              {...register("email")}
            />
          </label>
          <label className="flex-1 font-semibold text-gray-700">
            Password
            <input
              className="mt-2 w-full rounded border px-3 py-2 font-normal text-gray-700"
              type="password"
              placeholder="Enter"
              {...register("password")}
            />
          </label>
          <button className="rounded-lg bg-black py-3 text-white hover:bg-gray-600">
            LOGIN
          </button>
          <p className="text-center">
            Don’t have an Account?{" "}
            <Link href="/sign-up" className="font-bold">
              LOGIN
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
