import fetcher from "../api/fetcher";
import type { AxiosResponse } from "axios";
import type { ViTri, ApiResponse, PaginatedViTri } from "../types/ViTri";
export const viTriServices = {
  getListViTri: (): Promise<AxiosResponse<ApiResponse<ViTri[]>>> =>
    fetcher.get(`/vi-tri`),

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
  ): Promise<ApiResponse<PaginatedViTri>> =>
    fetcher
      .get(
        `/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
      )
      .then((res) => res.data),

  getViTriInfo: (id: number | string): Promise<ApiResponse<ViTri>> =>
    fetcher.get(`/vi-tri/${id}`).then((res) => res.data),
};
