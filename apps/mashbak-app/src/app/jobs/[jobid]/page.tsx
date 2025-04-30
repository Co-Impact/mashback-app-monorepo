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
import Divider from "@mui/material/Divider";

interface JobProps {
  id: string;
  name: string;
  description: string;
  location: string;
  salary: string;
  company: string;
  companyLogo: string;
  companyUrl: string;
  tags: string[];
  skills: string[];
  requirements: string[];
  applyUrl: string;
}

const Job: FC = () => {
  const JobData: Partial<JobProps> = {
    id: "fdgdfgsdfgs",
    name: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    location: "Remote",
    salary: "$70,000 - $90,000 per year",
    company: "TechCorp",
    companyLogo: "https://example.com/logo.png",
    companyUrl: "https://techcorp.com",
    tags: ["frontend", "react", "javascript"],
    skills: ["React", "TypeScript", "CSS", "Tailwind CSS"],
    requirements: [
      "3+ years of experience in frontend development",
      "Proficiency in React and TypeScript",
      "Experience with state management libraries like Redux or Zustand",
    ],
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ width: 80, height: 80 }} src={JobData.companyLogo} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography>{JobData.name}</Typography>
          <Chip label={JobData.company} />
          <Chip label={JobData.location} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          margin: "10px 0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            padding: 2,
            margin: "10px 0",
          }}
        >
          <Typography>Description</Typography>
          <Divider />
          <Typography>{JobData.description}</Typography>
        </Card>
      </Box>
      <Button sx={{ width: "100%" }} variant={"contained"}>
        Submit
      </Button>
    </Container>
  );
};
export default Job;
