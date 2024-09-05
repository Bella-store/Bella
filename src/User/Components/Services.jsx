import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const servicesData = [
    {
      imgSrc: "/public/lamba.svg",
      imgAlt: "Icon",
      title: t("Service1Title"),
      subtitle: t("Service1Subtitle"),
      description: t("Service1Description"),
    },
    {
      imgSrc: "/public/home.svg",
      imgAlt: "Icon",
      title: t("Service2Title"),
      subtitle: t("Service2Subtitle"),
      description: t("Service2Description"),
    },
    {
      imgSrc: "/public/Lampshade.svg",
      imgAlt: "Icon",
      title: t("Service3Title"),
      subtitle: t("Service3Subtitle"),
      description: t("Service3Description"),
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col lg:flex-row gap-10 p-3 md:p-5 md:py-[3%] md:px-[7%]">
      {servicesData.map((service, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex gap-2">
            <img src={service.imgSrc} alt={service.imgAlt} className="h-12" />
            <div className="flex flex-col">
              <h2 className="text-titleColor text-[1.2rem] font-semibold w-[120%]">
                {service.title}
              </h2>
              <p className="text-textColor text-[1.1rem] mb-2">{service.subtitle}</p>
              <div className="w-[100%] border"></div>
            </div>
          </div>
          <div className="w-full min-h-[100px] max-h-[200px] mt-3">
            <p className="text-textColor text-[1.1rem]">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
