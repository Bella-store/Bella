import React from "react";
import aboutImg1 from "../../assets/Images/about1.jpg";
import aboutImg2 from "../../assets/Images/about2.jpg";
import { useTranslation } from "react-i18next";

function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div
      className={`grid grid-cols-6 my-4 md:grid-cols-3 gap-5 justify-center items-center p-3 md:p-5 md:py-[3%] md:px-[7%] px-[7%] bg-[#F7F7F7]`}
    >
      <div className="col-span-6 md:col-span-1 text-center md:text-start p-2">
        <div className="font-Montserrat">
          <h2 className="text-[14px] md:text-[1.3rem] font-normal leading-[1.4] text-mainColor mb-2 font-Montserrat letter-spacing">
            {t("AboutUs")}
          </h2>
          <p className="capitalize text-titleColor mb-3 text-[1.1rem] font-Montserrat">
            {t("BestFurniture")}
          </p>
          <p className="text-textColor mb-4 text-[14px] md:text-[1.1rem] font-Montserrat">
            {t("AboutUsDetails")}
          </p>
          <button
            className="text-[12px] md:text-[14px] p-[0.6rem] px-5 md:p-[0.9rem] md:px-7 relative border border-textColor  
          after:content-[''] after:absolute after:top-[20] after:left-[-18px] after:w-[20%] after:h-[40%] after:bg-[#F7F7F7]  hover:after:opacity-0
          before:content-[''] before:absolute before:top-[20] before:right-[-18px] before:w-[20%] before:h-[40%] before:bg-[#F7F7F7]  hover:before:opacity-0
         transition ease-in duration-300 hover:text-mainColor hover:border-mainColor hover:p-[0.7rem] hover:px-5 md:hover:p-[0.9rem] md:hover:px-7"
          >
            {t("MoreAboutUs")}
          </button>
        </div>
      </div>

      {/* Conditionally reverse the order of images based on the text direction */}
      <div
        className={`col-span-2 md:col-span-1 relative ${
          isRtl ? "md:right-[13rem]" : "md:left-[13rem]"
        } w-[120%] md:w-[80%] z-3`}
      >
        <img src={aboutImg2} alt="aboutUs" className="" />
      </div>

      <div className={`col-span-4 md:col-span-1 relative z-5 ${isRtl ? "pl-2" : "pr-2"}`}>
        <img src={aboutImg1} alt="aboutUs" />
      </div>
    </div>
  );
}

export default About;
