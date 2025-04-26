import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";

interface JobItemProps {
  logo: string;
  position: string;
  company: string;
  path: string;
  isSubmitted?: boolean;
}
export const JobItem: FC<JobItemProps> = ({
  logo,
  position,
  company,
  path,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      component={Link}
      href={path}
    >
      <Avatar src={logo} />
      <Box>
        <Typography>{position}</Typography>
        <Typography>{company}</Typography>
      </Box>
    </Box>
  );
};
