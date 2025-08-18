import { useState, useRef } from "react";
import type { ReactNode } from "react";
import {
  AimOutlined,
  // BarChartOutlined,
  CalendarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { App as AntdApp } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { MenuProps } from "antd";
import type { RootState } from "../../../store/store";
import { ChartArea } from "lucide-react";

const { Content, Sider } = Layout;

interface SliderProps {
  content: ReactNode;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: ReactNode,
  key: string,
  icon?: ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function Slider({ content }: SliderProps) {
  const user = useSelector((state: RootState) => state.userSlice.loginData);
  const { message } = AntdApp.useApp();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const userIconRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    message.success("Đăng xuất thành công!");
    setTimeout(() => {
      setShowDropdown(false);
      window.location.href = "/";
    }, 1000);
  };

  const location = useLocation();

  const items: MenuItem[] = [
    // getItem(
    //   <NavLink to="/admin/QuanLySoLieu">Thống kê</NavLink>,
    //   "/admin/QuanLySoLieu",
    //   <BarChartOutlined />
    // ),
    getItem(
      <NavLink to="/admin/QuanLyNguoiDung">Quản lý người dùng</NavLink>,
      "/admin/QuanLyNguoiDung",
      <UserOutlined />
    ),
    getItem(
      <NavLink to="/admin/QuanLyViTri">Quản lý vị trí</NavLink>,
      "/admin/QuanLyViTri",
      <AimOutlined />
    ),
    getItem(
      <NavLink to="/admin/QuanLyPhong">Quản lý phòng</NavLink>,
      "/admin/QuanLyPhong",
      <HomeOutlined />
    ),
    getItem(
      <NavLink to="/admin/QuanLyBooking">Quản lý booking</NavLink>,
      "/admin/QuanLyBooking",
      <CalendarOutlined />
    ),
    getItem(
      <NavLink to="/admin/chart">Biểu đồ </NavLink>,
      "/admin/chart",
      <ChartArea />
    ),
  ];

  const bgAdmin = {
    backgroundColor: "rgb(61, 39, 39)",
  };
  if (!user) {
    return <div className="p-4 text-gray-500 text-sm">Bạn chưa đăng nhập.</div>;
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} trigger={null} style={bgAdmin}>
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
          items={items}
          style={bgAdmin}
        />
      </Sider>
      <Layout>
        <div className="flex justify-between" style={bgAdmin}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary"
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          {/* User Section */}
          <div className="items-center flex-shrink-0 flex px-8 relative">
            <div
              ref={userIconRef}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-gray-800 text-white transition-all duration-300 ${
                showDropdown ? "ring-4 ring-red-400" : "ring-2 ring-gray-300"
              } hover:ring-4 hover:ring-red-400`}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {user.user.avatar ? (
                <img
                  src={user.user.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <i className="fas fa-user text-xl"></i>
              )}
            </div>
            <p className="ml-3 text-primary text-lg uppercase">
              {user.user.name}
            </p>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 bg-white shadow-md rounded-lg overflow-hidden divide-y-2 space-y-2"
                style={{
                  zIndex: 1000,
                  width: "250px",
                  top: "calc(100% + 8px)",
                }}
              >
                <ul className="border-b border-gray-400">
                  <li className="px-4 py-2">{user.user.name}</li>
                  <li className="px-4 text-gray-500">{user.user.email}</li>
                </ul>
                <ul>
                  <li>
                    <a
                      href="/info-user"
                      className="block px-4 py-2 custom-text-gray hover:bg-gray-100 hover:text-black"
                    >
                      To Page User
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="block px-4 py-2 custom-text-gray hover:bg-gray-100 hover:text-black"
                    >
                      To Page Home
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <Content className="bg-white">
          <div>{content}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
