import React from "react";
import type { ReactNode } from "react";
import TempHeader from "../../components/layouts/TempHeader/Header";
import Footer from "../../components/layouts/TempFooter/Footercial";

// import Header from "./Header";
// import Footer from "./Footer";
// import "./HomeLayout.scss";
// import BackToTop from "../BackToTop/BackToTop";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="home-layout">
      <header>
        <TempHeader />
      </header>

      {children}

      <footer>
        <Footer />
      </footer>

      {/* <BackToTop /> */}
    </div>
  );
}
