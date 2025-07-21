import React from "react";
import { Button, Form, Input, App as AntdApp } from "antd";
import { authServices } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { setLoginData, setModalContent } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { getListIdBookingAction } from "../../store/thunks/bookingThunks";
import type { FormProps } from "antd";
import type { LoginRequest } from "../../types/auth";
import type { AppDispatch } from "../../store/store"; // ✅ Thêm dòng này để dùng đúng kiểu dispatch
import { account } from "../../config/appwrite";
import { OAuthProvider } from "appwrite";
import type { TempFormLoginProps } from "../../types";
import { useTranslation } from "react-i18next";

const TempFormLogin: React.FC<TempFormLoginProps> = ({ onLoginSuccess }) => {
  const handleGoogleLogin = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "https://du-an-cuoi-khoa-airbnb-bc-82-nhom-h.vercel.app/oauth-callback",
      "https://du-an-cuoi-khoa-airbnb-bc-82-nhom-h.vercel.app/fail"
    );
  };
  const { message } = AntdApp.useApp();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const onFinish: FormProps<LoginRequest>["onFinish"] = async (values) => {
    try {
      const result = await authServices.login(values);
      const { user, token } = result.content;
      const normalizedUser = {
        ...user,
        avatar: user.avatar ?? undefined,
      };

      const userData = { user: normalizedUser, token };

      dispatch(setLoginData(userData));
      localStorage.setItem("USER_LOGIN", JSON.stringify(userData));
      dispatch(getListIdBookingAction(user.id));

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      message.error(t("message.error.login"));
    }
  };

  const onFinishFailed: FormProps<LoginRequest>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Form validation failed:", errorInfo);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-6">
        {t("menu.login")} Airbnb
      </h2>

      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          email: "string2@gmail.com",
          password: "string123",
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: t("menu.messTK") }]}
        >
          <Input placeholder={t("menu.plTaikhoan")} />
        </Form.Item>

        <Form.Item
          label={t("menu.password")}
          name="password"
          rules={[{ required: true, message: t("menu.messMK") }]}
        >
          <Input.Password placeholder={t("menu.plMatkhau")} />
        </Form.Item>

        <div className="flex flex-col justify-between mt-4">
          <div className="flex justify-between">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 rounded-md"
              onClick={() => {
                dispatch(setModalContent("register"));
              }}
            >
              {t("menu.regester")}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black hover:bg-gray-800 text-white font-medium px-6 rounded-md"
            >
              {t("menu.login")}
            </Button>
          </div>

          <div>
            <Button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              onClick={handleGoogleLogin}
            >
              {t("menu.title")}
              <svg width="15" height="15" viewBox="0 0 533.5 544.3">
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.1H272v104.4h147.2c-6.3 34-25.3 62.7-53.9 82l87 67.6c50.9-47 81.2-116.5 81.2-198.9z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c72.6 0 133.6-23.9 178.1-65.1l-87-67.6c-24.1 16.2-54.9 25.7-91.1 25.7-69.9 0-129.1-47.2-150.3-110.3H31.5v69.1C77.3 480.4 167.5 544.3 272 544.3z"
                />
                <path
                  fill="#FBBC04"
                  d="M121.7 326.9c-10.1-30.2-10.1-62.8 0-93l-90.2-69.9C-4.8 234.7-10 323.2 31.5 403l90.2-76.1z"
                />
                <path
                  fill="#EA4335"
                  d="M272 107.7c39.4-.6 77.2 14.1 106 40.9l79.2-79.2C414.9 24.3 345.6-.2 272 0 167.5 0 77.3 63.9 31.5 157.3l90.2 69.1C142.9 154.9 202.1 107.7 272 107.7z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default TempFormLogin;
