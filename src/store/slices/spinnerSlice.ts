import { createSlice } from "@reduxjs/toolkit";

interface SpinnerState {
  isLoading: boolean;
}

const initialState: SpinnerState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    turnOnLoading: (state) => {
      state.isLoading = true;
    },
    turnOffLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { turnOnLoading, turnOffLoading } = spinnerSlice.actions;

export default spinnerSlice.reducer;
