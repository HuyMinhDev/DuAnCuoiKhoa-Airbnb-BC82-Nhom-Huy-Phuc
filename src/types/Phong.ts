export interface Phong {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export type CreatePhongPayload = Omit<Phong, "id" | "hinhAnh">;

export type EditPhongPayload = Partial<CreatePhongPayload>;

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  content: T;
}

export interface UploadPhongResponse {
  statusCode: number;
  message: string;
  content: string;
}
