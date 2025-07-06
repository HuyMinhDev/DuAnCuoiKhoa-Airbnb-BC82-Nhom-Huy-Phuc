import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import spinnerReducer from "./slices/spinnerSlice";
import darkModeReducer from "./slices/darkModeSlice";
import bookingReducer from "./slices/bookingSlice";
import userSlice from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    counter: counterReducer,
    spinnerSlice: spinnerReducer,
    darkModeSlice: darkModeReducer,
    bookingSlice: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
