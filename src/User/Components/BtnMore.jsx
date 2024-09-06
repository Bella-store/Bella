import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BtnMore() {
  const { t } = useTranslation();

  return (
    <Link to="/products">
      <button
        className="text-[14px] md:text-[16px] p-[1rem] px-5 md:p-[1.5rem] md:px-10 relative border border-textColor  
          after:content-[''] after:absolute after:top-[20] after:left-[-18px] after:w-[20%] after:h-[40%] after:bg-[#fff]  hover:after:opacity-0
          before:content-[''] before:absolute before:top-[20] before:right-[-18px] before:w-[20%] before:h-[40%] before:bg-[#fff]  hover:before:opacity-0
         transition-all ease-in duration-400 hover:text-mainColor hover:border-mainColor hover:p-[1rem] hover:px-5 md:hover:p-[1.5rem] md:hover:px-10"
      >
        {t("MoreProducts")}
      </button>
    </Link>
  );
}

export default BtnMore;
