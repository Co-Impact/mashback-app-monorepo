import { Outlet } from "react-router";
import AppLayout from "../components/SideBar/AppLayout";

const RootLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default RootLayout;
