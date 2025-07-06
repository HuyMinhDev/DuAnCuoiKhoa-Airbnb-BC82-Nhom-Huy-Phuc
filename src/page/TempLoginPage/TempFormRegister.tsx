import React from "react";

interface TempFormRegisterProps {
  onRegisterSuccess: () => void;
  setModalContent: (value: "login" | "register") => void;
}

const TempFormRegister: React.FC<TempFormRegisterProps> = ({
  onRegisterSuccess,
  setModalContent,
}) => {
  return (
    <div>
      Register
      {/* Ví dụ sử dụng prop */}
      <button
        onClick={onRegisterSuccess}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Đăng ký (giả lập)
      </button>
      <p className="mt-2">
        Đã có tài khoản?{" "}
        <button
          onClick={() => setModalContent("login")}
          className="text-green-500 underline"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
};

export default TempFormRegister;
