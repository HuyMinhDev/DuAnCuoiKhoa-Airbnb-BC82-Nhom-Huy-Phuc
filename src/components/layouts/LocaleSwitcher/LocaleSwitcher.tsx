import React from "react";
import { useTranslation } from "react-i18next";

import flaguk from "../../../assets/image/flag-uk.svg";
import flagvietnam from "../../../assets/image/flag-vietnam.svg";

// Danh sách ngôn ngữ hỗ trợ
const locales = [
  { code: "en", icon: flaguk, alt: "English" },
  { code: "vi", icon: flagvietnam, alt: "Tiếng Việt" },
];

const LocaleSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const handleSwitch = (code: string) => {
    if (code === currentLocale) return;
    i18n.changeLanguage(code);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => handleSwitch(locale.code)}
          className={`rounded-full transition-all cursor-pointer p-1
            ${
              currentLocale === locale.code
                ? "bg-white shadow"
                : "opacity-60 hover:opacity-100"
            }`}
          aria-label={locale.alt}
        >
          <img
            src={locale.icon}
            alt={locale.alt}
            className="w-6 h-6"
            style={{
              filter:
                currentLocale === locale.code
                  ? "none"
                  : "grayscale(0.5) brightness(0.9)",
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default LocaleSwitcher;
