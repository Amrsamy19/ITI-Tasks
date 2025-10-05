import { useTranslation } from "react-i18next";

export default function Toggle() {
  const { i18n } = useTranslation();

  return (
    <div className="inline-flex w-auto">
      <label
        htmlFor="toggle"
        className="inline-flex relative gap-3 justify-center items-center cursor-pointer"
      >
        <p className="text-sm text-gray-900">EN</p>
        <div className="relative">
          <input
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
            }
            type="checkbox"
            id="toggle"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </div>
        <p className="text-sm text-gray-900">AR</p>
      </label>
    </div>
  );
}
