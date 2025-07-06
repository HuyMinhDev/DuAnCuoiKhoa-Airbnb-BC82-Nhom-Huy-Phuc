import fetcher from "../api/fetcher";
import type { AxiosResponse } from "axios";
import type { Booking, ApiResponse } from "../types/Booking";

export const bookingServices = {
  getListBooking: (): Promise<AxiosResponse<ApiResponse<Booking[]>>> =>
    fetcher.get(`/api/dat-phong`),

  searchBooking: (
    maNguoiDung: number | string
  ): Promise<AxiosResponse<ApiResponse<Booking[]>>> =>
    fetcher.get(`/api/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`),

  deleteBooking: (
    id: number | string
  ): Promise<AxiosResponse<ApiResponse<null>>> =>
    fetcher.delete(`/api/dat-phong/${id}`),

  getBookingInfo: (
    id: number | string
  ): Promise<AxiosResponse<ApiResponse<Booking>>> =>
    fetcher.get(`/api/dat-phong/${id}`),

  createBooking: (
    booking: Booking
  ): Promise<AxiosResponse<ApiResponse<Booking>>> =>
    fetcher.post(`/api/dat-phong`, booking),

  editBooking: (
    id: number | string,
    bookingInfo: Booking
  ): Promise<AxiosResponse<ApiResponse<Booking>>> =>
    fetcher.put(`/api/dat-phong/${id}`, bookingInfo),
};
