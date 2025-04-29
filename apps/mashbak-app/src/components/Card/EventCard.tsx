import { FC } from "react";
import { Avatar, Box, Card, Chip, Typography } from "@mui/material";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";

interface Props {
  id: string;
  avatar: string;
  name: string;
  date: string;
  location: string;
  count?: number;
}
export const EventCard: FC<Props> = ({
  id,
  date,
  name,
  avatar,
  location,
  count,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        padding: 1,
        margin: "5px 0",
      }}
      component={Link}
      href={`/event/${id}`}
    >
      <Avatar src={avatar} sx={{ width: 50, height: 50 }} />
      <Box>
        <Typography>{name}</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            size={"small"}
            icon={<EventIcon />}
            label={date}
            color={"info"}
          />
          <Chip
            size={"small"}
            icon={<LocationOnIcon />}
            label={location}
            color={"info"}
          />
          <Chip
            size={"small"}
            icon={<PersonIcon />}
            label={count}
            color={"info"}
          />
        </Box>
      </Box>
    </Card>
  );
};
