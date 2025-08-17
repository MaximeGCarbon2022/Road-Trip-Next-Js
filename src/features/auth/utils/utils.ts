import { cookies } from "next/headers";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const setAuthCookie = async (token: string, maxAge: number) => {
  const jar = await cookies();
  jar.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
};
