"use client";

import { addToRoadTripCodeAction } from "@/features/roadtrip/actions/addToRoadTripCode";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { getCountriesAction } from "../actions/getCountries";
import { getCountriesByNameAction } from "../actions/getCountriesByName";
import { Country } from "../interfaces/interface";
import { useToast } from "@/shared/hooks/toast/useToast";

export const useCountryList = (
  initialRows: Country[],
  initialTotalCount: number,
  initialPage: number,
  initialPageSize: number,
  initialSearch: string,
) => {
  const router = useRouter();
  const { showToast } = useToast();

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [rowCount, setRowCount] = useState(initialTotalCount);
  const [rows, setRows] = useState<Country[]>(initialRows);
  const [loadingCode, setLoadingCode] = useState<string | null>(null);
  const [isLoadingGrid, setIsLoadingGrid] = useState(false);
  const [isLoadingRedirect, setIsLoadingRedirect] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 500);

  const fetchCountries = useCallback(async () => {
    if (debouncedSearch.length > 0 && debouncedSearch.length < 3) return;
    setIsLoadingGrid(true);
    try {
      const data = debouncedSearch.trim()
        ? await getCountriesByNameAction(debouncedSearch.trim(), page + 1, pageSize)
        : await getCountriesAction(page + 1, pageSize);
      setRows(data?.data ?? []);
      setRowCount(data?.total ?? 0);
    } catch {
      showToast("Erreur lors du chargement des pays", "error");
    } finally {
      setIsLoadingGrid(false);
    }
  }, [debouncedSearch, page, pageSize, showToast]);

  useEffect(() => {
    const isInitial =
      page === initialPage && pageSize === initialPageSize && debouncedSearch === initialSearch;
    if (isInitial) return;
    const params = new URLSearchParams();
    if (page) params.set("page", String(page));
    if (pageSize) params.set("pageSize", String(pageSize));
    if (search) params.set("name", search);
    router.replace(`/countries?${params.toString()}`);
    fetchCountries();
  }, [
    page,
    pageSize,
    debouncedSearch,
    search,
    initialPage,
    initialPageSize,
    initialSearch,
    fetchCountries,
    router,
  ]);

  const handleAddToRoadTrip = useCallback(
    async (country: Country) => {
      setLoadingCode(country.cca3);
      try {
        const res = await addToRoadTripCodeAction(country.cca3);
        if (!res.success) {
          if (res.status === 409) {
            showToast(`${country.name.common} est déjà dans votre Road Trip`, "warning");
          } else {
            showToast(res.error, "error");
          }
        } else {
          showToast(`${country.name.common} a été ajouté au Road Trip`, "success");
        }
      } catch {
        showToast("Erreur lors de l'ajout au Road Trip", "error");
      } finally {
        setLoadingCode(null);
      }
    },
    [showToast],
  );

  const handleView = useCallback(
    (country: Country) => {
      setIsLoadingRedirect(true);
      router.push(`/countries/${country.cca3}`);
    },
    [router],
  );

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    rowCount,
    rows,
    search,
    setSearch,
    loadingCode,
    isLoadingGrid,
    isLoadingRedirect,
    handleAddToRoadTrip,
    handleView,
  };
};
