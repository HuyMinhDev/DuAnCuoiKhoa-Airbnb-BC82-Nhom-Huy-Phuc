import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalPaymentOpen,
  setIsModalReBookingOpen,
} from "../../store/slices/bookingSlice";
import type { RootState } from "../../store/store";

const ModalReBooking: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalReBookingOpen } = useSelector(
    (state: RootState) => state.bookingSlice
  );

  const handleOk = () => {
    dispatch(setIsModalReBookingOpen(false));
    dispatch(setIsModalPaymentOpen(true));
  };

  const handleCancel = () => {
    dispatch(setIsModalReBookingOpen(false));
  };

  return (
    <Modal
      title="Phòng này bạn đã đặt"
      okText="Tiếp tục"
      cancelText="Không"
      open={isModalReBookingOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Bạn có muốn tiếp tục đặt phòng này?</p>
    </Modal>
  );
};

export default ModalReBooking;
