import React, { useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import AboutHero from "../../assets/Images/cas-1.jpg";
import SofaImage from "../../assets/Images/Hero.jpg";
import aboutImg1 from "../../assets/Images/about1.jpg";
import aboutImg2 from "../../assets/Images/about2.jpg";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  const smallImageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const moveValue = scrollTop * -0.02;
      if (smallImageRef.current) {
        smallImageRef.current.style.transform = `translateY(${moveValue}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar transparent={true} />
      <div
        style={{ backgroundImage: `url(${AboutHero})` }}
        className="bg-cover bg-center h-[40vh] md:h-[75vh] relative flex items-center text-pretty"
      >
        <div className="animate-fadeIn">
          <div className="text-white md:px-12 lg:px-20 text-2xl md:text-[4xl] font-extralight">
            {t("AboutUs")}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between px-[7%] my-[5%] bg-white">
        {/* Left Side - Text Content */}
        <div className="mb-8 lg:mb-0">
          <h2 className="text-[2rem] font-500 font-montserrat text-gray-800 mb-4">
            {t("WelcomeToBella")}
          </h2>
          <p className="text-md max-w-[60%] text-[#9b9b9b] font-montserrat mb-8 space-y-10 ">
            {t("AboutUsDescription")}
          </p>
          <div className="flex space-x-16 gap-6">
            <div>
              <p className="text-4xl font-semibold text-mainColor">165</p>
              <p className="text-sm text-gray-500">{t("ProductsCompleted")}</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-mainColor">300</p>
              <p className="text-sm text-gray-500">{t("OurClients")}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex items-center justify-center bg-black">
          <img
            src={SofaImage}
            alt="Luxury Sofa"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-4 items-center justify-center md:px-[7%] mb-[5%]">
        <div className="col-span-6 md:col-span-2 relative mr-[15%]">
          <img src={aboutImg1} alt="aboutUs" className="w-full md:w-[85%]" />
          <img
            ref={smallImageRef}
            src={aboutImg2}
            alt="aboutUs"
            className="absolute w-[100%] md:w-[60%] left-0 md:left-[60%] top-[8rem] md:top-[55%]"
          />
        </div>
        <div className="col-span-6 md:col-span-2 text-left md:text-left pl-[25%]">
          <div className="p-1">
            <h2 className="text-[14px] md:text-[1.3rem] font-normal leading-[1.4] text-mainColor mb-2 font-Montserrat letter-spacing">
              {t("AboutUs")}
            </h2>
            <p className="capitalize text-titleColor mb-3 text-[1.1rem] font-Montserrat ">
              {t("BestFurniture")}
            </p>
            <p className="text-textColor mb-2 text-[14px] md:text-[1.1rem] font-Montserrat ">
              {t("AboutUsDetails")}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
