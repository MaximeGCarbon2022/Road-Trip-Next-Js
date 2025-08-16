import { createTheme } from "@mui/material/styles";
import "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1c1c1e",
      paper: "#252527",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c1c1e",
          border: "1px solid #333",
          color: "white",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #333",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#2b2b2d",
            color: "#ddd",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#2b2b2d",
            borderTop: "1px solid #333",
          },
          "& .MuiButtonBase-root": {
            color: "#90caf9",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:not([data-field='actions']):hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#252527",
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
