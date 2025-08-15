import { Country } from "@/features/countries/interfaces/interface";

export const formatLanguages = (langs?: Record<string, string>) =>
  langs ? Object.values(langs).join(", ") : "—";

export const formatCurrencies = (curr?: Country["currencies"]) => {
  if (!curr) {
    return "—";
  }

  return Object.values(curr)
    .map((c) => (c.symbol ? `${c.name} (${c.symbol})` : c.name))
    .join(", ");
};
