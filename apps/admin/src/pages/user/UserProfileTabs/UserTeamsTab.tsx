import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { getManageTeamsTableColumns } from "./ManageTeamsTableColumns";
import { useGetTeamsByUserId } from "../../../api/teamRequest/getTeams";
import { Table } from "../../../components/Table/GenericTable";
import ShowSkeleton from "../../../components/Skeleton/ShowSkeleton";
import { UserProfile } from "../types";

interface ManageTeamProps {
  currentUser: UserProfile;
}

const UserTeamsTab: FC<ManageTeamProps> = ({ currentUser }) => {
  const teams = useGetTeamsByUserId(currentUser?.id || "");

  const columns = getManageTeamsTableColumns({
    onEdit: () => {},
    onDelete: () => {},
  });

  return (
    <Stack>
      <Typography variant="h6">{currentUser.firstName}'s Teams</Typography>
      {teams.isLoading ? (
        <ShowSkeleton viewType="table" />
      ) : (
        <Table hideTableHeader columnsProp={columns} data={teams.data || []} />
      )}
    </Stack>
  );
};

export default UserTeamsTab;
