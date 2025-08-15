"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import { Alert, Button, Stack } from "@mui/material";

type Props = {
  error?: string;
  submitLabel: string;
  loadingLabel?: string;
};

export const FormActions: FC<Props> = ({ error, submitLabel, loadingLabel }) => {
  const { pending } = useFormStatus();

  return (
    <Stack spacing={2} mt={2}>
      {error && <Alert severity="error">{error}</Alert>}

      <Button type="submit" variant="contained" fullWidth disabled={pending}>
        {pending ? (loadingLabel ?? submitLabel) : submitLabel}
      </Button>
    </Stack>
  );
};
