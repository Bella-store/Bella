import HeroImage from "../../assets/Images/404-bg.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [t,i18n] = useTranslation();
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white">{t("JUSTFORYOURHOME")}</h2>
        <p className="text-lg mt-4 text-white">
          {t("BringingYouPremiumComfort")}
        </p>
      </div>
    </section>
  );
};

export default Hero;
