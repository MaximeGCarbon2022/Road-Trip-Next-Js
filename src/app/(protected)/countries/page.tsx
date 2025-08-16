import { CountryList } from "@/features/countries/components/CountryList/CountryList";
import { getCountriesByName, getCountries } from "@/features/countries/services/service";
import { FC } from "react";

interface Props {
  searchParams: Promise<{ page?: string; pageSize?: string; name?: string }>;
}

const CountriesPage: FC<Props> = async ({ searchParams }) => {
  const { page = "0", pageSize = "25", name = "" } = await searchParams;

  const initialPage = parseInt(page, 10);
  const initialPageSize = parseInt(pageSize, 10);
  const initialSearch = name;

  const data = initialSearch.trim()
    ? await getCountriesByName(initialSearch, initialPage + 1, initialPageSize)
    : await getCountries(initialPage + 1, initialPageSize);

  return (
    <CountryList
      initialRows={data?.data ?? []}
      initialTotalCount={data?.total ?? 0}
      initialPage={initialPage}
      initialPageSize={initialPageSize}
      initialSearch={initialSearch}
    />
  );
};

export default CountriesPage;
