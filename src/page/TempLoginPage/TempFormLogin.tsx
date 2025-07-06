import React from "react";

interface TempFormLoginProps {
  onLoginSuccess: () => void;
  setModalContent: (value: "login" | "register") => void;
}

const TempFormLogin: React.FC<TempFormLoginProps> = ({
  onLoginSuccess,
  setModalContent,
}) => {
  return (
    <div>
      Login
      {/* Ví dụ sử dụng prop */}
      <button
        onClick={onLoginSuccess}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Đăng nhập (giả lập)
      </button>
      <p className="mt-2">
        Chưa có tài khoản?{" "}
        <button
          onClick={() => setModalContent("register")}
          className="text-blue-500 underline"
        >
          Đăng ký
        </button>
      </p>
    </div>
  );
};

export default TempFormLogin;
