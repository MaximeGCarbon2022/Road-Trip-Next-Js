"use client";

import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { useToast } from "@/shared/hooks/useToast";
import { Box, Button, Link as MuiLink, Paper, Typography } from "@mui/material";
import NextLink from "next/link";
import { FC } from "react";
import { removeFromRoadTripAction } from "../../actions/removeFromRoadTrip";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog/ConfirmDialog";

type Props = { cca3: string };

export const RoadTripItem: FC<Props> = ({ cca3 }) => {
  const { showToast } = useToast();

  const onConfirm = async () => {
    const res = await removeFromRoadTripAction(cca3);

    if (res?.error) {
      showToast(res.error || "Erreur lors de la suppression", "error");
    } else {
      showToast(`${cca3} a été retiré du Road trip`, "success");
    }
  };

  const { open, isPending, openDialog, closeDialog, handleConfirm } = useConfirmDialog({
    onConfirm,
  });

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={600}>{cca3}</Typography>
          <MuiLink component={NextLink} href={`/countries/${cca3}`} underline="hover">
            Voir la fiche
          </MuiLink>
        </Box>

        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={openDialog}
          disabled={isPending}
        >
          Supprimer
        </Button>
      </Paper>

      <ConfirmDialog
        open={open}
        title="Supprimer ce pays ?"
        message={`Voulez-vous vraiment retirer ${cca3} de votre roadtrip ?`}
        isPending={isPending}
        onClose={closeDialog}
        onConfirm={handleConfirm}
      />
    </>
  );
};
