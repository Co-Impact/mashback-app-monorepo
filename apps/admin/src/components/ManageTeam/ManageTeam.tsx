// ManageTeam.tsx
import { Box, Button, Stack, Typography } from "@mui/material";
import { Table } from "../Table/GenericTable";
import { useState } from "react";
import { getManageTeamsTableColumns } from "./ManageTeamsTableColumns";
import DeleteTeamModal from "./DeleteTeamModal";
import { Team } from "./types";
import TeamFormModal from "./TeamFormModal";
import { useModal } from "../../hooks/useModal";
import ShowSkeleton from "../Skeleton/ShowSkeleton";
import { TeamUser } from "./SelectTeamMembers";
import { useGetTeamById } from "../../api/groupRequest/getRequest.ts";

export interface IDefaultTeamForm {
  id?: string;
  teamName: string;
  members: TeamUser[];
}

const defaultValue = { teamName: "", members: [] };

const ManageTeam = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [defaultTeamForm, setDefaultTeamForm] =
    useState<IDefaultTeamForm>(defaultValue);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const { Modal, open, close, isOpen } = useModal();
  const { data, isLoading } = useGetTeamById("");
  console.log(data);
  const [viewMore, setViewMore] = useState(false);

  const handleEditClick = (team: any) => {
    setSelectedTeam(team);
    const members =
      team.members?.map(
        (member: {
          user: { id: any; firstName: any; lastName: any; email: any };
          status: any;
        }) => ({
          id: member?.user?.id,
          firstName: member?.user?.firstName,
          lastName: member?.user?.lastName,
          email: member?.user?.email,
          invitationStatus: member?.status,
        }),
      ) || [];
    setDefaultTeamForm({
      teamName: team.name,
      members: members as TeamUser[],
      id: team.id,
    });
    setMode("edit");
    open();
  };

  const handleCreateClick = () => {
    setDefaultTeamForm(defaultValue);
    setMode("create");
    open();
  };

  const handleDeleteClick = (team: Team) => {
    setSelectedTeam(team);
    setDeleteDialogOpen(true);
  };

  const columns = getManageTeamsTableColumns({
    onEdit: handleEditClick,
    onDelete: handleDeleteClick,
  });

  function handleDeleteModalClose() {
    setDeleteDialogOpen(false);
    setSelectedTeam(null);
  }
  return (
    <Box width={"100%"} borderRadius={2} bgcolor={"primary.main"} p={2}>
      <Stack gap={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            sx={{ color: "text.primary" }}
            variant="h6"
            fontWeight={600}
          >
            Manage Teams
          </Typography>
          <Button onClick={handleCreateClick} size="large">
            Create New Team
          </Button>
          <Modal
            showCloseIcon
            open={isOpen}
            onClose={close}
            title={mode === "edit" ? "Edit Team" : "Create New Team"}
          >
            <TeamFormModal
              close={close}
              mode={mode}
              defaultTeamForm={defaultTeamForm}
            />
          </Modal>
        </Stack>
        {isLoading ? (
          <ShowSkeleton viewType="table" />
        ) : (
          <Stack width={"100%"} alignItems={"end"}>
            <Box sx={{ width: "100%" }}>
              <Table hideTableHeader columnsProp={columns} data={data || []} />
            </Box>
            {data?.length && (
              <Button
                sx={{ width: "fit-content" }}
                color="info"
                onClick={() => setViewMore((prev) => !prev)}
              >
                {viewMore ? "View Less" : "View More"}
              </Button>
            )}
          </Stack>
        )}
      </Stack>
      <DeleteTeamModal
        open={deleteDialogOpen}
        onClose={handleDeleteModalClose}
        team={selectedTeam}
      />
    </Box>
  );
};

export default ManageTeam;
