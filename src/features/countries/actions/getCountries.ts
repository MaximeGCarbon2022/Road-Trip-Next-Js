"use server";

import { fetchData } from "@/lib/fetch/fetchData";
import { PaginatedResult } from "@/shared/interfaces/PaginatedResult";
import { Country } from "../interfaces/interface";

export const getCountriesAction = async (
  page: number,
  pageSize: number,
): Promise<PaginatedResult<Country> | null> =>
  fetchData<PaginatedResult<Country>>(`/countries?page=${page}&pageSize=${pageSize}`);
