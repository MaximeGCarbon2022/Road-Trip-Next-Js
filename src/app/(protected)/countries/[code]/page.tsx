import { CountryDetail } from "@/features/countries/components/CountryDetail/CountryDetail";
import { getCountryByCode } from "@/features/countries/services/service";
import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import { FC } from "react";

type Props = {
  params: Promise<{ code: string }>;
};

const CountryDetailPage: FC<Props> = async ({ params }) => {
  const { code } = await params;
  const country = await getCountryByCode(code);

  if (!country) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <CountryDetail country={country} />
    </Container>
  );
};

export default CountryDetailPage;
