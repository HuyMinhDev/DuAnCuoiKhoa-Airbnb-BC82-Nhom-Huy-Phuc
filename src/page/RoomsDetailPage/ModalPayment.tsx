import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalPaymentOpen } from "../../store/slices/bookingSlice";
import { DatePicker, Form, Input, Modal, Radio, Space, Tabs } from "antd";
import dayjs from "dayjs";
// import type { DatePickerProps } from "antd";
import type { TabsProps } from "antd";
import type { RadioChangeEvent } from "antd";
import type { RootState } from "../../store/store"; // Sửa path nếu store nằm khác chỗ
import type { ValidateErrorEntity } from "rc-field-form/lib/interface";
type ModalPaymentProps = {
  bookingAction: () => void;
};
type PaymentOnlineForm = {
  soThe1: string;
  soThe2: string;
  soThe3: string;
  soThe4: string;
  maThe: string;
  HSD: string; // hoặc `dayjs.Dayjs` nếu bạn dùng DatePicker
  chuThe: string;
};

const ModalPayment: React.FC<ModalPaymentProps> = ({ bookingAction }) => {
  const { isModalPaymentOpen, tienTruocThue } = useSelector(
    (state: RootState) => state.bookingSlice
  );

  const [value, setValue] = useState<"online" | "offline">("online");
  const [activeTab, setActiveTab] = useState("1");
  const [optionTab1, setOptionTab] = useState<"online" | "offline">("online");

  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(setIsModalPaymentOpen(false));
  };

  const handleCancel = () => {
    dispatch(setIsModalPaymentOpen(false));
  };

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    const selected = e.target.value as "online" | "offline";
    setValue(selected);
    setOptionTab(selected);
  };

  const onFinish = (values: PaymentOnlineForm) => {
    console.log(values);
    bookingAction();
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<PaymentOnlineForm>
  ) => {
    console.error(errorInfo);
  };

  const renderContentTab1 = () => (
    <div>
      <Radio.Group onChange={onChangeRadio} value={value}>
        <Space direction="vertical">
          <Radio value="online">
            <div className="grid grid-cols-1 md:flex justify-center items-center gap-3 text-xl">
              <p>Thanh toán bằng thẻ</p>
              <div>
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-amazon-pay"></i>
                <i className="fa fa-credit-card"></i>
              </div>
            </div>
          </Radio>
          <Radio value="offline">
            <div className="grid grid-cols-1 md:flex justify-center items-center gap-3 text-xl">
              <p>Thanh toán bằng tiền mặt</p>
              <div>
                <i className="fa fa-money-bill"></i>
              </div>
            </div>
          </Radio>
        </Space>
      </Radio.Group>
      <div className="w-full mt-5">
        <button className="button-primary" onClick={() => setActiveTab("2")}>
          Tiếp
        </button>
      </div>
    </div>
  );

  const renderContentTab2 = () => {
    if (optionTab1 === "online") {
      return (
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Số thẻ"
            name="soThe"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Số thẻ không được để trống!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Phải là số",
              },
            ]}
          >
            <Space>
              {["soThe1", "soThe2", "soThe3", "soThe4"].map((name) => (
                <Form.Item
                  key={name}
                  name={name}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Phải có 4 số",
                      pattern: /^\d{4}$/,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ))}
            </Space>
          </Form.Item>

          <Form.Item
            label="Mã thẻ"
            name="maThe"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Phải có 3 số",
                pattern: /^\d{3}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày hết hạn"
            name="HSD"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Ngày hết hạn không được để trống!",
              },
            ]}
          >
            <DatePicker format={"MM/YYYY"} picker="month" minDate={dayjs()} />
          </Form.Item>

          <Form.Item
            label="Tên chủ thẻ"
            name="chuThe"
            rules={[
              {
                required: true,
                message: "Tên chủ thẻ không được để trống!",
              },
              {
                pattern: /^[a-zA-Z ]+$/,
                message: "Phải là chữ",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-between mt-5">
            <button
              className="button-outline-primary"
              onClick={() => setActiveTab("1")}
              type="button"
            >
              Quay lại
            </button>
            <button className="button-primary" type="submit">
              Thanh toán
            </button>
          </div>
        </Form>
      );
    }

    return (
      <div>
        <p>
          Số tiền mặt cần trả:{" "}
          <span className="font-bold">{tienTruocThue} $</span>
        </p>
        <div className="flex justify-between mt-5">
          <button
            className="button-outline-primary"
            onClick={() => setActiveTab("1")}
          >
            Quay lại
          </button>
          <button className="button-primary" onClick={bookingAction}>
            Thanh toán
          </button>
        </div>
      </div>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Hình thức",
      children: renderContentTab1(),
    },
    {
      key: "2",
      label: "Thanh toán",
      children: renderContentTab2(),
    },
  ];

  return (
    <Modal
      open={isModalPaymentOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Tabs activeKey={activeTab} items={items} onChange={onChange} />
    </Modal>
  );
};

export default ModalPayment;
