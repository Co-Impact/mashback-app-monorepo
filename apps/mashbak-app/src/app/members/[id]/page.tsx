import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import { FC } from "react";

const Member: FC = () => {
  const data = {
    id: "1",
    name: "Member Name",
    image:
      "https://media.licdn.com/dms/image/D4E03AQF5gk2v0x3m8A/profile-displayphoto-shrink_800_800/0/1695221231234?e=2147483647&v=beta&t=3bktbE7ts5aNwH8XEUM5rW0G2aMbuQ1b2dHBVQgZqmA",
    date: "2023-10-01",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    education: [
      {
        university: "University Name",
        degree: "Degree Name",
        year: "2023",
      },
    ],
    experience: [
      {
        company: "Company Name",
        position: "Position Name",
        year: "2023",
      },
    ],
  };
  const { name, image, experience } = data;
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          padding: 2,
        }}
      >
        <Avatar sx={{ width: 100, height: 100 }} src={image} alt={name} />
        <Typography>{name}</Typography>
        <Chip label={experience[experience.length - 1].position} />
      </Box>
      <Button sx={{ width: "100%" }} variant={"contained"}>
        Book A coffee
      </Button>{" "}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "10px 0",
          gap: 2,
          padding: 2,
        }}
      >
        <Typography variant={"body2"}>About</Typography>
        <Typography color={"textSecondary"}>{data.about}</Typography>
      </Card>
    </Container>
  );
};

export default Member;
