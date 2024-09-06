import Details from "../Components/DetailsSection";
import Navbar from "../Components/Navbar";
import Link from "../Components/Links";
import RelatedProducts from "../Components/RelatedProducts";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";

function ProductDetails() {
  const { i18n } = useTranslation();

  return (
    <div className={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Link />
      <Navbar />
      <Details />
      <div className="px-[7%] py-5 md:py-[3%] md:px-[7%]">
        <h2 className="text-titleColor text-[1.3rem] md:text-[1.6rem] mb-2 md:mb-5 font-semibold">
          {i18n.language === "ar" ? "منتجات ذات صلة" : "Related Products"}
        </h2>
        <RelatedProducts />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
