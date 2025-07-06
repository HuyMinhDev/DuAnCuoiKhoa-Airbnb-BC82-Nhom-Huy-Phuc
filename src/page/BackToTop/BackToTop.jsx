// src/components/BackToTop.jsx
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Hoặc dùng icon tuỳ thích
import "./BackToTop.scss"; // Tuỳ chọn nếu dùng CSS riêng

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-800 text-white p-3 rounded-full shadow-lg transition-all z-50"
    >
      <ArrowUp />
    </button>
  );
}
