import { FC } from "react";
import { Box } from "@mui/material";
import Link from "next/link";

interface Props {
  label: string;
  path: string;
}
export const HomeCard: FC<Props> = ({ label, path }) => {
  return (
    <Box>
      <Box>
        <label>{label}</label>
        <Link href={path}>see more</Link>
      </Box>
      <Box>content</Box>
    </Box>
  );
};
