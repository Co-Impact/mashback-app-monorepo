import {
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";
import { FC } from "react";
import { useGetEventByID } from "../../api/eventsRequest/getEvents";
import { useParams } from "react-router";
import ManageBasicDetails from "./ManageBasicDetail";
import ManageEventDates from "./ManageEventDates";
import ManageEventConfig from "./ManageEventConfig";

const EventProfilePage: FC = () => {
  const { id = "" } = useParams();
  const event = useGetEventByID(id);
  console.log(event.data);
  if (event.isLoading || !event.data) {
    return (
      <Container>
        <Stack width={"100%"} spacing={4}>
          <Skeleton variant="rectangular" width={"100%"} height={150} />
          <Stack width={"100%"} direction={"row"} spacing={4}>
            <Skeleton variant="rectangular" width={"100%"} height={400} />
            <Skeleton variant="rectangular" width={"100%"} height={400} />
          </Stack>
        </Stack>
      </Container>
    );
  }
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card sx={{ background: (theme) => theme.palette.background.paper }}>
            <CardContent>
              <ManageBasicDetails data={event.data} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Card
                sx={{ background: (theme) => theme.palette.background.paper }}
              >
                <CardContent>
                  <ManageEventConfig data={event.data} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card
                sx={{ background: (theme) => theme.palette.background.paper }}
              >
                <CardContent>
                  <ManageEventDates data={event.data} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default EventProfilePage;
