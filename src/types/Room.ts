export interface Room {
  id: number;
  maPhong: string;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  khach: number;
  maNguoiDung: number;
  hinhAnh: string;
  location: string;
  guestMax: number;
  [key: string]: any;
  maViTri: number | string;
}
