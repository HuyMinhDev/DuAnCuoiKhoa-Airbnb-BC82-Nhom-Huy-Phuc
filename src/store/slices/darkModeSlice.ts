import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Lấy dữ liệu từ localStorage
const themeModeJson = localStorage.getItem("themeMode");

// Kiểu cho state
interface DarkModeState {
  themeMode: "light" | "dark";
}

// Giá trị khởi tạo
const initialState: DarkModeState = {
  themeMode: themeModeJson === "dark" ? "dark" : "light",
};

const darkModeSlice = createSlice({
  name: "darkModeSlice",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.themeMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
  },
});

export const { setThemeMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
