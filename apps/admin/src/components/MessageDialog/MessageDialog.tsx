// components/MessageDialog.tsx
import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useModal } from "../../hooks/useModal";

interface MessageDialogProps {
  title: string;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
  action:  React.ReactNode;
  onCancel?:  () => void;
}

export const useMessageDialog = () => {
  const { Modal, open, close, isOpen } = useModal();

  const MessageDialog = ({ title, description, icon, action, onCancel }: MessageDialogProps) => (
    <Modal open={isOpen} title={title} showCloseIcon>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {icon && <Box>{icon}</Box>}
          {
            typeof description ==='string' ?
            <Typography variant="body1">{description}</Typography>
            : description
          }
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="text" color='inherit' onClick={onCancel ? onCancel : close} >Cancel</Button>
          {action}
        </Box>
      </Stack>
    </Modal>
  );

  return { MessageDialog, open, close, isOpen };
};
