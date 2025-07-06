import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import airbnbLogo from "../../../assets/image/airbnb-1.aabeefedaf30b8c7011a022cdb5a6425.png";
import { useTranslation } from "react-i18next";
import trip from "../../../assets/logo/trip.png";
import klook from "../../../assets/logo/Klook.png";
import traveloka from "../../../assets/logo/traveloka.png";
import ivivu from "../../../assets/logo/ivivu.png";
import mytour from "../../../assets/logo/mytour.png";
import booking from "../../../assets/logo/Booking.svg";
import tiket from "../../../assets/logo/tiket.png";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLinkClick = () => {
    window.location.href = "https://www.airbnb.com.vn/";
  };

  return (
    <footer className="bg-footer text-white py-12" id="lienHe">
      <div className="container mx-auto px-4">
        <div className="bg-footer-top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div>
            <div className="space-y-2">
              <div
                className="flex text-2xl font-bold cursor-pointer items-center"
                onClick={() => navigate("/")}
              >
                <img
                  src={airbnbLogo}
                  className="w-10 h-8 object-contain mr-2"
                  alt="Airbnb logo"
                />
                <span className="text-3xl text-primary">airpnp</span>
              </div>
              <p>
                Email:
                <span className="text-white"> nguyenminhhuy2410@gmail.com</span>
              </p>
              <p className="uppercase text-sm">
                {t("homepage.Footer.row1.customerServices")}
              </p>
              <p className="text-white">+(84) 344375201</p>
            </div>

            <div className="mt-5">
              <h3 className="font-semibold text-lg mb-4">
                {t("homepage.Footer.row1.Partner")}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 gap-4">
                <Link
                  to="https://www.agoda.com/vi-vn/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Agoda_logo_2019.svg/2560px-Agoda_logo_2019.svg.png"
                    className="w-10 h-10 object-contain"
                    alt="agoda"
                  />
                </Link>
                <Link
                  to="https://www.trip.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={trip}
                    className="w-10 h-10 object-contain"
                    alt="trip"
                  />
                </Link>
                <Link
                  to="https://www.klook.com/vi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={klook}
                    className="w-10 h-10 object-contain"
                    alt="klook"
                  />
                </Link>
                <Link
                  to="https://www.traveloka.com/vi-vn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={traveloka}
                    className="w-10 h-10 object-contain"
                    alt="traveloka"
                  />
                </Link>
                <Link
                  to="https://www.ivivu.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={ivivu}
                    className="w-10 h-10 object-contain"
                    alt="ivivu"
                  />
                </Link>
                <Link to="https://mytour.vn/" target="_blank" rel="noreferrer">
                  <img
                    src={mytour}
                    className="w-10 h-10 object-contain"
                    alt="mytour"
                  />
                </Link>
                <Link
                  to="https://www.booking.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={booking}
                    className="w-10 h-10 object-contain"
                    alt="booking"
                  />
                </Link>
                <Link
                  to="https://www.tiket.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={tiket}
                    className="w-10 h-10 object-contain"
                    alt="tiket"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("homepage.Footer.row2.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                t("homepage.Footer.row2.how_airbnb_works"),
                t("homepage.Footer.row2.newsroom"),
                t("homepage.Footer.row2.investors"),
                t("homepage.Footer.row2.airbnb_plus"),
                t("homepage.Footer.row2.airbnb_luxe"),
                t("homepage.Footer.row2.hotel_tonight"),
                t("homepage.Footer.row2.airbnb_for_work"),
                t("homepage.Footer.row2.thanks_to_hosts"),
                t("homepage.Footer.row2.careers"),
              ].map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex items-center gap-2 hover:text-[#FE6B6E] transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  <ChevronRight size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Informational Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("homepage.Footer.row3.title")}
            </h4>
            <ul className="space-y-2 text-sm mb-5">
              {[
                t("homepage.Footer.row3.diversity_belonging"),
                t("homepage.Footer.row3.accessibility_features"),
                t("homepage.Footer.row3.airbnb_affiliates"),
                t("homepage.Footer.row3.frontline_stays"),
                t("homepage.Footer.row3.guest_referrals"),
                t("homepage.Footer.row3.airbnb_org"),
              ].map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex items-center gap-2 hover:text-[#FE6B6E] transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  <ChevronRight size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("homepage.Footer.row4.title")}
            </h4>
            <ul className="space-y-2 text-sm mb-5">
              {[
                t("homepage.Footer.row4.renting_home"),
                t("homepage.Footer.row4.host_online_experience"),
                t("homepage.Footer.row4.host_experience"),
                t("homepage.Footer.row4.responsible_hosting"),
                t("homepage.Footer.row4.resource_center"),
                t("homepage.Footer.row4.community_center"),
              ].map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex items-center gap-2 hover:text-[#FE6B6E] transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  <ChevronRight size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-2">
              {t("homepage.Footer.row4.sub")}
            </h4>
            <div className="subscribe-item flex flex-col sm:flex-row items-stretch sm:items-center">
              <input
                type="text"
                placeholder="Email*"
                className="p-2 text-black text-sm rounded-t-md sm:rounded-l-md sm:rounded-tr-none w-full sm:w-auto"
              />
              <button className="bg-primary px-4 py-2 text-sm rounded-b-md sm:rounded-r-md sm:rounded-bl-none w-full sm:w-auto">
                Subscribe
              </button>
            </div>

            <div className="flex flex-wrap items-center space-x-3 mt-5">
              <span className="text-sm">{t("homepage.Footer.row4.flow")}:</span>
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faGithub} />
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-footer-end mt-12 pt-6 text-sm flex flex-col gap-4 md:flex-row justify-between items-center text-center md:text-left">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {["/terms-of-use", "/privacyPolicy", "/faq", "/playlist"].map(
                (path) => (
                  <Link
                    key={path}
                    to={path}
                    className="hover:text-primary transition-colors"
                  >
                    {path.replace("/", "").replace(/-/g, " ")}
                  </Link>
                )
              )}
            </div>
            <p>
              © <span className="currentYear">2025</span>{" "}
              <span className="text-primary">AIRPNP</span>. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/videos">
              <img
                src="/images/Footer/google-play.webp"
                alt="Google Play"
                className="h-8 md:h-10"
              />
            </Link>
            <Link to="/videos">
              <img
                src="/images/Footer/apple.webp"
                alt="App Store"
                className="h-8 md:h-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
