import imgCatogeryBg from "../../assets/Images/Catogery.jpg";
import Catogery from "./catogery";
import { useTranslation } from "react-i18next";

function CategorySection() {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="bg-center bg-cover pb-[5%]"
        style={{
          backgroundImage: `url(${imgCatogeryBg})`,
        }}
      >
        <div className="flex justify-between items-center px-[7%] py-[5%] text-white">
          <div className="flex items-center space-x-4">
            <img src="/triangle.svg" alt="Icon" className="w-8 h-8" />
            <h2 className="text-white text-[1.3rem] p-5  md:text-[2rem] font-montserrat">
              {t("ChooseCategory")}
            </h2>
          </div>
          <p className="text-sm  w-[30%]  font-montserrat text-14 leading-7 opacity-0 lg:opacity-100">
            {t("CategoryDescription")}
          </p>
        </div>

        <Catogery />
      </div>
    </div>
  );
}

export default CategorySection;
