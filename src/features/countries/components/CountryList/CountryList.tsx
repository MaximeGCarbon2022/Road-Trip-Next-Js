"use client";

import { Paper, Typography, Box } from "@mui/material";
import { FC, useMemo } from "react";
import { getCountryColumns } from "./CountryColumns";
import { CustomLoadingOverlay } from "./CustomLoadingOverlay";
import { CountryListToolbar } from "./CountryListToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { Country } from "../../interfaces/interface";
import { useCountryList } from "../../hooks/useCountryList";

type Props = {
  initialRows: Country[];
  initialTotalCount: number;
  initialPage: number;
  initialPageSize: number;
  initialSearch: string;
};

export const CountryList: FC<Props> = ({
  initialRows,
  initialTotalCount,
  initialPage,
  initialPageSize,
  initialSearch,
}) => {
  const state = useCountryList(
    initialRows,
    initialTotalCount,
    initialPage,
    initialPageSize,
    initialSearch,
  );

  const columns = useMemo(
    () => getCountryColumns(state.handleAddToRoadTrip, state.loadingCode, state.handleView),
    [state.handleAddToRoadTrip, state.loadingCode, state.handleView],
  );

  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: "background.paper",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Liste des pays
      </Typography>
      <CountryListToolbar
        search={state.search}
        setSearch={state.setSearch}
        setPage={state.setPage}
      />
      <Box sx={{ height: "calc(100vh - 300px)", width: "100%" }}>
        <DataGrid
          rows={state.rows}
          columns={columns}
          getRowId={(row) => row.cca3}
          loading={state.isLoadingGrid || state.isLoadingRedirect}
          rowCount={state.rowCount}
          paginationMode="server"
          paginationModel={{ page: state.page, pageSize: state.pageSize }}
          onPaginationModelChange={(model) => {
            state.setPage(model.page);
            state.setPageSize(model.pageSize);
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          localeText={{
            noRowsLabel: "Aucun pays trouvé",
            noResultsOverlayLabel: "Aucun résultat",
            paginationRowsPerPage: "Lignes par page :",
          }}
          slots={{ loadingOverlay: CustomLoadingOverlay }}
        />
      </Box>
    </Paper>
  );
};
