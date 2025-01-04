import Typography from "components/Typography";
import { useTranslation } from "react-i18next";

const Card = ({ icon, title, desc }: any) => {
  return (
    <div className="flex-1">
      <div className="w-14 h-14 rounded-full bg-white border-[10px] border-green-haze-800 mx-auto flex items-center justify-center mb-4">
        <img
          src={`/images/landing-page/why-deelance/${icon}`}
          className="h-[70%] w-[70%]"
          alt=""
        />
      </div>

      <Typography
        variant="xl"
        className="dark:text-white text-woodsmoke-700 text-center font-semibold mb-3"
      >
        {title}
      </Typography>

      <Typography className="text-center dark:text-white/60 text-woodsmoke-800">
        {desc}
      </Typography>
    </div>
  );
};

const VerticalDivider = () => {
  return (
    <div className="max-sm:block max-lg:hidden h-[2px] sm:min-h-full w-full sm:w-[2px] bg-woodsmoke-400" />
  );
};

function WhyDeelance() {
  const { t } = useTranslation();

  return (
    <section>
      <header className="container-wrapper mb-10">
        <Typography
          variant="4xl"
          className="max-lg:text-3xl uppercase font-black text-woodsmoke-800 dark:text-white tracking-widest mb-5 text-center"
        >
          {t("Why Us")}
        </Typography>
      </header>

      <main className="bg-woodsmoke-200 dark:bg-blue-bg py-10">
        <div className="container-wrapper grid max-lg:gap-8 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto]">
          <Card
            icon="1.png"
            title={t("Diverse Talent Pool")}
            desc={t(
              "Access a wide range of skilled freelancers with expertise in various industries."
            )}
          />

          <VerticalDivider />

          <Card
            icon="2.png"
            title={t("Streamlined Project")}
            desc={t(
              "Deelance simplifies the entire project lifecycle from hiring to completion."
            )}
          />

          <VerticalDivider />

          <Card
            icon="3.png"
            title={t("Quality Assurance")}
            desc={t(
              "We ensure top-notch work through our vetting and rating system."
            )}
          />

          <VerticalDivider />

          <Card
            icon="4.png"
            title={t("Cost-Effective Solutions")}
            desc={t(
              "Find cost-effective freelance services to fit your budget and project requirements."
            )}
          />
        </div>
      </main>
    </section>
  );
}

export default WhyDeelance;
