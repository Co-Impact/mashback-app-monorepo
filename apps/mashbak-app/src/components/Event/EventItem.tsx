import { FC } from "react";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import { hideOnMobileStyle } from "@/style/theme";

interface EventItemProps {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  registration: boolean;
  userNumber: number;
}
export const EventItem: FC<EventItemProps> = ({
  id,
  name,
  date,
  location,
  image,
  registration,
  userNumber,
}) => {
  return (
    <Box
      component={Link}
      href={`/event/${id}`}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "5px",
        margin: "4px 0",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Avatar src={image} />
        <Box>
          <Typography>{name}</Typography>
          <Typography color={"textSecondary"}>{location}</Typography>
        </Box>
        <Typography sx={{ ...hideOnMobileStyle, fontSize: "20px" }}>
          {date}
        </Typography>
        {registration && (
          <Chip
            sx={hideOnMobileStyle}
            icon={<InfoIcon />}
            color={"error"}
            label="register required"
          />
        )}
        <Chip
          size={"small"}
          icon={<PersonIcon />}
          color={"info"}
          label={userNumber}
        />
      </Box>
      <Box>
        <ArrowForwardIosIcon />
      </Box>
    </Box>
  );
};
