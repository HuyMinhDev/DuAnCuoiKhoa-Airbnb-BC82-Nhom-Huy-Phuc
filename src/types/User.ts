export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  birthday: string;
  avatar: string | null;
  gender: boolean;
  role: "USER" | "ADMIN";
}
