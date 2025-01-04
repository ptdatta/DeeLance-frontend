import Typography from "components/Typography";
import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";

const Card = ({ serviceName, rating, icon }: any) => {
  return (
    <div className="h-[72px] rounded-lg bg-woodsmoke-300 dark:bg-woodsmoke-700 px-5 flex items-center justify-between space-x-6 border-2 border-black/60 dark:border-white/60">
      <div className="flex items-center space-x-4">
        <img
          src={icon}
          className="w-9 flex-shrink-0 flex items-center justify-center opacity-80 dark:invert"
          alt="icon"
        />

        <Typography className="font-medium text-woodsmoke-800 dark:text-white lh-1_2">
          {serviceName}
        </Typography>
      </div>

      <div className="text-right flex-shrink-0">
        {/* <Typography variant="sm" className="lh-1 mb-1">
          294 skills
        </Typography> */}
        <Typography variant="sm">{rating}/5</Typography>
      </div>
    </div>
  );
};

const freelancersCategory = [
  { serviceName: "Writing Services", rating: 4.2, icon: "writing.png" },
  { serviceName: "Graphic Design", rating: 3.8, icon: "graphic.png" },
  { serviceName: "Programming", rating: 4.5, icon: "programming.png" },
  { serviceName: "Digital Marketing", rating: 3.6, icon: "marketing.png" },
  { serviceName: "Admin Support", rating: 4.1, icon: "admin.png" },
  { serviceName: "Translation", rating: 3.9, icon: "translations.png" },
  { serviceName: "Video & Animation", rating: 4.3, icon: "animation.png" },
  { serviceName: "Audio Services", rating: 4.4, icon: "audio.png" },
  // { serviceName: "Design & Arts", rating: 3.7 },
  // { serviceName: "Consulting", rating: 4.0 },
  // { serviceName: "Marketing & Sales", rating: 4.6 },
  // { serviceName: "Photography", rating: 3.5 },
];

function FindTopFreelancers() {
  const { t } = useTranslation();

  return (
    <section className="container-wrapper grid xl:grid-cols-[.6fr_1fr] max-xl:gap-10 gap-20">
      <aside className="max-xl:hidden">
        <img
          src="/images/find-freelancer-banner.png"
          className="w-full h-full object-cover rounded-md shadow-lg"
          alt=""
        />
      </aside>

      <main className="py-4">
        <Typography
          variant="4xl"
          className="max-lg:text-3xl font-black uppercase mb-5 text-woodsmoke-800 dark:text-white"
        >
          {t("FIND TOP FREELAncers")}
        </Typography>

        <Typography variant="lg" className="max-lg:text-base mb-8">
          {t(
            "Discover the best freelance talent for your projects. Our platform connects you with top-rated freelancers across a wide range of industries"
          )}
        </Typography>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] max-lg:gap-3 gap-5 mb-8">
          {freelancersCategory.map((item, i) => (
            <Card
              key={i}
              serviceName={t(item.serviceName)}
              rating={item.rating}
              icon={`/images/services-icons/${item.icon}`}
            />
          ))}
        </div>

        <Typography>
          {"Seeking employment?"}{" "}
          <a href="/" className="underline text-green-haze-600">
            {t("Explore jobs")} <FiExternalLink className="inline-block" />
          </a>{" "}
        </Typography>
      </main>
    </section>
  );
}

export default FindTopFreelancers;
