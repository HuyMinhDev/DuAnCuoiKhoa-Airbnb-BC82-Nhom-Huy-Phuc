import { useRoutes } from "react-router-dom";
import { PATH } from "./path";
import HomeLayout from "../page/home-layouts/HomeLayout";
import Homepage from "../page/home-layouts/Homepage";
import RoomsVitri from "../page/RoomsPage/RoomsVitri";
import RoomsPage from "../page/RoomsPage/RoomsPage";
import RoomDetailPage from "../page/RoomsDetailPage/RoomDetailPage";
import InfoUserPage from "../components/layouts/InfoUserPage/InfoUserPage";

import OAuthCallback from "../page/TempLoginPage/OAuthCallback";

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
      path: `${PATH.ROOM}/:id`,
      element: (
        <HomeLayout>
          <RoomsVitri />
        </HomeLayout>
      ),
    },
    {
      path: `${PATH.ROOM_DETAIL}/:id`,
      element: (
        <HomeLayout>
          <RoomDetailPage />
        </HomeLayout>
      ),
    },
    {
      path: `${PATH.ROOM}`,
      element: (
        <HomeLayout>
          <RoomsPage />
        </HomeLayout>
      ),
    },
    {
      path: `${PATH.LOGIN_GOOGLE}`,
      element: (
        <HomeLayout>
          <OAuthCallback />
        </HomeLayout>
      ),
    },
    {
      path: `${PATH.PROFILE}`,
      element: (
        <HomeLayout>
          <InfoUserPage />
        </HomeLayout>
      ),
    },

    { path: PATH.NOT_FOUND, element: <div>404 Not Found</div> },
  ]);
  return elements;
}
