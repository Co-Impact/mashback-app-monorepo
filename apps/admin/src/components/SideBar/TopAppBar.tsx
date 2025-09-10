import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChevronLeft, Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "../../hooks/useTheme";
import { MenuSettings } from "../MenuSettings/MenuSettings";
import { settings } from "../NavBar/navbar.logic";
import { MouseEvent, useState } from "react";
import "../../style/NavBar.scss";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";

const TopAppBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) => {
  const { isNightMode, toggleTheme } = useTheme();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setCollapsed(!collapsed)}
          sx={{ mr: 2 }}
        >
          {collapsed ? <MenuIcon /> : <ChevronLeft />}
        </IconButton>
        <Typography variant="h6" flexGrow={1} component="div">
          CG ADMIN
        </Typography>
        <Box className="navbar-user-box">
          <Typography mr={2} variant="body1">
            {"name"}
          </Typography>
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
        <IconButton onClick={toggleTheme}>
          {isNightMode ? (
            <BedtimeIcon />
          ) : (
            <LightModeIcon sx={{ fill: "white" }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
