"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type UserType = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const registerNewUser = api.registerUser.createNewUser.useMutation();
  const { register, handleSubmit } = useForm<UserType>();
  const router = useRouter();
  const onSubmit: SubmitHandler<UserType> = (data) => {
    if (data) {
      registerNewUser.mutate(data);
      router.push(`/verifyOTP/${data.email}`);
    }
  };
  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-[42vw] rounded-xl border border-gray-300 px-8 pb-28 pt-10">
        <h2 className="py-4 text-center text-3xl font-semibold">
          Create your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <label className="flex-1 font-semibold text-gray-700">
            Name
            <input
              {...register("name")}
              className="mt-2 w-full rounded border px-3 py-2 font-normal text-gray-700"
              type="text"
              placeholder="Enter"
            />
          </label>
          <label className="flex-1 font-semibold text-gray-700">
            Email
            <input
              {...register("email")}
              className="mt-2 w-full rounded border px-3 py-2 font-normal text-gray-700"
              type="email"
              placeholder="Enter"
            />
          </label>
          <label className="flex-1 font-semibold text-gray-700">
            Password
            <input
              {...register("password")}
              className="mt-2 w-full rounded border px-3 py-2 font-normal text-gray-700"
              type="password"
              placeholder="Enter"
            />
          </label>
          <button className="rounded-lg bg-black py-3 text-white hover:bg-gray-600">
            CREATE ACCOUNT
          </button>
          <p className="text-center">
            Have an Account?{" "}
            <Link href="/sign-in" className="font-bold">
              SIGN UP
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
