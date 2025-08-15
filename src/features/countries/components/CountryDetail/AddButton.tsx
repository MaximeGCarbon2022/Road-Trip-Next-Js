"use client";

import { addToRoadTripCodeAction } from "@/features/roadtrip/actions/addToRoadTripCode";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { FC, useState, useTransition } from "react";

type Props = {
  code: string;
};

export const AddButton: FC<Props> = ({ code }) => {
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    startTransition(async () => {
      const res = await addToRoadTripCodeAction(code);

      if (res?.error) {
        setSeverity("error");
        setMessage(res.error);
      } else {
        setSeverity("success");
        setMessage(`${code} ajouté au roadTrip`);
      }

      setOpen(true);
    });
  };

  return (
    <>
      <Button onClick={handleAdd} variant="contained" disabled={isPending} sx={{ minWidth: 200 }}>
        {isPending ? <CircularProgress size={20} color="inherit" /> : "Ajouter au road Trip"}
      </Button>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity={severity} variant="filled" onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
