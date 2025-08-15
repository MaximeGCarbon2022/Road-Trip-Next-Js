"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { FC, ReactNode } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: ReactNode;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  isPending,
  onClose,
  onConfirm,
}) => (
  <Dialog open={open} onClose={!isPending ? onClose : undefined}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isPending} autoFocus>
        Annuler
      </Button>
      <Button
        onClick={onConfirm}
        color="primary"
        variant="contained"
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? <CircularProgress size={20} color="inherit" /> : "Confirmer"}
      </Button>
    </DialogActions>
  </Dialog>
);
