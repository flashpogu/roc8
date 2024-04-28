import React from "react";
import { api } from "~/trpc/server";

export default async function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await api.loginUser.authorizeUser();
  console.log(authData);

  return <main>{children}</main>;
}
