import {
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { Country } from "../../interfaces/interface";
import { AddButton } from "./AddButton";
import { formatCurrencies, formatLanguages } from "./utils/formatters";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = { country: Country };

export const CountryDetail: FC<Props> = ({ country }) => {
  const { cca3, name, capital, region, continents, borders, languages, currencies, flags } =
    country;

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <IconButton component={Link} href="/countries" aria-label="Retour">
          <ArrowBackIcon />
        </IconButton>

        {flags?.png || flags?.svg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={flags.png ?? flags.svg!}
            alt={flags.alt ?? `Drapeau de ${name.common}`}
            width={40}
            height={28}
            style={{ objectFit: "cover", borderRadius: 2 }}
          />
        ) : null}

        <Box>
          <Typography variant="h4">
            {name.common}{" "}
            <Typography component="span" variant="h6" color="text.secondary">
              ({cca3})
            </Typography>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {name.official}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />
        <AddButton code={cca3} />
      </Stack>

      <Divider sx={{ my: 3 }} />

      <List>
        <ListItem>
          <ListItemText primary="Capitale(s)" secondary={capital?.join(", ") || "—"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Région" secondary={region || "—"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Continent(s)" secondary={continents?.join(", ") || "—"} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Langue(s)" secondary={formatLanguages(languages)} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Monnaie(s)" secondary={formatCurrencies(currencies)} />
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Pays voisins
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {borders?.length ? (
          borders.map((code) => (
            <Chip
              key={code}
              label={code}
              component={Link}
              href={`/countries/${code}`}
              clickable
              aria-label={`Voir les détails du pays ${code}`}
            />
          ))
        ) : (
          <Typography color="text.secondary">Aucun</Typography>
        )}
      </Stack>
    </Paper>
  );
};
