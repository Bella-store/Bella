import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App({ children }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set the direction of the site based on the current language
    if (i18n.language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [i18n.language]);

  return (
    <div>
      {children}  {/* This will render the routes passed from main.jsx */}
    </div>
  );
}

export default App;
