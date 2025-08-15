"use client";

import { useActionState } from "react";
import { TextField, Container, Paper, Typography, Box } from "@mui/material";
import { loginAction } from "../../actions/Login";
import { FormActions } from "@/shared/components/FormActions/FormActions";

const initialState: { error?: string } = { error: undefined };

export const LoginForm = () => {
  const [state, formAction] = useActionState<{ error?: string }, FormData>(
    loginAction,
    initialState,
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Connexion
        </Typography>

        <Box component="form" action={formAction}>
          <TextField
            name="username"
            label="Email"
            fullWidth
            required
            autoComplete="username"
            margin="normal"
          />
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            fullWidth
            required
            autoComplete="current-password"
            margin="normal"
          />

          <FormActions error={state.error} submitLabel="Se connecter" loadingLabel="Connexion..." />
        </Box>
      </Paper>
    </Container>
  );
};
