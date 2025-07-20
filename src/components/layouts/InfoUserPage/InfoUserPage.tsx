import { CheckOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import ListBookedRoom from "./ListBookedRoom";
import {
  setIsModalEditOpenAction,
  setIsModalUpHinhOpenAction,
} from "../../../store/slices/infoUserSlice";
import ModalUpHinh from "./ModalUpHinh";
import { fetchInfoUserAction } from "../../../store/thunks/infoUserThunks";
import ModalEditInfoUser from "./ModalEditInfoUser";
import { App as AntdApp } from "antd";
import {
  setIsModalOpen,
  setModalContent,
} from "../../../store/slices/userSlice";
import { useTranslation } from "react-i18next";

export default function InfoUserPage() {
  const { message } = AntdApp.useApp();
  const idUser = useAppSelector((state) => state.userSlice.loginData?.user.id);
  const { infoUser } = useAppSelector((state) => state.infoUserSlice);
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.darkModeSlice);
  const { t } = useTranslation();
  useEffect(() => {
    if (!idUser) {
      dispatch(setModalContent("login"));
      dispatch(setIsModalOpen(true));
      message.warning(t("message.warning.see-more"));
    } else {
      dispatch(fetchInfoUserAction(idUser));
    }
  }, [idUser, dispatch, message, t]);
  return (
    <div className={`${themeMode}`}>
      <div>
        {/* banner */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80&#39)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "50vh",
          }}
        >
          <div className="flex justify-center  z-10">
            <h1 className="text-white text-2xl">
              {t("inforUser.title")}{" "}
              <span className="text-primary">{infoUser.name}</span>
            </h1>
          </div>
          <div
            className="absolute top-0 left-0 w-full h-full opacity-80  "
            style={{
              backgroundImage: "linear-gradient(195deg,#4c4c4c,#191919)",
            }}
          ></div>
        </div>
        {/* info */}
        <div className="container grid lg:flex gap-10 py-5">
          {/* info left */}
          <div
            className="block lg:sticky top-0 basis-1/4"
            style={{
              minHeight: "500px",
              maxHeight: "100vh",
            }}
          >
            <div className=" space-y-3 p-5 border-solid border border-gray-300 rounded-md">
              {/* avatar */}
              <div>
                {infoUser.avatar ? (
                  <img
                    src={infoUser.avatar}
                    alt="avatar"
                    className="mx-auto h-36 w-36 object-cover rounded-full"
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                    alt=""
                    className="mx-auto h-36 w-36 object-cover rounded-full"
                  />
                )}
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="button-primary my-3"
                  onClick={() => {
                    dispatch(setIsModalUpHinhOpenAction(true));
                  }}
                >
                  {t("inforUser.update")}
                </button>
              </div>
              <div className="divide-y-2">
                <div className="border-b-2 border-gray-300">
                  <div className="flex justify-start gap-3">
                    <img
                      className="w-6"
                      src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png"
                      alt=""
                    />
                    <h1 className="font-bold text-xl">
                      {t("inforUser.verify")}
                    </h1>
                  </div>
                  <p> {t("inforUser.verifyUser")}</p>
                  <p>
                    <i className="fa fa-award text-primary mr-3" />
                    {t("inforUser.superHost")}
                  </p>
                  <button
                    className="mb-5 button-primary"
                    onClick={() => {
                      message.info(t("message.info.not-title"));
                    }}
                  >
                    {t("inforUser.getBadge")}
                  </button>
                </div>
                {idUser ? (
                  <div className="">
                    <h1 className="font-bold text-xl">
                      {t("inforUser.confirmed")}
                    </h1>
                    <ul>
                      <li>
                        <CheckOutlined /> {t("inforUser.email")}
                      </li>
                      <li>
                        <CheckOutlined /> {t("inforUser.phone")}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {/* info right */}
          <div className="basis-3/4 space-y-3 p-5">
            <h1 className="text-xl font-bold">
              {t("inforUser.hello")} {infoUser.name}
            </h1>
            <p className="text-sm text-gray-500">{t("inforUser.start")}</p>
            <button
              className="button-primary"
              onClick={() => {
                dispatch(setIsModalEditOpenAction(true));
              }}
            >
              {t("inforUser.editProfile")}
            </button>
            {/* list phòng đã book */}
            <ListBookedRoom />
          </div>
        </div>
        {/* modal up avatar */}
        {idUser !== undefined && <ModalUpHinh idUser={idUser} />}
        {/* modal edit */}
        <ModalEditInfoUser />
      </div>
    </div>
  );
}
