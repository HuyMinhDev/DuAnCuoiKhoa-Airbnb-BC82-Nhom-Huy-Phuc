import axios from "axios";
import type { Room } from "../types/Room";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "../types/ViTri";

const BASE_URL = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8`;

export const getRoomList = async (): Promise<Room[]> => {
  const response = await axios.get(
    `${BASE_URL}/phong-thue/lay-phong-theo-vi-tri?maViTri=1`,
    {
      headers: {
        TokenCybersoft: TOKEN,
      },
    }
  );
  return response.data.content;
};

export const deleteRoom = async (id: number) => {
  return axios.delete(`${BASE_URL}/phong-thue/${id}`, {
    headers: {
      TokenCybersoft: TOKEN,
    },
  });
};

export const updateRoom = (
  roomId: number | string,
  roomData: Partial<Room>
): Promise<AxiosResponse<ApiResponse<Room>>> => {
  return axios.put(`${BASE_URL}/phong-thue/`, {
    headers: {
      TokenCybersoft: TOKEN,
      "Content-Type": "application/json",
    },
  });
};
