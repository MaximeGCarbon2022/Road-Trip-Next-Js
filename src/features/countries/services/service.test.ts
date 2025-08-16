import { fetchData } from "@/lib/fetch/fetchData";
import type { PaginatedResult } from "@/shared/interfaces/PaginatedResult";
import type { Country } from "../interfaces/interface";
import { getCountries, getCountriesByName, getCountryByCode } from "./service";

jest.mock("@/lib/fetch/fetchData", () => ({
  fetchData: jest.fn(),
}));

const mockedFetchData = fetchData as jest.Mock;

describe("countries service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchData with correct URL for getCountries", async () => {
    const mockResponse: PaginatedResult<Country> = {
      data: [{ cca3: "FRA", name: { common: "France" } } as Country],
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    };
    mockedFetchData.mockResolvedValue(mockResponse);

    const result = await getCountries(1, 10);

    expect(mockedFetchData).toHaveBeenCalledWith("/countries?page=1&pageSize=10");
    expect(result).toEqual(mockResponse);
  });

  it("should call fetchData with correct URL for getCountriesByName", async () => {
    const mockResponse: PaginatedResult<Country> = {
      data: [{ cca3: "ESP", name: { common: "Spain" } } as Country],
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    };
    mockedFetchData.mockResolvedValue(mockResponse);

    const result = await getCountriesByName("Spain", 2, 20);

    expect(mockedFetchData).toHaveBeenCalledWith("/countries/name/Spain?page=2&pageSize=20");
    expect(result).toEqual(mockResponse);
  });

  it("should call fetchData with correct URL for getCountryByCode", async () => {
    const mockResponse: Country = { cca3: "ITA", name: { common: "Italy" } } as Country;
    mockedFetchData.mockResolvedValue(mockResponse);

    const result = await getCountryByCode("ITA");

    expect(mockedFetchData).toHaveBeenCalledWith("/countries/codes/ITA");
    expect(result).toEqual(mockResponse);
  });
});
