import { FC } from "react";
import { UserProfile } from "../types";
import { Stack, Typography } from "@mui/material";

interface UserBillingsTabProps {
  currentUser: UserProfile;
}

const UserBillingsTab: FC<UserBillingsTabProps> = ({ currentUser }) => {
  return (
    <Stack>
      <Typography variant="h6">
        {currentUser.firstName}'s Package & Billings
      </Typography>
    </Stack>
  );
};

export default UserBillingsTab;
