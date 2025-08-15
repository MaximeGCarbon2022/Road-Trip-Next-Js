"use server";

import { ApiError } from "@/lib/apiError";
import { addRoadTripCountry } from "../services/service";
import { ActionState } from "@/shared/interfaces/ActionState";

export const addToRoadTripCodeAction = async (code: string): Promise<ActionState> => {
  try {
    await addRoadTripCountry(code);
    return { success: true };
  } catch (err: unknown) {
    if (err instanceof ApiError && err.status === 409) {
      return { success: false, error: "Ce pays est déjà dans le road trip" };
    }

    if (err instanceof Error) {
      return { success: false, error: err.message };
    }

    return { success: false, error: "Erreur inconnue" };
  }
};
