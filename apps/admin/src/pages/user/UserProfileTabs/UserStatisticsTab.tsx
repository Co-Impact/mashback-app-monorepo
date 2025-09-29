import {FC} from "react";
import {UserProfile} from "../types";
import {Card, CardContent, Grid, Stack, Typography} from "@mui/material";

interface UserLabsTabProps {
  currentUser: UserProfile;
}
const UserStatisticsTab: FC<UserLabsTabProps> = ({ currentUser }) => {

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{currentUser.firstName}'s Statistics</Typography>

      <Grid container spacing={2}>
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
