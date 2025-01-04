// @ts-nocheck

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./Dialog";
import Typography from "./Typography";
import Paper from "./Paper";
import { useTranslation } from "react-i18next";
import { cn } from "utils/cn";
import { twMerge } from "tailwind-merge";

const Card = ({ nativeName, isActive, onClick }) => {
  return (
    <Paper
      as="button"
      onClick={onClick}
      size={4}
      className={twMerge(
        "text-left shadow shadow-black/30 border-2 border-transparent dark:border-black/30 cursor-pointer flex items-start dark:shadow-none",
        isActive ? "border-green-haze-500 dark:border-green-haze-500" : null
      )}
    >
      <span
        className={cn(
          "w-6 h-6 rounded-full border-2 border-black/30 p-1 me-3 flex-shrink-0",
          isActive ? "border-green-haze-500" : null
        )}
      >
        {isActive ? (
          <span className="w-full h-full rounded-full bg-green-haze-500 block" />
        ) : null}
      </span>
      <span>{nativeName}</span>
    </Paper>
  );
};

function LanguageSelectorPopup({ children }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const [lngs, setLngs] = useState({ en: { nativeName: "English" } });
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("i18nextLng")
  );

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
  };

  useEffect(() => {
    i18n.services.backendConnector.backend.getLanguages((err, ret) => {
      if (err) return; // TODO: handle err...
      setLngs(ret);
    });
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[40rem] p-0">
        <DialogHeader
          variant="bordered"
          className="flex flex-row items-center justify-between space-y-0 px-8"
        >
          <Typography variant="xl">{t("Choose your Language")}</Typography>
          <DialogCloseIcon />
        </DialogHeader>

        <main className="p-8 grid sm:grid-cols-2 gap-3 sm:gap-6">
          {Object.keys(lngs).map((lng) => (
            <Card
              key={lng}
              nativeName={lngs[lng].nativeName}
              langCode={lng}
              onClick={() => changeLanguage(lng)}
              isActive={currentLang === lng}
            />
          ))}
        </main>

        {/* <DialogFooter
        variant="bordered"
        className="px-8 flex items-center justify-between"
      >

      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default LanguageSelectorPopup;
