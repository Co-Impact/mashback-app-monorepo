import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";

interface MemberProps {
  name: string;
  position: string;
  profilePicture: string;
  path: string;
}
export const Member: FC<MemberProps> = ({
  name,
  profilePicture,
  path,
  position,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      component={Link}
      href={path}
    >
      <Box>
        <Avatar
          sx={{ width: 56, height: 56 }}
          src={profilePicture}
          alt={name}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography>{name}</Typography>
        <Typography>{position}</Typography>
      </Box>
    </Box>
  );
};
