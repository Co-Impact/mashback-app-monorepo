import React from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SvgIcon,
  Typography,
} from "@mui/material";
import {
  facebookIcon,
  globeIcon,
  instagramIcon,
  twitterIcon,
} from "./data.model";

interface UserCardModalProps {
  open: boolean;
  onClose: () => void;
  // onPrimaryAction: () => void;
  // onSecondaryAction: () => void;
  user?: {
    imageUrl?: string;
    name?: string;
    position?: string;
    company?: string;
  };
}

export const UserCardModal: React.FC<UserCardModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Profile</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          src="/static/images/avatar/1.jpg"
          sx={{ width: 64, height: 64, mb: 1 }}
        />
        <Typography variant="h6">Josephine Blanton</Typography>
        <Typography variant="body2" sx={{ mt: 1, maxWidth: "24ch" }}>
          Hello, this is my bio and I am a PRO member of MUI. I am a developer
          and I love to code.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            "& > button": { borderRadius: "2rem" },
          }}
        >
          {[facebookIcon, instagramIcon, twitterIcon, globeIcon].map(
            (icon, i) => (
              <IconButton key={i} size="small" color="default">
                <SvgIcon>{icon}</SvgIcon>
              </IconButton>
            ),
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <ButtonGroup variant="outlined">
          <Button>اعرف المزيد</Button>
          <Button>اشرب قهوة</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};
