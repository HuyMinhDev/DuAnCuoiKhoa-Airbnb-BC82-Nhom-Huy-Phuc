import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardContent: React.FC = () => {
  const [userStats, setUserStats] = useState({ user: 0, admin: 0 });
  const [roomStats, setRoomStats] = useState<
    { location: string; count: number }[]
  >([]);

  useEffect(() => {
    setUserStats({ user: 120, admin: 10 });
    setRoomStats([
      { location: "Hà Nội", count: 25 },
      { location: "TP HCM", count: 40 },
      { location: "Đà Nẵng", count: 15 },
      { location: "Nha Trang", count: 20 },
    ]);
  }, []);

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        Thống kê tổng quan
      </h1>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Biểu đồ người dùng">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    { name: "Người dùng", value: userStats.user },
                    { name: "Quản trị", value: userStats.admin },
                  ]}
                  outerRadius={100}
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Biểu đồ phòng theo vị trí">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomStats}>
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
