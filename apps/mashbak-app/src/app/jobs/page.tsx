import { Box, Container, Typography } from "@mui/material";
import { JobCard } from "@/components/Card/JobCard";
import { FC } from "react";

const JobsPage: FC = () => {
  const jobContent = [
    {
      id: "asfasdfasd",
      logo: "asdfasdf",
      positionName: "asfasdfasd",
      companyName: "DSAfsadf",
    },
    {
      id: "asfasdfasd",
      logo: "asdfasdf",
      positionName: "asfasdfasd",
      companyName: "DSAfsadf",
    },
    {
      id: "asfasdfasd",
      logo: "asdfasdf",
      positionName: "asfasdfasd",
      companyName: "DSAfsadf",
    },
    {
      id: "asfasdfasd",
      logo: "asdfasdf",
      positionName: "asfasdfasd",
      companyName: "DSAfsadf",
    },
  ];
  return (
    <Container className={"page"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100px",
        }}
      >
        <Typography>you submitted to 25 jobs</Typography>
      </Box>
      <Box>
        {jobContent.map(({ id, logo, positionName, companyName }, index) => (
          <JobCard
            key={index}
            id={id}
            logo={logo}
            positionName={positionName}
            companyName={companyName}
          />
        ))}
      </Box>
    </Container>
  );
};
export default JobsPage;
