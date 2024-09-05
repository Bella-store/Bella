import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Card({ id, title, price, imageUrl, className }) {
  const { t } = useTranslation();

  return (
    <div
      className={`w-full  md:w-[47%] lg:w-[47%] xl:w-[27%] hover:cursor-pointer group relative`}
    >
      <Link to={`/Products/${id}`} className="row-span-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full min-h-[15rem] lg:min-h-[20rem] max-h-[20rem] object-cover"
        />
        <div
          className="bg-titleColor text-white grid grid-cols-4 text-center w-full  
          opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="col-span-3 p-3 flex justify-center items-center hover:bg-mainColor hover:text-white transition-all duration-200">
            <div className="text-[0.9rem]">{t("AddToCart")}</div>
          </div>
          <div
            className="col-span-1 cursor-pointer border-gray-500 border transition-all duration-200 hover:text-white hover:border-hovermain hover:bg-hovermain flex justify-center items-center"
            aria-label={t("AddToWishlist")}
          >
            <CiHeart size={24} />
          </div>
        </div>
      </Link>

      <div>
        <h2 className="text-titleColor text-[1rem] md:text-[1.1rem] lg:text-[1.3rem] font-light mt-1 hover:text-hovermain transition-all duration-200">
          {title}
        </h2>
        <p className="text-hovermain mt-1 text-[0.8rem] lg:text-[1rem]">
          {price} {t("Currency")}
        </p>
      </div>
    </div>
  );
}

export default Card;
