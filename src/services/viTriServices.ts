import fetcher from "../api/fetcher";
import type { AxiosResponse } from "axios";
import type { ViTri, ApiResponse, PaginatedViTri } from "../types/ViTri";
export const viTriServices = {
  getListViTri: (): Promise<AxiosResponse<ApiResponse<ViTri[]>>> =>
    fetcher.get(`/vi-tri`),

  uploadHinhViTri: (
    formData: FormData,
    id: number | string,
    tokenBearer: string
  ): Promise<AxiosResponse<ApiResponse<string>>> =>
    fetcher.post(`/vi-tri/upload-hinh-vitri?maViTri=${id}`, formData, {
      headers: { token: tokenBearer },
    }),

  addVitri: (
    viTriData: Partial<ViTri>,
    tokenBearer: string
  ): Promise<AxiosResponse<ApiResponse<ViTri>>> =>
    fetcher.post(`/vi-tri`, viTriData, {
      headers: { token: tokenBearer },
    }),

  deleteViTri: (
    id: number | string,
    tokenBearer: string
  ): Promise<AxiosResponse<ApiResponse<string>>> =>
    fetcher.delete(`/vi-tri/${id}`, {
      headers: { token: tokenBearer },
    }),

  // Tìm kiếm vị trí theo tỉnh thành với phân trang (giới hạn kết quả)
  findViTri: (
    tinhThanh: string,
    pageIndex = 1,
    pageSize = 8
  ): Promise<AxiosResponse<ApiResponse<PaginatedViTri>>> =>
    fetcher.get(
      `/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${tinhThanh}`
    ),

  // Tìm kiếm mở rộng với truyền đủ tham số
  findViTri2: (
    pageIndex: number,
    pageSize: number,
    keyword: string
  ): Promise<AxiosResponse<ApiResponse<PaginatedViTri>>> =>
    fetcher.get(
      `/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
    ),

  getViTriInfo: (
    id: number | string
  ): Promise<AxiosResponse<ApiResponse<ViTri>>> => fetcher.get(`/vi-tri/${id}`),

  editViTri: (
    id: number | string,
    viTriData: Partial<ViTri>,
    tokenBearer: string
  ): Promise<AxiosResponse<ApiResponse<ViTri>>> =>
    fetcher.put(`/vi-tri/${id}`, viTriData, {
      headers: { token: tokenBearer },
    }),
};
