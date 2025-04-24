import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  id: string;
  avatar: string;
  name: string;
  date: string;
}
export const EventCard: FC<Props> = ({ id, date, name, avatar }) => {
  return (
    <Box>
      <Avatar src={avatar} />
      <Box>
        <Typography>{name}</Typography>
        <Typography>{date}</Typography>
      </Box>
      <Link href={id}>More Details</Link>
    </Box>
  );
};
