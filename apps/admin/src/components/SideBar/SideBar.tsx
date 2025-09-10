// components/Sidebar.tsx
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ExpandLess, ExpandMore, Lock } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { menuStructure } from "./menuConfig";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const isActive = (path?: string) => location.pathname === path;
  const isSubActive = (children?: any[]) =>
    children?.some((item) => isActive(item.path));

  const handleToggle = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <List>
      {menuStructure.map((category) => {
        const isOpen =
          openMenus[category.label] ?? isSubActive(category.children);

        return (
          <div key={category.label}>
            <Tooltip title={collapsed ? category.label : ""} placement="right">
              <ListItemButton
                selected={isActive(category?.path)}
                disabled={category.isLocked}
                onClick={() =>
                  category?.path
                    ? navigate(category.path)
                    : handleToggle(category.label)
                }
              >
                <ListItemIcon>
                  <category.Icon />
                </ListItemIcon>
                <ListItemText
                  primary={category.label}
                  sx={{ opacity: collapsed ? 0 : 1 }}
                />
                {category.isLocked && <Lock fontSize="small" />}
                {category?.children &&
                  !collapsed &&
                  (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </Tooltip>
            {category?.children && (
              <Collapse in={!collapsed && isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.children.map((item) => (
                    <Tooltip
                      key={item.label}
                      title={collapsed ? item.label : ""}
                      placement="right"
                    >
                      <ListItemButton
                        sx={{ pl: 4 }}
                        disabled={item.isLocked}
                        selected={isActive(item.path)}
                        onClick={() => !item.isLocked && navigate(item.path)}
                      >
                        <ListItemIcon>
                          <item.Icon />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          sx={{ opacity: collapsed ? 0 : 1 }}
                        />
                        {item.isLocked && <Lock fontSize="small" />}
                      </ListItemButton>
                    </Tooltip>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        );
      })}
    </List>
  );
};

export default Sidebar;
