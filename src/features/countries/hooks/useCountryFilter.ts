import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { Country } from "../interfaces/interface";

export const useCountryFilter = (initialCountries: Country[] = []) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const rows = useMemo(() => {
    return initialCountries.filter((country) =>
      country.name.common.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, initialCountries]);

  return { search, setSearch, rows };
};
