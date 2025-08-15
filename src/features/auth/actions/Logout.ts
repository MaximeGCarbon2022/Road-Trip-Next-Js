"use server";

import { redirect } from "next/navigation";
import { API_URL, setAuthCookie } from "../utils/utils";
import { cookies } from "next/headers";

export const logoutAction = async () => {
  const jar = await cookies();
  const token = jar.get("token")?.value;

  try {
    if (token) {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (err) {
    console.error("Erreur réseau logout:", err);
  }

  await setAuthCookie("", 0);

  redirect("/login");
};
