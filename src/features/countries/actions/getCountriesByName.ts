"use server";

import { PaginatedResult } from "@/shared/interfaces/PaginatedResult";
import { Country } from "../interfaces/interface";
import { fetchData } from "@/lib/fetch/fetchData";

export const getCountriesByNameAction = async (
  name: string,
  page: number,
  pageSize: number,
): Promise<PaginatedResult<Country> | null> =>
  fetchData<PaginatedResult<Country>>(
    `/countries/name/${encodeURIComponent(name)}?page=${page}&pageSize=${pageSize}`,
  );
