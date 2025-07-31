import TempHeader from "../../components/layouts/TempHeader/Header";
import Footer from "../../components/layouts/TempFooter/Footercial";
import BackToTop from "../BackToTop/BackToTop";
import type { HomeLayoutProps } from "../../types";
import Chatbot from "../../components/layouts/Chatbot/Chatbot";

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="home-layout min-h-screen flex flex-col">
      <header>
        <TempHeader />
      </header>

      <main className="flex-1 min-h-[500px]">{children}</main>
      <Chatbot />
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </div>
  );
}
