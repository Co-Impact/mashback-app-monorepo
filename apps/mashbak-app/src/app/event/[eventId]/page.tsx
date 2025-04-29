import { FC } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const EventPage: FC = () => {
  const data = {
    id: "1",
    name: "Event Name",
    image:
      "https://media.licdn.com/dms/image/v2/C561BAQE-51J-8KkMZg/company-background_10000/company-background_10000/0/1584559866970/eventscom_cover?e=2147483647&v=beta&t=3bktbE7ts5aNwH8XEUM5rW0G2aMbuQ1b2dHBVQgZqmA",
    date: "2023-10-01",
    location: "Location Name",
    subscription: 100,
  };
  const { name, image, date, location, subscription } = data;
  return (
    <Container sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar sx={{ width: 70, height: 70 }} src={image} alt={name} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
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
              label={subscription}
              color={"info"}
            />
          </Box>
        </Box>
      </Box>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
        this event requires registration
      </Alert>
      <Card
        sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 2 }}
      >
        <Typography>About</Typography>
        <Typography color={"textSecondary"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet.
        </Typography>
      </Card>
      <Card
        sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 2 }}
      >
        <Typography>Prepare</Typography>
        <Typography color={"textSecondary"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet.
        </Typography>
      </Card>
      <Box>
        <Button sx={{ width: "100%" }} variant={"contained"}>
          Register
        </Button>
      </Box>
    </Container>
  );
};
export default EventPage;
