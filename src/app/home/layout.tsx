import React from "react";
import { verifySession } from "../dal";
import { redirect } from "next/navigation";
// import { useAuthStore } from "~/store";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const session = verifySession();

  // const updateUserID = useAuthStore((state) => state.setUserID);
  // if (session.userId) {
  //   updateUserID(session.userId);
  // }
  return <main>{session.userId ? children : redirect("/sign-in")}</main>;
}
