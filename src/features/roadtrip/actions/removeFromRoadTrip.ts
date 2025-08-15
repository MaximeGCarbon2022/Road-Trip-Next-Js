"use server";

import { revalidatePath } from "next/cache";
import { deleteRoadTripCountry } from "../services/service";

export const removeFromRoadTripAction = async (code: string) => {
  if (!code) {
    return { success: false, error: "Code du pays manquant" };
  }

  try {
    await deleteRoadTripCountry(code);
    revalidatePath("/roadTrip");
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Erreur lors de la suppression" };
  }
};
