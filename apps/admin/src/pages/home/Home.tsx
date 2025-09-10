import { FC } from "react";
import { Container, Grid, Stack, Typography } from "@mui/material";
import DashboardStatCard from "../../components/Card/DashboardStatCard";
import GlobalBarChart from '../../components/Charts/BarChart/GlobalBarChart';
import { dashboardWidgets, usersByCountryData, topUsersGlobalData } from "./data";
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
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <GlobalBarChart
            title="Users by Country"
            data={usersByCountryData}
            dataKey="value"
            labelKey="country"
            barColors={['#4caf50', '#2196f3', '#ff9800', '#f44336']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GlobalBarChart
            bars="horizontal"
            title="Top Users Global"
            data={topUsersGlobalData}
            dataKey="value"
            labelKey="user"
            barColors={['#4caf50', '#2196f3', '#ff9800', '#f44336']}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
