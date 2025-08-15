import { GridColDef } from "@mui/x-data-grid";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Country } from "../../interfaces/interface";

const actionButtonStyle = {
  color: "#90caf9",
  borderColor: "#90caf9",
};

export const getCountryColumns = (
  onAdd: (country: Country) => void,
  loadingCode: string | null,
  onView: (country: Country) => void,
): GridColDef[] => [
  {
    field: "name",
    headerName: "Nom du pays",
    flex: 1,
    sortable: true,
    renderCell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 1.5 }}>
        {row.flags?.png || row.flags?.svg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.flags.png ?? row.flags.svg!}
            alt={row.flags?.alt ?? row.name?.common ?? row.name?.official ?? "flag"}
            width={20}
            height={14}
            style={{ objectFit: "cover", borderRadius: 2 }}
          />
        ) : null}
        <Typography variant="body2">{row.name?.common ?? row.name?.official ?? "—"}</Typography>
      </Stack>
    ),
  },
  { field: "cca3", headerName: "Code", width: 100 },
  {
    field: "actions",
    headerName: "Actions",
    width: 220,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => (
      <Stack direction="row" spacing={2} pt={1}>
        <Button variant="outlined" size="small" sx={actionButtonStyle} onClick={() => onView(row)}>
          Voir
        </Button>

        <Button
          size="small"
          variant="outlined"
          sx={actionButtonStyle}
          onClick={() => onAdd(row)}
          disabled={loadingCode === row.cca3}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: "60px" }}>
            {loadingCode === row.cca3 ? <CircularProgress size={18} color="inherit" /> : "Ajouter"}
          </Stack>
        </Button>
      </Stack>
    ),
  },
];
