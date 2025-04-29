import { FC } from "react";
import {
  Avatar,
  Box,
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { listItemContent } from "@/app/profile/profile.logic";

const ProfilePage: FC = () => {
  const data = {
    name: "User Name",
    company: "Company work for",
    role: "Role",
    bio: "Bio",
    education: "Education",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    skills: [
      { label: "Skill 1", level: 3 },
      { label: "Skill 2", level: 4 },
      { label: "Skill 3", level: 5 },
    ],
  };
  const { name, company, role, image, education, bio } = data;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Avatar src={image} sx={{ width: 70, height: 70 }} />
        <Box>
          <Typography>{name}</Typography>
          <Typography>
            {role} | {company}
          </Typography>
        </Box>
      </Box>

      <Card>{education}</Card>

      <Card>{bio}</Card>

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
