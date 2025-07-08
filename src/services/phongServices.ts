import fetcher from "../api/fetcher";
import type {
  Phong,
  ApiResponse,
  CreatePhongPayload,
  EditPhongPayload,
  UploadPhongResponse,
} from "../types/Phong";

export const phongServices = {
  // Lấy danh sách tất cả phòng
  getListPhong: (): Promise<ApiResponse<Phong[]>> =>
    fetcher.get(`/phong-thue`).then((res) => res.data),

  // Phân trang + tìm kiếm
  findPhong: (
    pageIndex: number,
    pageSize: number,
    keyword: string
  ): Promise<ApiResponse<Phong[]>> =>
    fetcher.get(
      `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
    ),

  // Lấy phòng theo vị trí
  locationPhong: (id: number | string): Promise<ApiResponse<Phong[]>> =>
    fetcher
      .get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`)
      .then((res) => res.data),

  // Xoá phòng
  deletePhong: (
    id: number | string,
    tokenBearer: string
  ): Promise<ApiResponse<void>> =>
    fetcher.delete(`/phong-thue/${id}`, {
      headers: { token: tokenBearer },
    }),

  // Lấy thông tin phòng chi tiết
  getPhongInfo: (id: number | string): Promise<ApiResponse<Phong>> =>
    fetcher.get(`/phong-thue/${id}`),

  // Tạo mới phòng
  createPhong: (
    phongData: CreatePhongPayload,
    tokenBearer: string
  ): Promise<ApiResponse<Phong>> =>
    fetcher.post(`/phong-thue`, phongData, {
      headers: { token: tokenBearer },
    }),

  // Upload hình ảnh phòng
  uploadHinhPhong: (
    formData: FormData,
    maPhong: number | string,
    tokenBearer: string
  ): Promise<UploadPhongResponse> =>
    fetcher.post(`/phong-thue/upload-hinh-phong?maPhong=${maPhong}`, formData, {
      headers: { token: tokenBearer },
    }),

  // Chỉnh sửa phòng
  editPhong: (
    id: number | string,
    phongData: EditPhongPayload,
    tokenBearer: string
  ): Promise<ApiResponse<Phong>> =>
    fetcher.put(`/phong-thue/${id}`, phongData, {
      headers: { token: tokenBearer },
    }),
};
