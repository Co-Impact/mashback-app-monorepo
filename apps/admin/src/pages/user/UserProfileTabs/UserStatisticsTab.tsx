import { FC } from "react";
import { UserProfile } from "../types";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import DonutPieChart from "../../../components/Charts/GlobalPieChart/GlobalPieChart";
import { blue, red } from "@mui/material/colors";

interface UserLabsTabProps {
  currentUser: UserProfile;
}
const UserStatisticsTab: FC<UserLabsTabProps> = ({ currentUser }) => {
  const dummyData = [
    { name: "Red Team", value: 23 },
    { name: "Blue Team", value: 30 },
  ];

  const colorMap = {
    "red team": red[600],
    "blue team": blue[600],
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{currentUser.firstName}'s Statistics</Typography>

      <Grid container spacing={2}>
        <Grid>
          <DonutPieChart
            title="Team Distribution"
            data={dummyData}
            colorMap={colorMap}
          />
        </Grid>
        <Grid>
          <Grid container spacing={2}>
            <Grid>
              <Card>
                <CardContent sx={{ bgcolor: "background.paper" }}>
                  <Typography variant="body1">
                    World wide Rank: <span style={{ fontWeight: 600 }}>1</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card>
                <CardContent sx={{ bgcolor: "background.paper" }}>
                  <Typography variant="body1">
                    Country Rank: <span style={{ fontWeight: 600 }}>1</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default UserStatisticsTab;
