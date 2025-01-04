import Typography from "./Typography";
import SearchBox from "./SearchBox";
import { useTranslation } from "react-i18next";

function YourStepToNewCareer() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-woodsmoke-900 p-8 rounded-xl relative z-10 shadow-md overflow-hidden">
      <header className="mb-7">
        <Typography variant="2xl" className="mb-4 font-medium">
          {t("Your Step to a New Career")}
        </Typography>

        <div className="space-y-2">
          <Typography variant="sm">
            <span className="inline-block">
              {t("Learn faster with us and become the whole new person.")}
            </span>
          </Typography>

          <Typography variant="sm">
            <span className="inline-block">
              {t("Find the Best jobs according to your experience.")}
            </span>
          </Typography>

          <Typography variant="sm">
            <span className="inline-block">
              {t("Explore the world wide experience.")}
            </span>
          </Typography>
        </div>
      </header>

      <div className="max-w-[40rem] w-full">
        <SearchBox />
      </div>

      <img
        src="/images/world-half-map.png"
        className="absolute top-0 rtl:right-10 ltr:left-10 h-full w-[50%] object-cover -z-10 pointer-events-none select-none opacity-5 dark:opacity-100"
        alt=""
      />

      <img
        src="/images/searching.png"
        className="absolute -bottom-2 rtl:left-10 ltr:right-10 h-[90%] w-[40%] object-contain -z-10 pointer-events-none select-none rtl:-scale-x-100"
        alt=""
      />
    </div>
  );
}

export default YourStepToNewCareer;
