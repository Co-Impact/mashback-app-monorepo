import { Divider, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { UserProfile } from "./types";

interface AccountTabProps {
  user: UserProfile;
}

const AccountTab: FC<AccountTabProps> = ({ user }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Account
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              First Name
            </Typography>
            <Typography>{user.firstName}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Last Name
            </Typography>
            <Typography>{user.lastName}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography>{user.phone || "---"}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Email Address
            </Typography>
            <Typography>{user.email}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Country
            </Typography>
            <Typography>{user.country}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Bio
            </Typography>
            <Typography>{user.bio || "---"}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Website
            </Typography>
            <Typography>{user.website || "---"}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="textSecondary">
              Date of birth
            </Typography>
            <Typography>
              {user?.dateOfBirth
                ? new Date(user.dateOfBirth).toDateString()
                : "---"}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountTab;
