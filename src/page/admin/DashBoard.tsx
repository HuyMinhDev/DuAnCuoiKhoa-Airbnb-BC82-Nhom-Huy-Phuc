import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Dữ liệu giả lập
const userStats = [
  { name: "T1", users: 20 },
  { name: "T2", users: 35 },
  { name: "T3", users: 45 },
  { name: "T4", users: 60 },
  { name: "T5", users: 75 },
  { name: "T6", users: 90 },
  { name: "T7", users: 110 },
];

const bookingStats = [
  { name: "T1", bookings: 10 },
  { name: "T2", bookings: 30 },
  { name: "T3", bookings: 50 },
  { name: "T4", bookings: 40 },
  { name: "T5", bookings: 80 },
  { name: "T6", bookings: 65 },
  { name: "T7", bookings: 95 },
];

const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    // Giả lập gọi API để lấy thống kê
    setTotalUsers(157);
    setTotalBookings(286);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card bordered={false}>
            <Statistic title="👥 Tổng người dùng" value={totalUsers} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card bordered={false}>
            <Statistic title="📦 Tổng lượt đặt phòng" value={totalBookings} />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="📈 Biểu đồ người dùng theo tháng">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={userStats}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#1890ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="📊 Biểu đồ lượt đặt phòng theo tháng">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bookingStats}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
