import {FC} from "react";
import {Container, Grid, Stack, Typography} from "@mui/material";

import {dashboardWidgets} from "./data";
import CardV2 from "../../components/Card/CardV2";


const Dashboard: FC = () => {

  return (
    <Container>
      <Grid container spacing={2} alignItems="stretch">
        {
          dashboardWidgets.map((item, i) => (
            <Grid item xs={12} lg={3} md={4} sm={6} key={i}>
              <CardV2
                title={
                  <Stack>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="h5">{item.count}</Typography>
                  </Stack>
                }
                icon={item.icon}

              />
            </Grid>
          ))
        }
      </Grid>

    </Container>
  );
};

export default Dashboard;
