import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface MemberProps {
  name: string;
  position: string;
  company: string;
  profilePicture: string;
  path: string;
}
export const MemberItem: FC<MemberProps> = ({
  name,
  position,
  company,
  profilePicture,
  path,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "5px",
        margin: "4px 0",
        gap: 2,
      }}
      component={Link}
      href={path}
    >
      <Avatar sx={{ width: 50, height: 50 }} src={profilePicture} alt={name} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <Typography>{name}</Typography>
          <Typography>
            {position} | {company}
          </Typography>
        </Box>
        <Box>
          <ArrowForwardIosIcon />
        </Box>
      </Box>
    </Box>
  );
};
