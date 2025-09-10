import { FC } from "react";
import { Table } from "../../components/Table/GenericTable.tsx";
import { coursesTable } from "../../api/data/data.tsx";
import { Box,  Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useGetCourses } from "../../api/coursesRequest/getCourses.ts";
import { usePostCourse } from "../../api/coursesRequest/postCourses.ts";
import { EventType } from "../../api/types.ts";
import CourseDialog from "../../components/Dialog/CourseDialog.tsx";
import CardV2 from "../../components/Card/CardV2.tsx";

const CoursePage: FC = () => {
  const { isLoading, data } = useGetCourses();
  const { mutate } = usePostCourse();
  const coursesCards = [
    { title: "Total Business", value: 0 },
    { title: "Total Private Business", value: 0, path: "/user" },
    { title: "Total Business Business", value: 0, path: "/business" },
  ];
  const defaultValues = {
    title: "",
    description: "",
    location: "",
    type: EventType.MeetUp,
    startDate: null,
    endDate: null,
    isActive: true,
  };

  
  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          {coursesCards.map(({ title, value }, index) => (
            <Grid item xs={12} sm={3} md={6} lg={4} key={index}>
              {
                <CardV2
                  title={
                    <Stack>
                      <Typography variant="h6">{title}</Typography>
                      <Typography variant="h5">{value}</Typography>
                    </Stack>
                  }
                />
              }
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <h1>Course</h1>
        <Box>
          <CourseDialog />
        </Box>
      </Box>

      {data ? <Table data={data} columnsProp={coursesTable} /> : <Skeleton />}
    </Container>
  );
};

export default CoursePage;
