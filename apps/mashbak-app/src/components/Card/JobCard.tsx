import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  id: string;
  logo: string;
  positionName: string;
  companyName: string;
}
export const JobCard: FC<Props> = ({ id, logo, positionName, companyName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      component={Link}
      href={`/jobs/${id}`}
    >
      <Avatar src={logo} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>{positionName}</Typography>
        <Typography component={Link} href={`/company/${id}`}>
          {companyName}
        </Typography>
      </Box>
      <Link href={id}>More Details</Link>
    </Box>
  );
};
