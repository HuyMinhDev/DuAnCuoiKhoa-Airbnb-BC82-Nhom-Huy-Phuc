import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Tag,
  Tooltip,
  Row,
  Col,
  Card,
  Space,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CrownOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  getUserList,
  updateUserApi,
  deleteUserApi,
} from "../../services/userService";
import type { User } from "../../types/User";

const QuanLyNguoiDung: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getUserList();
      setUserList(data);
    } catch (error) {
      console.error("Lỗi tải người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSetRole = async (user: User, role: "ADMIN" | "USER") => {
    const updatedUser = { ...user, role };
    try {
      await updateUserApi(user.id, updatedUser);
      message.success(`Đã cập nhật vai trò thành ${role}`);
      fetchUsers();
    } catch (error: any) {
      console.error(
        "Lỗi cập nhật vai trò:",
        error.response?.data || error.message
      );
      message.error("Cập nhật vai trò thất bại");
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserApi(userId);
      message.success("Xóa người dùng thành công");
      fetchUsers();
    } catch {
      message.error("Lỗi khi xóa người dùng");
    }
  };

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const columns: ColumnsType<User> = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Họ tên", dataIndex: "name", key: "name", responsive: ["sm"] },
    { title: "Email", dataIndex: "email", key: "email", responsive: ["md"] },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      responsive: ["md"],
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) =>
        role === "ADMIN" ? (
          <Tag color="red">Quản trị</Tag>
        ) : (
          <Tag color="green">Người dùng</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Tooltip title="Xem">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleViewUser(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record.id)}
            />
          </Tooltip>
          {record.role !== "ADMIN" && (
            <Tooltip title="Set Admin">
              <Button
                type="dashed"
                icon={<CrownOutlined />}
                onClick={() => handleSetRole(record, "ADMIN")}
              />
            </Tooltip>
          )}
          {record.role !== "USER" && (
            <Tooltip title="Set User">
              <Button
                type="dashed"
                icon={<EditOutlined />}
                onClick={() => handleSetRole(record, "USER")}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="👥 Quản lý người dùng"
        style={{ margin: "24px auto", maxWidth: "100%" }}
        bodyStyle={{ padding: 20 }}
        headStyle={{ fontSize: 20, fontWeight: 600 }}
      >
        <Row justify="space-between" gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input.Search
              placeholder="Tìm theo tên người dùng"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              allowClear
            />
          </Col>
        </Row>

        <Table
          style={{ marginTop: 20 }}
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        title="📋 Thông tin người dùng"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={<Button onClick={() => setIsViewModalOpen(false)}>Đóng</Button>}
        width={600}
      >
        {selectedUser && (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Họ tên:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>SĐT:</strong> {selectedUser.phone}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <strong>Ngày sinh:</strong>{" "}
                {dayjs(selectedUser.birthday).format("DD/MM/YYYY")}
              </p>
              <p>
                <strong>Giới tính:</strong> {selectedUser.gender ? "Nam" : "Nữ"}
              </p>
              <p>
                <strong>Vai trò:</strong>{" "}
                {selectedUser.role === "ADMIN" ? "Quản trị" : "Người dùng"}
              </p>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default QuanLyNguoiDung;
