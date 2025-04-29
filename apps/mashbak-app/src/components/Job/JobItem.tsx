import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
        justifyContent: "space-between",
      }}
      component={Link}
      href={path}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Avatar src={logo} />
        <Box>
          <Typography sx={{ fontSize: "20px" }}>{position}</Typography>
          <Typography color={"textSecondary"}>{company}</Typography>
        </Box>
      </Box>
      <Box>
        <ArrowForwardIosIcon />
      </Box>
    </Box>
  );
};
