import React from "react";
import Carousel from "./Carousel";
import SelectForm from "./SelectForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import List from "./List";
import Locations from "./Location";

const Homepage = () => {
  const { themeMode } = useSelector((state: RootState) => state.darkModeSlice);
  return (
    <div className={`${themeMode}`}>
      <Carousel />
      <SelectForm />
      <List />
      <Locations />
    </div>
  );
};

export default Homepage;
