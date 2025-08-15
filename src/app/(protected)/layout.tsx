import { requireAuth } from "@/lib/auth";
import { Header } from "@/shared/components/Header/Header";
import { Box, Container } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

const ProtectedLayout: FC<PropsWithChildren> = async ({ children }) => {
  await requireAuth();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          mt: 3,
          mb: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default ProtectedLayout;
