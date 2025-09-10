import { FC, MouseEvent, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { settings } from "./navbar.logic";
import { MenuSettings } from "../MenuSettings/MenuSettings";
import "../../style/NavBar.scss";

// interface PersonData {
//   firstName: string;
//   lastName: string;
//   rank: string;
// }

interface NavbarProps {
  isSidebarOpen: boolean;
  onSideBarClick: (isSidebarOpen: boolean) => void;
  isNightMode: boolean;
  changeNightMode: (mode: boolean) => void;
}
// TODO: Remove if not used
export const Navbar: FC<NavbarProps> = ({
  onSideBarClick,
  isSidebarOpen,
  isNightMode,
  changeNightMode,
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const toggleSidebar = () => {
    onSideBarClick(!isSidebarOpen);
  };

  const handleUserMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNightModeToggle = () => {
    changeNightMode(!isNightMode);
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="navbar-toolbar">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          className="navbar-menu-button"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className="navbar-title">
          Cyber Gain
        </Typography>

        <Switch checked={isNightMode} onChange={handleNightModeToggle} />

        <Box className="navbar-user-box">
          <Typography variant="body1">{"name"}</Typography>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleUserMenuOpen}
              className="navbar-avatar-button"
            >
              <Avatar alt={"name"} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <MenuSettings
            menuItems={settings}
            anchorElUser={anchorElUser}
            setAnchorElUser={setAnchorElUser}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
