import { Box } from "@mui/material";
import { JobCard } from "@/components/Card/JobCard";

const JobsPage = () => {
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
    <Box>
      <Box></Box>
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
    </Box>
  );
};
export default JobsPage;
