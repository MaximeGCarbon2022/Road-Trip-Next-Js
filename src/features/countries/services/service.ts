import { fetchData } from "@/lib/fetch/fetchData";
import { PaginatedResult } from "@/shared/interfaces/PaginatedResult";
import { Country } from "../interfaces/interface";

export const getCountries = async (
  page: number,
  pageSize: number,
): Promise<PaginatedResult<Country> | null> =>
  fetchData<PaginatedResult<Country>>(`/countries?page=${page}&pageSize=${pageSize}`);

export const getCountriesByName = async (
  name: string,
  page: number,
  pageSize: number,
): Promise<PaginatedResult<Country> | null> =>
  fetchData<PaginatedResult<Country>>(
    `/countries/name/${encodeURIComponent(name)}?page=${page}&pageSize=${pageSize}`,
  );

export const getCountryByCode = async (code: string) =>
  fetchData<Country>(`/countries/codes/${code}`);
