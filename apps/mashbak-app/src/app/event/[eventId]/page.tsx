import { FC } from "react";
import { Box, Container } from "@mui/material";

const EventPage: FC = () => {
  return (
    <Container>
      <Box>
        <Box
          sx={{
            maxWidth: 500,
            margin: "auto",
            textAlign: "center",
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <h1>Event Page</h1>
        </Box>
      </Box>
      <Box>Filter</Box>
      <Box>
        <h1>Event List</h1>
      </Box>
    </Container>
  );
};
export default EventPage;
