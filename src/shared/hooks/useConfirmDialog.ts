import { useState, useCallback } from "react";

type Props = {
  onConfirm: () => Promise<void> | void;
};

type UseConfirmDialogReturn = {
  open: boolean;
  isPending: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  handleConfirm: () => Promise<void>;
};

export const useConfirmDialog = ({ onConfirm }: Props): UseConfirmDialogReturn => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  const handleConfirm = useCallback(async () => {
    setIsPending(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setIsPending(false);
    }
  }, [onConfirm]);

  return {
    open,
    isPending,
    openDialog,
    closeDialog,
    handleConfirm,
  };
};
