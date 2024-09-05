import ProductDetailsImage from "../../assets/Images/details.jpg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Details() {
  const { t, i18n } = useTranslation();

  return (
    <div className={`grid grid-cols-2 gap-10 px-[7%] py-5 md:py-[3%] md:px-[7%] ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="bg-slate-400 col-span-2 sm:col-span-1">
        <img src={ProductDetailsImage} alt="Product" className="w-full h-auto" />
      </div>
      <div className="col-span-2 sm:col-span-1 px-3 sticky top-5">
        <h2 className="text-titleColor text-[1.2rem] md:text-[1.5rem] font-light mb-2 md:mb-5">
          {t("Rozana nightstand")}
        </h2>
        <p className="text-mainColor mb-2 md:mb-5">7,900EGP</p>
        <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
          White Zen wood
        </p>
        <p className="text-textColor text-[0.8rem] mb-5 md:mb-[3rem]">
          <span className="font-bold text-[0.8rem]">{t("Size")}:</span> 65 x 46
        </p>
        <div className="flex gap-2 mb-5 md:mb-[5rem]">
          <button className="text-[14px] md:text-[14px] p-[0.3rem] border border-textColor">
            <span className="px-2">-</span> 1 <span className="px-2">+</span>
          </button>
          <button className="text-[12px] md:text-[14px] p-[0.6rem] px-7 border border-mainColor hover:text-[#fff] hover:bg-mainColor">
            {t("ADD TO CART")}
          </button>
        </div>
        <div>
          <p className="text-titleColor text-[0.8rem]">
            {`${t("Category")}:`}
            <NavLink to="/Products" className="text-textColor">
              {t("New Arrival")}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
