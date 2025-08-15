import { Stack, Typography } from "@mui/material";
import { RoadTripItem } from "../roadTripItem/RoadTripItem";
import { FC } from "react";
import { OrderedCountry } from "../../interfaces/interface";

type Props = {
  countries: OrderedCountry[];
};

export const RoadTripView: FC<Props> = ({ countries }) => {
  if (!countries.length) {
    return <Typography color="text.secondary">Aucun pays pour le moment.</Typography>;
  }

  return (
    <Stack spacing={1.5}>
      {countries.map((country) => (
        <RoadTripItem key={country.cca3} cca3={country.cca3} />
      ))}
    </Stack>
  );
};
