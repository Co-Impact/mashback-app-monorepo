import { FC } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";
import Link from "next/link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";

interface Props {
  id: string;
  logo: string;
  positionName: string;
  companyName: string;
}
export const JobCard: FC<Props> = ({ id, logo, positionName, companyName }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "10px 0",
        padding: 1,
        gap: 1,
      }}
      component={Link}
      href={`/jobs/${id}`}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar src={logo} />
        <Box>
          <Typography>{positionName}</Typography>
          <Typography component={Link} href={`/company/${id}`}>
            {companyName}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        component={Link}
        href={id}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MoreHorizIcon />
      </Box>
    </Card>
  );
};
