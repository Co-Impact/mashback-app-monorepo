import { FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import { eventsItems } from "@/data/events";
import { EventTicket } from "@/components/Card/EventCard";

const Event: FC = () => {
  return (
    <Container>
      <Box>
        <Typography variant={"h3"}>Events</Typography>
      </Box>
      <Box>
        {eventsItems.map(({ name, date, location }, index) => (
          <EventTicket
            key={index}
            title={name}
            date={date}
            time="5:00 PM - 8:00 PM"
            location={location}
            ticketCode="MASH-2025-JD"
          />
        ))}
      </Box>
    </Container>
  );
};

export default Event;
