import { createAsyncThunk } from "@reduxjs/toolkit";
import { viTriServices } from "../../services/viTriServices";
import type { PaginatedViTri, ViTri } from "../../types/ViTri";

// Action: Lấy danh sách vị trí có phân trang và tìm kiếm
export const fetchListViTriAction = createAsyncThunk<
  PaginatedViTri, // Kết quả trả về
  { currentPage: number; valueInput: string } // Tham số truyền vào
>(
  "quanLyViTriSlice/fetchListViTriAction",
  async ({ currentPage, valueInput }) => {
    const result = await viTriServices.findViTri2(currentPage, 3, valueInput);
    return result.content;
  }
);

// Action: Lấy thông tin chi tiết của 1 vị trí
export const fetchViTriInfoAction = createAsyncThunk<ViTri, number>(
  "quanLyViTriSlice/fetchViTriInfoAction",
  async (id: number) => {
    const result = await viTriServices.getViTriInfo(id);
    return result.content;
  }
);
