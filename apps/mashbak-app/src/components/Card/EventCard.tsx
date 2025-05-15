import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { FC } from "react";

type Props = {
  title: string;
  date: string;
  time: string;
  location: string;
  ticketCode: string;
};

export const EventTicket: FC<Props> = ({
  title,
  date,
  time,
  location,
  ticketCode,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 500,
        mx: "auto",
        borderRadius: 4,
        borderColor: "#ccc",
        margin: "10px 0",
        boxShadow: 3,
        backgroundImage: "linear-gradient(to right, #f7f7f7, #ffffff)",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {title}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <EventIcon sx={{ mr: 1 }} />
          <Typography variant="body1">{date}</Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="body1">{time}</Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <PlaceIcon sx={{ mr: 1 }} />
          <Typography variant="body1">{location}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <ConfirmationNumberIcon sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={500}>
              Ticket Code
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={700}>
            {ticketCode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
