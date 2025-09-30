import { FC, useEffect } from "react";
import { UserProfile } from ".././types";
import { Stack, Typography } from "@mui/material";
import { Table } from "../../../components/Table/GenericTable";
import { LabTableColumns } from "./LabTableColumns.tsx";
import ShowSkeleton from "../../../components/Skeleton/ShowSkeleton";
import { useDeleteTeam } from "../../../api/groupRequest/deleteRequest.ts";

interface UserLabsTabProps {
  currentUser: UserProfile;
}
const UserLabsTab: FC<UserLabsTabProps> = ({ currentUser }) => {
  const { mutate, data, isPending, isSuccess } = useDeleteTeam();

  useEffect(() => {
    if (currentUser?.id) {
      mutate(currentUser.id, {});
    }
  }, [currentUser?.id, mutate]);

  console.log({ data });

  return (
    <Stack>
      <Typography variant="h6">{currentUser.firstName}'s Labs</Typography>
      {isPending ? (
        <ShowSkeleton viewType="table" />
      ) : !data ? (
        <Typography>No Labs</Typography>
      ) : (
        isSuccess && <Table columnsProp={LabTableColumns} data={data || []} />
      )}
    </Stack>
  );
};

export default UserLabsTab;
