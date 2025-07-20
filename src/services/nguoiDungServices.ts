import type { AxiosResponse } from "axios";
import type {
  User,
  EditUserRequest,
  UploadAvatarResponse,
  DefaultResponse,
  ApiResponse,
} from "../types/User";
import fetcher from "../api/fetcher";

export const nguoiDungServices = {
  getListUser: (): Promise<AxiosResponse<User[]>> => fetcher.get("/users"),
  getListUserGoole: (): Promise<AxiosResponse<{ content: User[] }>> =>
    fetcher.get("/users"),

  getUserInfo: (id: number): Promise<AxiosResponse<ApiResponse<User>>> =>
    fetcher.get(`/users/${id}`),

  editUser: (
    id: number,
    userInfo: EditUserRequest
  ): Promise<AxiosResponse<DefaultResponse>> =>
    fetcher.put(`/users/${id}`, userInfo),

  uploadHinhUser: (
    formFile: FormData,
    tokenBearer: string
  ): Promise<AxiosResponse<UploadAvatarResponse>> =>
    fetcher.post(`/users/upload-avatar`, formFile, {
      headers: { token: tokenBearer },
    }),
};
