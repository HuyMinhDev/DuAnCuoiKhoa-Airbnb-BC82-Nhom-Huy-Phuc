import axios from "axios";
import type { Room } from "../types/Room";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "../types/ViTri"; // đảm bảo bạn có định nghĩa này

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8";

export const getRoomList = async (): Promise<Room[]> => {
  const response = await axios.get(`${BASE_URL}/phong-thue`, {
    headers: {
      TokenCybersoft: TOKEN,
    },
  });
  return response.data.content;
};

export const deleteRoom = async (id: number) => {
  return axios.delete(`${BASE_URL}/phong-thue/${id}`, {
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMDYxIiwiZW1haWwiOiJodXlkZXZAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNzU0MjMxMTk3LCJleHAiOjE3NTQ4MzU5OTd9.lWcLW21aZJGfwuWSBshAUWAIXK1GbBTxifQbN3lIplQ",
      TokenCybersoft: TOKEN,
    },
  });
};

export const updateRoom = (
  roomId: number | string,
  roomData: Partial<Room>
): Promise<AxiosResponse<ApiResponse<Room>>> => {
  // const userLogin = localStorage.getItem("USER_LOGIN");
  // const parsedUser = userLogin ? JSON.parse(userLogin) : null;
  // const accessToken = parsedUser?.token;

  return axios.put(`${BASE_URL}/phong-thue/${roomId}`, roomData, {
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMDYxIiwiZW1haWwiOiJodXlkZXZAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNzU0MjMxMTk3LCJleHAiOjE3NTQ4MzU5OTd9.lWcLW21aZJGfwuWSBshAUWAIXK1GbBTxifQbN3lIplQ", // lấy từ localStorage
      tokenCybersoft: TOKEN,
      "Content-Type": "application/json",
    },
  });
};

export const createRoom = (
  roomData: Partial<Room>
): Promise<AxiosResponse<ApiResponse<Room>>> => {
  return axios.post(`${BASE_URL}/phong-thue`, roomData, {
    headers: {
      TokenCybersoft: TOKEN,
      "Content-Type": "application/json",
    },
  });
};
