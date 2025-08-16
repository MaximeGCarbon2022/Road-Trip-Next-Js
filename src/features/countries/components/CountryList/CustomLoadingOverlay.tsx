import { GridOverlay } from "@mui/x-data-grid";
import { CircularProgress, Box } from "@mui/material";

export const CustomLoadingOverlay = () => (
  <GridOverlay
    sx={{
      backgroundColor: "rgba(0,0,0,0.6)",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress size={40} sx={{ color: "#90caf9" }} />
    </Box>
  </GridOverlay>
);
