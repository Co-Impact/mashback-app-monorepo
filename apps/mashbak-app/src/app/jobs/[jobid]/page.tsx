import { FC } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

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
    <Box>
      <Avatar src={JobData.companyLogo} />
      <Box>
        <Typography>{JobData.name}</Typography>
        <Typography>{JobData.company}</Typography>
        <Typography>{JobData.location}</Typography>
      </Box>
      <Box>
        <Typography>Description</Typography>
        <Typography>{JobData.description}</Typography>
      </Box>
      <Button>Submit</Button>
    </Box>
  );
};
export default Job;
