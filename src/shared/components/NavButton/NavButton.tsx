"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";
import { FC } from "react";

type Props = {
  href: string;
  label: string;
};

export const NavButton: FC<Props> = ({ href, label }) => {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Button component={Link} href={href} variant={active ? "contained" : "text"} sx={{ mr: 1 }}>
      {label}
    </Button>
  );
};
