import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifySession = () => {
  const cookie = cookies().get("token")?.value;
  console.log(cookie);
  const session = verifyJwt(cookie ?? "");

  if (!session) {
    redirect("/sign-in");
  }

  return { isAuth: true, userId: session };
};

const verifyJwt = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, "KLJIODJFIONIOFNIONEFION");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId: number = (decodedToken as JwtPayload).userId;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (userId) {
      return userId;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = () => {
  const session = verifySession();
  if (!session) return null;
  return session.userId;
};
