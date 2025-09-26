import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList, // ✅ thêm import LabelList
} from "recharts";
import { nguoiDungServices } from "../../services/nguoiDungServices";
import { phongServices } from "../../services/phongServices";
import { bookingServices } from "../../services/bookingServices";
import { viTriServices } from "../../services/viTriServices";
import dayjs from "dayjs";

interface UserChartData {
  year: string;
  total: number;
}

interface RoomChartData {
  name: string;
  total: number;
}

interface BookingChartData {
  month: string;
  total: number;
}

interface LocationChartData {
  district: string;
  total: number;
}

const COLORS = [
  "#2563EB",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F43F5E",
];

const DashboardCharts: React.FC = () => {
  const [userChartData, setUserChartData] = useState<UserChartData[]>([]);
  const [totalAllUsers, setTotalAllUsers] = useState<number>(0);

  const [roomChartData, setRoomChartData] = useState<RoomChartData[]>([]);
  const [totalAllRooms, setTotalAllRooms] = useState<number>(0);

  const [bookingChartData, setBookingChartData] = useState<BookingChartData[]>(
    []
  );
  const [totalAllBookings, setTotalAllBookings] = useState<number>(0);

  const [locationChartData, setLocationChartData] = useState<
    LocationChartData[]
  >([]);
  const [totalAllLocations, setTotalAllLocations] = useState<number>(0);

  // ===== User theo NĂM =====
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await nguoiDungServices.getListUserAdmin();
        console.log("res: ", res);
        const users = res.data.content || [];
        setTotalAllUsers(users.length);

        const grouped: { [key: string]: number } = {};
        users.forEach((user) => {
          const year = parseInt(dayjs(user.birthday).format("YYYY"), 10);

          if (year >= 2000 && year <= 2025) {
            grouped[year] = (grouped[year] || 0) + 1;
          }
        });

        const formatted = Object.entries(grouped)
          .map(([year, total]) => ({ year, total }))
          .sort((a, b) => a.total - b.total);

        setUserChartData(formatted);
      } catch (err) {
        console.error("Lỗi tải dữ liệu user:", err);
      }
    };

    fetchUsers();
  }, []);

  // ===== Phòng theo số phòng ngủ =====
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await phongServices.getListPhong();
        const rooms = res.content || [];
        setTotalAllRooms(rooms.length);

        const grouped: { [key: string]: number } = {};
        rooms.forEach((room) => {
          const key = `${room.phongNgu || 0} phòng ngủ`;
          grouped[key] = (grouped[key] || 0) + 1;
        });

        const formatted = Object.entries(grouped)
          .map(([name, total]) => ({ name, total }))
          .sort((a, b) => a.total - b.total);

        setRoomChartData(formatted);
      } catch (err) {
        console.error("Lỗi tải dữ liệu phòng:", err);
      }
    };

    fetchRooms();
  }, []);

  // ===== Booking theo tháng =====
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingServices.getListBooking();
        const bookings = res.data.content || [];
        setTotalAllBookings(bookings.length);

        const grouped: { [key: string]: number } = {};
        bookings.forEach((booking) => {
          const month = dayjs(booking.ngayDi).format("MM/YYYY");

          grouped[month] = (grouped[month] || 0) + 1;
        });

        const formatted = Object.entries(grouped)
          .map(([month, total]) => ({ month, total }))
          .sort(
            (a, b) =>
              dayjs(a.month, "MM/YYYY").toDate().getTime() -
              dayjs(b.month, "MM/YYYY").toDate().getTime()
          );

        setBookingChartData(formatted);
      } catch (err) {
        console.error("Lỗi tải dữ liệu booking:", err);
      }
    };

    fetchBookings();
  }, []);

  // ===== Vị trí theo Tỉnh =====
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await viTriServices.getListViTri();
        const locations = res.data.content || [];
        setTotalAllLocations(locations.length);

        const grouped: { [key: string]: number } = {};
        locations.forEach((loc) => {
          const province = loc.tinhThanh || "Không xác định";
          grouped[province] = (grouped[province] || 0) + 1;
        });

        const formatted = Object.entries(grouped)
          .map(([province, total]) => ({
            district: province,
            total,
          }))
          .sort((a, b) => a.total - b.total);

        setLocationChartData(formatted);
      } catch (err) {
        console.error("Lỗi tải dữ liệu vị trí:", err);
      }
    };

    fetchLocations();
  }, []);

  const boldText = { fontSize: 14, fontWeight: "bold", fill: "#333" };

  const renderBarChart = (
    title: string,
    totalLabel: string,
    total: number,
    data: any[],
    dataKey: string,
    xKey: string,
    isLarge?: boolean
  ) => (
    <div
      style={{
        width: "100%",
        height: isLarge ? 550 : 500,
        marginBottom: 80,
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontSize: 28,
          marginBottom: 10,
          fontWeight: "bold",
          color: "#111",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "#555",
        }}
      >
        {totalLabel}: <b>{total}</b>
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={boldText} />
          <YAxis tick={boldText} />
          <Tooltip contentStyle={{ fontSize: 16, fontWeight: "bold" }} />
          <Legend wrapperStyle={{ fontSize: 16, fontWeight: "bold" }} />
          <Bar
            dataKey={dataKey}
            radius={[8, 8, 0, 0]}
            barSize={isLarge ? 50 : 40}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList
              dataKey={dataKey}
              position="top"
              style={{
                fontSize: 14,
                fontWeight: "bold",
                fill: "#111",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div style={{ width: "100%", padding: "20px", background: "#f9fafb" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div
          style={{
            flex: 1,
            background: "#111827",
            color: "#fff",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "14px", opacity: 0.8 }}>Người dùng</span>
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>
            {totalAllUsers}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            background: "#10b981",
            color: "#fff",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "14px", opacity: 0.8 }}>Booking </span>
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>
            {totalAllBookings}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            background: "#8b5cf6",
            color: "#fff",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "14px", opacity: 0.8 }}>
            Tổng phòng có trên các tỉnh thành
          </span>
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>
            {totalAllLocations}
          </span>
        </div>
      </div>

      {renderBarChart(
        "Biểu đồ User dựa theo năm sinh",
        "Tổng số user",
        totalAllUsers,
        userChartData,
        "total",
        "year",
        true
      )}
      {renderBarChart(
        "Biểu đồ số phòng theo số phòng ngủ",
        "Tổng số phòng",
        totalAllRooms,
        roomChartData,
        "total",
        "name"
      )}
      {renderBarChart(
        "Biểu đồ đặt phòng dựa trên tháng đi",
        "Tổng số đặt phòng",
        totalAllBookings,
        bookingChartData,
        "total",
        "month"
      )}
      {renderBarChart(
        "Biểu đồ vị trí số phòng theo tỉnh/thành phố",
        "Tổng số vị trí",
        totalAllLocations,
        locationChartData,
        "total",
        "district"
      )}
    </div>
  );
};

export default DashboardCharts;
