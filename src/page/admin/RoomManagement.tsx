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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  getRoomList,
  deleteRoom,
  updateRoom,
} from "../../services/roomServices";
import type { Room } from "../../types/Room";
import { viTriServices } from "../../services/viTriServices";
import type { ViTri } from "../../types/ViTri";

const RoomManagement: React.FC = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [locationList, setLocationList] = useState<ViTri[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm] = Form.useForm();

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
        } catch (error) {
          message.error("❌ Lỗi khi xoá phòng!");
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
      render: (text) => <strong>{text}</strong>,
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
          style={{
            width: 80,
            height: 50,
            objectFit: "cover",
            borderRadius: 6,
            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
          }}
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
    <>
      <Card
        title="📋 Quản lý phòng"
        style={{ margin: "24px auto", maxWidth: 1200 }}
        headStyle={{ fontSize: 20, color: "#333", fontWeight: 600 }}
        bodyStyle={{ padding: 20 }}
      >
        <Modal
          title="✏️ Chỉnh sửa phòng"
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          onOk={handleUpdateRoom}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form layout="vertical" form={editForm}>
            <Form.Item
              label="Tên phòng"
              name="tenPhong"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Khách tối đa"
              name="khach"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Giá" name="giaTien" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>

        <Table
          dataSource={roomList}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        title="🛏️ Chi tiết phòng"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={<Button onClick={() => setIsViewModalOpen(false)}>Đóng</Button>}
        width={700}
        centered
      >
        {selectedRoom && (
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <img
                src={selectedRoom.hinhAnh || "/default-room.jpg"}
                alt="Phòng"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/default-room.jpg";
                }}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <p>
                <strong>ID:</strong> {selectedRoom.id}
              </p>
              <p>
                <strong>Tên phòng:</strong> {selectedRoom.tenPhong}
              </p>
              <p>
                <strong>Khách tối đa:</strong> {selectedRoom.khach} người
              </p>
            </Col>
            <Col xs={24} sm={12}>
              <p>
                <strong>Vị trí:</strong>{" "}
                {getLocationNameById(selectedRoom?.maViTri)}
              </p>
              <p>
                <strong>Giá:</strong> {selectedRoom.giaTien?.toLocaleString()}{" "}
                VND
              </p>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default RoomManagement;
