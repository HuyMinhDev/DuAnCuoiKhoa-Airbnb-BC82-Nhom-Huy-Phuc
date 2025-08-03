import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";
import { UserOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // 👈 Thêm Outlet
import QuanLyNguoiDung from "./QuanLyNguoiDung";

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          className="logo"
          style={{ color: "white", padding: "20px", textAlign: "center" }}
        >
          <img
            src="/src/assets/image/airbnb-1.aabeefedaf30b8c7011a022cdb5a6425.png"
            alt="logo"
            style={{
              width: "80px",
              height: "80px",
              marginLeft: "35px",
              objectFit: "contain",
            }}
          />
          <h1
            style={{ color: "#fe6b6e", fontWeight: "bold", fontSize: "24px" }}
          >
            airpnp
          </h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <Link to="/admin/dashboard">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/admin/manageruser">Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key="rooms" icon={<UserOutlined />}>
            <Link to="/admin/rooms">Quản lý phòng</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => setIsLogoutModalOpen(true)}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{ background: "#fff", padding: 16, textAlign: "center" }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: 0 }}>
            Quản trị Admin - airpnp
          </h1>
        </Header>

        <Content style={{ margin: "24px" }}>
          <QuanLyNguoiDung />
        </Content>
      </Layout>

      <Modal
        title="Xác nhận đăng xuất"
        open={isLogoutModalOpen}
        onOk={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;
