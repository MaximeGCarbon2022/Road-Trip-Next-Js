import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const requireAuth = async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch {
    redirect("/login");
  }
};
