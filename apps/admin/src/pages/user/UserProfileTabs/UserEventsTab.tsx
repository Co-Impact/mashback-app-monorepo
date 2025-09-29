import { FC, useState } from "react";
import { UserProfile } from ".././types";
import { Stack, Typography } from "@mui/material";
import { Table } from "../../../components/Table/GenericTable";
import { EventsTableColumns } from "./EventsTableColumns.tsx";

interface UserEventsTabProps {
  currentUser: UserProfile;
}
const UserEventsTab: FC<UserEventsTabProps> = ({ currentUser }) => {
  const [data, setData] = useState(currentUser.Events || []);

  return (
    <Stack>
      <Typography variant="body1">{currentUser.firstName}'s Labs</Typography>
      {!data?.length ? (
        <Typography>No Events</Typography>
      ) : (
        <Table columnsProp={EventsTableColumns} data={data || []} />
      )}
    </Stack>
  );
};

export default UserEventsTab;
