// Kiểu dữ liệu trả về từ backend API chung
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  content: T;
}

// Một bản ghi đặt phòng
export interface Booking {
  id?: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

// State của Redux slice booking
export interface BookingState {
  listIdBooking: number[] | null;
  isBooked: boolean;
  totalDay: number;
  // ngayDen: Date;
  // ngayDi: Date;
  ngayDen: Date | string;
  ngayDi: Date | string;
  soLuongKhach: number;
  tienTruocThue: number | null;
  isModalCalendarOpen: boolean;
  isModalPaymentOpen: boolean;
  isModalReBookingOpen: boolean;
}
