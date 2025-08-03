import { useRoutes } from "react-router-dom";
import { PATH } from "./path";
import HomeLayout from "../page/home-layouts/HomeLayout";
import Homepage from "../page/home-layouts/Homepage";
import AdminDashboard from "../page/admin/Admin";
import RoomManagement from "../page/admin/RoomManagement";
import QuanLyNguoiDung from "../page/admin/QuanLyNguoiDung";
import Dashboard from "../page/admin/DashBoard";

export default function useRouterElements() {
  const elements = useRoutes([
    {
      path: PATH.HOME,
      element: (
        <HomeLayout>
          <Homepage />
        </HomeLayout>
      ),
    },

    {
      path: PATH.ADMIN,
      element: <AdminDashboard />,
    },
    {
      path: PATH.ROOM_MANAGE,
      element: <RoomManagement />,
    },
    {
      path: PATH.USER,
      element: <QuanLyNguoiDung />,
    },
    {
      path: PATH.DASHBOARD,
      element: <Dashboard />,
    },

    // {
    //   path: `${PATH.ROOM}/:id`,
    //   element: (
    //     <HomeLayout>
    //       <RoomsVitri />
    //     </HomeLayout>
    //   ),
    // },
    // {
    //   path: `${PATH.ROOM_DETAIL}/:id`,
    //   element: (
    //     <HomeLayout>
    //       <RoomDetailPage />
    //     </HomeLayout>
    //   ),
    // },
    // {
    //   path: `${PATH.ROOM}`,
    //   element: (
    //     <HomeLayout>
    //       <RoomsPage />
    //     </HomeLayout>
    //   ),
    // },
    // {
    //   path: `${PATH.LOGIN_GOOGLE}`,
    //   element: (
    //     <HomeLayout>
    //       <OAuthCallback />
    //     </HomeLayout>
    //   ),
    // },
    // {
    //   path: `${PATH.PROFILE}`,
    //   element: (
    //     <HomeLayout>
    //       <InfoUserPage />
    //     </HomeLayout>
    //   ),
    // },

    // {
    //   path: PATH.NOT_FOUND,
    //   element: (
    //     <div>
    //       <NotFoundPage />
    //     </div>
    //   ),
    // },
  ]);
  return elements;
}
