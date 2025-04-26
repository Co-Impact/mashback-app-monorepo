import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import Link from "next/link";

interface Props {
  label: string;
  path: string;
  children?: ReactNode;
  isRow?: boolean;
}
export const HomeCard: FC<Props> = ({ label, path, children, isRow }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <label>{label}</label>
        <Link href={path}>see more</Link>
      </Box>
      <Box sx={(isRow && { display: "flex", flexDirection: "row" }) || {}}>
        {children}
      </Box>
    </Box>
  );
};
