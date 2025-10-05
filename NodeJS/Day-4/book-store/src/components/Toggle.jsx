import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);
  const { i18n } = useTranslation();

  return (
    <div class="inline-flex w-auto">
      <label
        for="toggle"
        class="inline-flex relative items-center cursor-pointer"
      >
        <input type="checkbox" id="toggle" class="sr-only peer" />
        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
          {i18n.language === "en" ? "EN" : "AR"}
        </div>
      </label>
    </div>
  );
}
