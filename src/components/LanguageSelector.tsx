// @ts-nocheck

import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [lngs, setLngs] = useState({ en: { nativeName: "English" } });

  useEffect(() => {
    i18n.services.backendConnector.backend.getLanguages((err, ret) => {
      if (err) return; // TODO: handle err...
      setLngs(ret);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-1 items-start">
      <select
        className=" bg-green-haze-800 border-2 border-green-haze-700 rounded-lg  py-1 px-8 max-w-[150px] w-full text-white cursor-pointer"
        value={i18n.language}
        onChange={(e) => {
          const selectedLanguage = e.target.value;
          i18n.changeLanguage(selectedLanguage);
        }}
      >
        {Object.keys(lngs).map((lng) => (
          <option key={lng} value={lng}>
            {lngs[lng].nativeName} - {lng}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
