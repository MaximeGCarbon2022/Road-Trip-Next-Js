import { cookies } from "next/headers";
import { ApiError } from "../apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function fetchData<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${API_URL}/api${endpoint}`, {
    cache: "no-store",
    ...options,
    headers: {
      ...(options?.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      credentials: "include",
    },
  });

  if (res.status === 404 || res.status === 204) {
    return { data: [], total: 0 } as T;
  }

  if (!res.ok) {
    let errorMessage = `Erreur API ${res.status} : ${res.statusText}`;

    try {
      const data = await res.json();
      if (data?.message) {
        errorMessage = data.message;
      }
    } catch (e) {
      console.warn("Impossible de parser la réponse en JSON :", e);
    }

    throw new ApiError(res.status, errorMessage);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
