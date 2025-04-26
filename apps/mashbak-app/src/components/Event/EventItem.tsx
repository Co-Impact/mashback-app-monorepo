import { FC } from "react";
import { Avatar, Box, Chip, Typography } from "@mui/material";

interface EventItemProps {
  name: string;
  date: string;
  location: string;
  image: string;
  registration: boolean;
}
export const EventItem: FC<EventItemProps> = ({
  name,
  date,
  location,
  image,
  registration,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Avatar src={image} />
      <Box>
        <Typography>{name}</Typography>
        <Typography>
          {date} | {location}
        </Typography>
      </Box>
      {registration && <Chip label="need to regestrin" />}
    </Box>
  );
};
