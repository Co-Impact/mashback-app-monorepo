import { Box, Container } from "@mui/material";
import { JobCard } from "@/components/Card/JobCard";
import { FC } from "react";
import { SummaryCard } from "@/components/Card/SummaryCard";

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
      <SummaryCard title={"sdfasd"} chartData={45} subtitle={"sdfasdf"} />
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
