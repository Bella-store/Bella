import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import About from "../Components/AboutSection";
import CategorySection from "../Components/CategorySection";
import RelatedProducts from "../Components/RelatedProducts";
import BtnMore from "../Components/BtnMore";
import Services from "../Components/Services";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div style={{ height: "2000px" }}>
      <Navbar />
      <Hero />
      <About />
      <CategorySection />
      <Services />

      <div className="px-[7%] py-5 md:py-[3%] md:px-[7%]">
        <p className="text-[18px] font-normal leading-[1.5] text-mainColor font-Montserrat letter-spacing-2">
          {t("OurProducts")}
        </p>
        <h2 className="text-titleColor text-[2rem] md:text-[2.3rem] mb-5 font-semibold">
          {t("Collections")}
        </h2>
        <RelatedProducts />
        <div className="flex justify-center items-center p-10">
          <BtnMore />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
