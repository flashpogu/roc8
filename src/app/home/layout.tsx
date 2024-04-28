import React from "react";
import { verifySession } from "../dal";
import { redirect } from "next/navigation";

export default async function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const session = await verifySession();
  console.log(session);
  return <main>{session.userId ? children : redirect("/sign-in")}</main>;
}
