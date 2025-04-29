import { FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import { eventsItems } from "@/data/events";
import { EventCard } from "@/components/Card/EventCard";

const Event: FC = () => {
  return (
    <Container>
      <Box>
        <Typography variant={"h3"}>Events</Typography>
      </Box>
      <Box>
        {eventsItems.map(
          ({ id, name, image, date, location, subscription }, index) => (
            <EventCard
              location={location}
              key={index}
              id={id}
              avatar={image}
              name={name}
              date={date}
              count={subscription}
            />
          ),
        )}
      </Box>
    </Container>
  );
};

export default Event;
