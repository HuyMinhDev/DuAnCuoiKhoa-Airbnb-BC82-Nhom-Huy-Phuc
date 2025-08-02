// services/userService.ts
import axios from "axios";
import type { User } from "../types/User";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8";

// Lấy danh sách người dùng
export const getUserList = async (): Promise<User[]> => {
  const response = await axios.get(
    "https://airbnbnew.cybersoft.edu.vn/api/users",
    {
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }
  );
  return response.data.content;
};

// Cập nhật người dùng
export const updateUserApi = (id: number, data: Partial<User>) => {
  return axios.put(`https://airbnbnew.cybersoft.edu.vn/api/users/${id}`, data, {
    headers: {
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  });
};

// Xóa người dùng

export const deleteUserApi = async (id: number) => {
  return axios.delete(`https://airbnbnew.cybersoft.edu.vn/api/users?id=${id}`, {
    headers: {
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  });
};
