"use client";

import { FC } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  setPage: (val: number) => void;
};

export const CountryListToolbar: FC<Props> = ({ search, setSearch, setPage }) => (
  <TextField
    label="Rechercher un pays"
    variant="outlined"
    fullWidth
    margin="normal"
    value={search}
    onChange={(e) => {
      setPage(0);
      setSearch(e.target.value);
    }}
    slotProps={{
      input: {
        endAdornment: search ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => {
                setSearch("");
                setPage(0);
              }}
              edge="end"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      },
    }}
  />
);
