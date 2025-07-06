import React from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import type { RootState } from "../../../store/store";

export default function Spinner() {
  const isLoading = useSelector(
    (state: RootState) => state.spinnerSlice.isLoading
  );

  return isLoading ? (
    <div className="fixed h-screen w-screen top-0 left-0 bg-black z-20 flex justify-center items-center">
      <HashLoader color="#48dd27" size={50} speedMultiplier={1} />
    </div>
  ) : null;
}
