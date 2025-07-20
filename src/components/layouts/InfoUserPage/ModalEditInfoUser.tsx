import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Modal,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  App as AntdApp,
} from "antd";
import { setIsModalEditOpenAction } from "../../../store/slices/infoUserSlice";
import dayjs from "dayjs";
import { nguoiDungServices } from "../../../services/nguoiDungServices";
import { fetchInfoUserAction } from "../../../store/thunks/infoUserThunks";
import { setLoginData } from "../../../store/slices/userSlice";
import type { RootState, AppDispatch } from "../../../store/store";

import type { User } from "../../../types/User";
import { useTranslation } from "react-i18next";
export default function ModalEditInfoUser() {
  const { message } = AntdApp.useApp();
  const { isModalEditOpen, infoUser } = useSelector(
    (state: RootState) => state.infoUserSlice
  );
  const loginData = useSelector(
    (state: RootState) => state.userSlice.loginData
  );
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const hideModal = () => {
    dispatch(setIsModalEditOpenAction(false));
  };

  const handleOk = (values: User) => {
    const payload = {
      id: infoUser.id,
      name: values.name,
      email: values.email,
      phone: values.phone ?? "",
      birthday: dayjs(values.birthday).format("DD-MM-YYYY"),
      gender: values.gender,
      role: infoUser.role,
    };

    nguoiDungServices
      .editUser(infoUser.id, payload)
      .then(() => {
        dispatch(fetchInfoUserAction(infoUser.id));
        if (!loginData) return;
        const loginClone = {
          ...loginData,
          user: { ...loginData.user, ...payload, password: "" },
        };
        localStorage.setItem("USER_LOGIN", JSON.stringify(loginClone));
        dispatch(setLoginData(loginClone));
        message.success(t("message.success.update"));
      })
      .catch((err) => {
        console.error(err);
        message.error(t("message.error.update"));
      });
  };
  const renderInitialValues = () => {
    if (infoUser) {
      return {
        id: infoUser.id,
        name: infoUser.name,
        phone: infoUser.phone,
        email: infoUser.email,
        gender: infoUser.gender,
        birthday: dayjs(infoUser.birthday),
        role: infoUser.role,
      };
    }
  };
  return (
    <div>
      <Modal
        closable={false}
        open={isModalEditOpen}
        okText="Cập nhật"
        cancelText="Hủy"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          style: {
            backgroundColor: "rgb(254 107 110)",
          },
        }}
        // prop
        onCancel={hideModal}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            initialValues={renderInitialValues()}
            onFinish={(values) => handleOk(values)}
          >
            {dom}
          </Form>
        )}
      >
        <h1 className="my-3 text-2xl text-center">
          Cập nhật thông tin cá nhân
        </h1>

        <Row gutter={24}>
          {/* Col left */}
          <Col className="gutter-row" span={24} md={12}>
            {/* email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Email không hợp lệ!",
                },
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input disabled />
            </Form.Item>
            {/* phone */}
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                  whitespace: true,
                },
                {
                  required: true,
                  message: "Phải là số",
                  pattern: new RegExp(/^[0-9]+$/),
                },

                {
                  required: true,
                  message: "Phải có 10 số",
                  pattern: new RegExp(/^\d{10}$/),
                },
              ]}
              hasFeedback
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            {/* gender */}
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính!",
                },
              ]}
              hasFeedback
            >
              <Select
                placeholder="Chọn giới tính"
                options={[
                  {
                    value: true,
                    label: "Nam",
                  },
                  {
                    value: false,
                    label: "Nữ",
                  },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          {/* Col right */}
          <Col className="gutter-row" span={24} md={12}>
            {/* name */}
            <Form.Item
              name="name"
              label="Tên"
              tooltip="Tên hiển thị với mọi người"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người dùng!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            {/* birthday */}
            <Form.Item
              name="birthday"
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh!",
                },
              ]}
              hasFeedback
            >
              <DatePicker
                maxDate={dayjs(new Date())}
                format="DD/MM/YYYY"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
