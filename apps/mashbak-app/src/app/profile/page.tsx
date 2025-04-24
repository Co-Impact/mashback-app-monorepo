import { FC } from "react";
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { listItemContent } from "@/app/profile/profile.logic";

const ProfilePage: FC = () => {
  return (
    <Box>
      <Box>
        <Avatar />
        <Box>
          <Typography>User Name</Typography>
          <Typography>Company work for</Typography>
        </Box>
      </Box>

      <List>
        {listItemContent.map((item, index) => (
          <ListItemButton key={index}>
            <ListItemIcon>{/*<InboxIcon />*/}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ProfilePage;
