import { Form, Input, DatePicker, Select, Button, App as AntdApp } from "antd";
import { authServices } from "../../services/authServices";
import dayjs from "dayjs";
import { setModalContent } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import type {
  FormValues,
  RegisterRequest,
  TempFormRegisterProps,
} from "../../types/auth";
import type { Dispatch } from "redux";
import { useTranslation } from "react-i18next";

export default function TempFormRegister({
  onRegisterSuccess,
}: TempFormRegisterProps) {
  const { message } = AntdApp.useApp();
  const dispatch: Dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const handleSubmit = async (values: FormValues) => {
    const { name, email, password, phone, birthday, gender } = values;

    const genderValue: boolean | null =
      gender === "male" ? true : gender === "female" ? false : null;

    const registerData: RegisterRequest = {
      id: 0,
      name,
      email,
      password,
      phone,
      birthday: birthday.format("YYYY-MM-DD"),
      gender: genderValue as boolean,
      role: "user",
    };

    try {
      await authServices.register(registerData);
      message.success(t("message.success.regester"));
      form.resetFields();
      dispatch(setModalContent("login"));
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (error) {
      console.log("Đăng ký lỗi: ", error);
      message.error(t("message.error.regester"));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-6">
        Đăng ký tài khoản Airbnb
      </h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        {/* Tên */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, whitespace: true, message: "Vui lòng nhập tên!" },
          ]}
        >
          <Input placeholder="Điền tên vào đây..." />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập email!",
            },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Điền email vào đây..." />
        </Form.Item>

        {/* Mật khẩu */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              pattern: /[a-zA-Z]/,
              message: "Mật khẩu phải chứa ít nhất một chữ cái!",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        {/* Số điện thoại */}
        <Form.Item label="Phone number" required>
          <Input.Group compact>
            {/* Mã vùng */}
            <Form.Item
              name="countryCode"
              noStyle
              rules={[{ required: true, message: "Vui lòng chọn mã vùng!" }]}
            >
              <Select placeholder="Mã vùng" style={{ width: "30%" }}>
                <Select.Option value="+84">+84 (Vietnam)</Select.Option>
                <Select.Option value="+44">+44 (UK)</Select.Option>
                <Select.Option value="+61">+61 (Australia)</Select.Option>
              </Select>
            </Form.Item>

            {/* Số điện thoại */}
            <Form.Item
              name="phone"
              noStyle
              dependencies={["countryCode"]}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        new Error("Vui lòng nhập số điện thoại!")
                      );
                    }
                    if (!/^0\d{9}$/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Số điện thoại phải bắt đầu bằng 0 và đủ 10 chữ số!"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                style={{ width: "70%" }}
                placeholder="Nhập số điện thoại"
                maxLength={10}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        {/* Ngày sinh & Giới tính */}
        <div className="flex gap-4">
          <Form.Item
            label="Birthday"
            name="birthday"
            className="flex-1"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker
              className="w-full"
              placeholder="Chọn ngày sinh"
              maxDate={dayjs(new Date())}
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            className="flex-1"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="other">Khác</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Nút submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold h-10 rounded-md"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
