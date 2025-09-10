import { Menu, MenuItem, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
 interface MenuItems {
    label: string;
    path: string;
  }
interface Props {
  menuItems: Array<MenuItems>;
  anchorElUser: HTMLElement | null;
  setAnchorElUser: Dispatch<SetStateAction<HTMLElement | null>>;
}
export const MenuSettings: FC<Props> = ({
  menuItems,
  anchorElUser,
  setAnchorElUser,
}) => {
  // const navigate = useNavigate();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const handleMenuItemClick = (path: string) => {
  //   handleCloseUserMenu();
  //   navigate(path, { replace: true });
  // };
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {menuItems.map(({ label, path }) => (
        <MenuItem key={label} component={"a"} href={path}>
          <Typography textAlign="center">{label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
