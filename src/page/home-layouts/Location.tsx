import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import type { CardItem } from "../../types";

export default function Locations() {
  const navigate = useNavigate();
  const { themeMode } = useSelector((state: RootState) => state.darkModeSlice);
  const { t } = useTranslation();
  const cards: CardItem[] = [
    {
      id: 1,
      title: t("homepage.Locations.description1"),
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75",
    },
    {
      id: 3,
      title: t("homepage.Locations.description2"),
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75",
    },
    {
      id: 7,
      title: t("homepage.Locations.description3"),
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75",
    },
    {
      id: 6,
      title: t("homepage.Locations.description4"),
      image:
        "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75",
    },
  ];

  const handleNavigate = (id: number) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div
      id="locationSection"
      className={`${themeMode} container mx-auto px-4 sm:px-6 lg:px-8 py-10`}
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">
        {t("homepage.Locations.title")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {cards.map((card) => (
          <div
            data-aos="flip-right"
            data-aos-duration="1000"
            key={card.id}
            className="aspect-[3/4] rounded-lg shadow-md overflow-hidden 
                   hover:shadow-xl transition duration-300 flex flex-col cursor-pointer card-item"
            onClick={() => handleNavigate(card.id)}
          >
            {/* Phần ảnh */}
            <div className="h-[75%]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Phần nội dung */}
            <div className="h-[25%] bg-white p-3 flex items-center justify-center text-center">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold leading-tight text-black">
                {card.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
