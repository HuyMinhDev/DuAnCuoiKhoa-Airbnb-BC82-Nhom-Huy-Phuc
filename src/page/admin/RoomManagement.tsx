// ✅ Đã tối ưu UI và UX với Tailwind, căn chỉnh tốt hơn, giữ lại logic gốc.

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  message,
  Card,
  Space,
  Tag,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  getRoomList,
  deleteRoom,
  updateRoom,
  createRoom,
} from "../../services/roomServices";
import type { Room } from "../../types/Room";
import { viTriServices } from "../../services/viTriServices";
import type { ViTri } from "../../types/ViTri";

const { Option } = Select;

const RoomManagement: React.FC = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [locationList, setLocationList] = useState<ViTri[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm] = Form.useForm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm] = Form.useForm();

  const fetchRooms = async () => {
    try {
      const data = await getRoomList();
      setRoomList(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await viTriServices.getListViTri();
      setLocationList(res.data.content);
    } catch (error) {
      console.error("Lỗi lấy danh sách vị trí:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchLocations();
  }, []);

  const getLocationNameById = (id: number | string) => {
    const location = locationList.find((item) => item.id === Number(id));
    return location
      ? `${location.tenViTri}, ${location.tinhThanh}, ${location.quocGia}`
      : `#${id}`;
  };

  const handleView = (room: Room) => {
    setSelectedRoom(room);
    setIsViewModalOpen(true);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    editForm.setFieldsValue(room);
    setIsEditModalOpen(true);
  };

  const handleAddRoom = async () => {
    try {
      const values = await addForm.validateFields();
      await createRoom(values);
      message.success("✅ Thêm phòng thành công!");
      setIsAddModalOpen(false);
      addForm.resetFields();
      fetchRooms();
    } catch (error) {
      message.error("❌ Thêm phòng thất bại!");
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const values = await editForm.validateFields();
      if (selectedRoom) {
        await updateRoom(selectedRoom.id, values);
        message.success("✅ Cập nhật phòng thành công!");
        setIsEditModalOpen(false);
        fetchRooms();
      }
    } catch (error) {
      message.error("❌ Cập nhật thất bại!");
    }
  };

  const handleDelete = async (roomId: number) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc muốn xoá phòng này không?",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteRoom(roomId);
          message.success("✅ Xoá phòng thành công!");
          fetchRooms();
        } catch (error: any) {
          message.error(
            `❌ Lỗi khi xoá phòng: ${
              error.response?.data?.message || "Không rõ nguyên nhân"
            }`
          );
        }
      },
    });
  };

  const columns: ColumnsType<Room> = [
    { title: "ID", dataIndex: "id", key: "id", width: 80, responsive: ["md"] },
    {
      title: "Tên phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (text) => <strong className="text-blue-600">{text}</strong>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (url) => (
        <img
          src={url || "/default-room.jpg"}
          alt="Hình phòng"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/default-room.jpg";
          }}
          className="w-20 h-14 object-cover rounded shadow"
        />
      ),
    },
    {
      title: "Vị trí",
      dataIndex: "maViTri",
      key: "maViTri",
      render: (maViTri: number | string) => (
        <Tag color="blue">{getLocationNameById(maViTri)}</Tag>
      ),
    },
    {
      title: "Khách tối đa",
      dataIndex: "khach",
      key: "khach",
      render: (text) => (
        <Tag icon={<UserOutlined />} color="volcano">
          {text} người
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      {" "}
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsAddModalOpen(true)}
      >
        Thêm phòng
      </Button>
      <Card
        title={<span className="text-xl font-semibold">📋 Quản lý phòng</span>}
      >
        <Table
          dataSource={roomList}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </Card>
      {/* Các modal giữ nguyên như cũ */}
      {/* ... */}
      <Modal
        open={isViewModalOpen}
        title="📄 Thông tin phòng"
        onCancel={() => setIsViewModalOpen(false)}
        footer={<Button onClick={() => setIsViewModalOpen(false)}>Đóng</Button>}
      >
        {selectedRoom && (
          <div className="text-base space-y-2">
            <p>
              <strong>ID:</strong> {selectedRoom.id}
            </p>
            <p>
              <strong>Tên phòng:</strong> {selectedRoom.tenPhong}
            </p>
            <p>
              <strong>Vị trí:</strong>{" "}
              {getLocationNameById(selectedRoom.maViTri)}
            </p>
            <p>
              <strong>Khách tối đa:</strong> {selectedRoom.khach}
            </p>
            <img
              src={selectedRoom.hinhAnh}
              alt="Phòng"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
      </Modal>
      {/* Modal: Sửa phòng */}
      <Modal
        open={isEditModalOpen}
        title="✏️ Chỉnh sửa phòng"
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleUpdateRoom}
        okText="Cập nhật"
        width={800}
      >
        <Form form={editForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên phòng"
                name="tenPhong"
                rules={[{ required: true, message: "Nhập tên phòng" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Hình ảnh"
                name="hinhAnh"
                rules={[{ required: true, message: "Nhập URL hình ảnh" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giá tiền"
                name="giaTien"
                rules={[{ required: true, message: "Nhập giá tiền" }]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="moTa"
                rules={[{ required: true, message: "Nhập mô tả" }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item
                label="Vị trí"
                name="maViTri"
                rules={[{ required: true, message: "Chọn vị trí" }]}
              >
                <Select showSearch placeholder="Chọn vị trí">
                  {locationList.map((location) => (
                    <Option key={location.id} value={location.id}>
                      {location.tenViTri}, {location.tinhThanh},{" "}
                      {location.quocGia}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Số khách" name="khach">
                <InputNumber min={1} className="w-full" />
              </Form.Item>
              <Form.Item label="Phòng ngủ" name="phongNgu">
                <InputNumber min={0} className="w-full" />
              </Form.Item>
              <Form.Item label="Giường" name="giuong">
                <InputNumber min={0} className="w-full" />
              </Form.Item>
              <Form.Item label="Phòng tắm" name="phongTam">
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* Modal: Thêm phòng */}
      <Modal
        open={isAddModalOpen}
        title="➕ Thêm phòng mới"
        onCancel={() => setIsAddModalOpen(false)}
        onOk={handleAddRoom}
        okText="Thêm"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="Tên phòng"
            name="tenPhong"
            rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
            rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="moTa"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="giaTien"
            rules={[{ required: true, message: "Nhập giá tiền" }]}
          >
            <InputNumber min={10000} className="w-full" />
          </Form.Item>
          <Form.Item
            label="Số khách tối đa"
            name="khach"
            rules={[{ required: true, message: "Nhập số khách" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item label="Số giường" name="giuong">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="Số phòng tắm" name="phongTam">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="Số phòng ngủ" name="phongNgu">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Vị trí"
            name="maViTri"
            rules={[{ required: true, message: "Chọn vị trí" }]}
          >
            <Select showSearch placeholder="Chọn vị trí">
              {locationList.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.tenViTri}, {location.tinhThanh}, {location.quocGia}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Các tiện nghi */}
        </Form>
      </Modal>
    </div>
  );
};

export default RoomManagement;
