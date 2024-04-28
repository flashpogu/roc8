"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import OTPInput from "../../_components/OTPInput";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VerifyEmai() {
  const router = useRouter();
  const pathname = usePathname();
  const emailFromRoute = pathname.split("/")[2];
  const verifyOTPToValidateEmail =
    api.verifyOtp.verifyOtpProcedure.useMutation();
  const [otp, setOtp] = useState<string>("");
  const onChange = (value: string) => setOtp(value);
  return (
    <div className="flex items-center justify-center py-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          verifyOTPToValidateEmail.mutate({ otp, email: emailFromRoute ?? "" });
          router.push("/sign-in");
        }}
        className="flex w-[42vw] flex-col items-center justify-center gap-9 rounded-xl border border-gray-300 px-8 pb-28 pt-7"
      >
        <h2 className="py-4 text-center text-3xl font-semibold">
          Verify your email
        </h2>
        <p className="w-[60%] text-center">
          Enter the 8 digit code you have received on swa***@gmail.com
        </p>
        <OTPInput value={otp} valueLength={8} onChange={onChange} />
        <button
          type="submit"
          className="w-full rounded-lg bg-black py-3 text-white hover:bg-gray-600"
        >
          VERIFY
        </button>
      </form>
    </div>
  );
}
