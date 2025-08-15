"use server";

import { redirect } from "next/navigation";
import { API_URL, setAuthCookie } from "../utils/utils";

export const loginAction = async (_: unknown, formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  let res: Response;

  try {
    res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  } catch (err) {
    console.error("Erreur réseau login:", err);
    return { error: "Impossible de se connecter au serveur" };
  }

  if (!res.ok) {
    return { error: "Identifiants incorrects" };
  }

  const json = await res.json();
  const token = json.accessToken ?? json.token;

  if (!token) {
    return { error: "Réponse API sans token" };
  }

  await setAuthCookie(token, 3600);

  redirect("/countries");
};
