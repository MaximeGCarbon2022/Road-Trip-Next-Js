import type { FC, PropsWithChildren } from "react";
import "./global.module.scss";
import AppProviders from "./AppProviders";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="fr">
    <body>
      <AppProviders>{children}</AppProviders>
    </body>
  </html>
);

export default RootLayout;
