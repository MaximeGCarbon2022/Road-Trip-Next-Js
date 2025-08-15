import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { NavButton } from "../NavButton/NavButton";
import { FC } from "react";
import { logoutAction } from "@/features/auth/actions/Logout";

export const Header: FC = () => (
  <AppBar position="static" elevation={0}>
    <Toolbar sx={{ gap: 1 }}>
      <Typography variant="h6" sx={{ mr: 2 }}>
        RoadTrip Planner
      </Typography>

      <NavButton href="/countries" label="Pays" />
      <NavButton href="/road-trip" label="Mon roadTrip" />

      <Box sx={{ flex: 1 }} />

      <form action={logoutAction}>
        <Button type="submit" color="inherit">
          Se déconnecter
        </Button>
      </form>
    </Toolbar>
  </AppBar>
);
