import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Team } from "./types";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTeam } from "../../api/groupRequest/deleteRequest.ts";

interface DeleteTeamModalProps {
  open: boolean;
  onClose: () => void;
  team: Team | null;
}

const DeleteTeamModal: FC<DeleteTeamModalProps> = ({ open, onClose, team }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteTeam();
  async function handleDelete(id: string) {
    if (!team?.id) {
      toast.error("Team ID is missing");
      return;
    }
    mutate(team.id);
    await queryClient.refetchQueries({
      queryKey: ["teams", "by-user-id", id],
    });
    onClose();
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Team</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{team?.name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => handleDelete(team?.id as string)}
        >
          {isPending ? "Deleting" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTeamModal;
