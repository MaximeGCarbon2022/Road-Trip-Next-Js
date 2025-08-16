"use client";

import { ToastProvider } from "@/shared/components/ToastProvider/ToastProvider";
import theme from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { FC, PropsWithChildren } from "react";

const AppProviders: FC<PropsWithChildren> = ({ children }) => (
  <AppRouterCacheProvider options={{ enableCssLayer: true }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  </AppRouterCacheProvider>
);

export default AppProviders;
