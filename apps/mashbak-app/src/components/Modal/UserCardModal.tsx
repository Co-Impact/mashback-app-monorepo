import React from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface UserCardModalProps {
  open: boolean;
  onClose: () => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  user: {
    imageUrl: string;
    name: string;
    position: string;
    company: string;
  };
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
}

export const UserCardModal: React.FC<UserCardModalProps> = ({
  open,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  user,
  primaryActionLabel = "Message",
  secondaryActionLabel = "Connect",
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Avatar
            src={user.imageUrl}
            alt={user.name}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.position} at {user.company}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button variant="outlined" onClick={onSecondaryAction}>
          {secondaryActionLabel}
        </Button>
        <Button variant="contained" onClick={onPrimaryAction}>
          {primaryActionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
