import Typography from "components/Typography";
import useMediaQuery from "hooks/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SliderNavigationButton from "components/SliderNavigationButton";
import { FaLaptopCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Card = ({ title, positionsOpen, icon }: any) => {
  const { t } = useTranslation();

  return (
    <div className="h-[72px] rounded-lg bg-woodsmoke-300 dark:bg-woodsmoke-600 px-5 flex items-center space-x-4">
      {/* <img
        src="/images/icons/bag.png"
        className="h-[60%] aspect-square flex-shrink-0 dark:invert opacity-80"
      /> */}
      <Typography className="aspect-square flex-shrink-0 dark:invert opacity-80 text-white bg-black rounded-full p-3 text-2xl">
        {icon}
      </Typography>

      <div>
        <Typography className="font-medium text-woodsmoke-800 dark:text-white lh-1_2 mb-0.5">
          {title}
        </Typography>
        {positionsOpen && positionsOpen !== 0 ? (
          <Typography variant="sm" className="opacity-80">
            {positionsOpen} {t("Open Positions")}
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

const dreamJobsData = [
  { title: "Web Developer", positionsOpen: 5, icon: <FaLaptopCode /> },
  { title: "Graphic Designer", positionsOpen: 3, icon: "🎨" },
  { title: "Data Analyst", positionsOpen: 2, icon: "📊" },
  { title: "Marketing Specialist", positionsOpen: 4, icon: "📈" },
  { title: "Product Manager", positionsOpen: 1, icon: "🛠️" },
  { title: "UX Designer", positionsOpen: 2, icon: "🌐" },
  { title: "Sales Representative", positionsOpen: 3, icon: "💼" },
  { title: "Content Writer", positionsOpen: 4, icon: "📝" },
  { title: "HR Coordinator", positionsOpen: 1, icon: "🤝" },
  { title: "IT Support", positionsOpen: 2, icon: "💻" },
  { title: "Customer Service", positionsOpen: 3, icon: "📞" },
  { title: "Project Manager", positionsOpen: 2, icon: "📅" },
];

function FindYourDreamJob() {
  const isAbove1024px = useMediaQuery("(min-width:1024px)");
  const { t } = useTranslation();

  return (
    <section className="bg-woodsmoke-200 dark:bg-woodsmoke-900 py-12 border-y-2 border-dashed border-woodsmoke-400">
      <div className="container-wrapper">
        <div className="w-full max-w-[20rem] mx-auto mb-8 relative z-10">
          <img src="/images/find-job-wihtout-line.png" alt="" />
          <img
            src="/images/find-job-line.png"
            className="absolute top-0 left-0 -z-10 w-full h-full invert dark:invert-0"
            alt=""
          />
        </div>

        <Typography
          variant="4xl"
          className="text-center font-bold text-woodsmoke-800 dark:text-white max-lg:mb-6 mb-8 max-lg:text-3xl"
        >
          {t("Find your Dream Jobs Today")}
        </Typography>

        <Typography variant="xl" className="max-lg:text-lg text-center">
          {t("Popular")}{" "}
          <span className="text-green-haze-600">{t("Job Categories")}</span>
        </Typography>

        {isAbove1024px ? (
          <main className="mt-8 grid grid-cols-3 gap-6 mb-8">
            {dreamJobsData.map((item, i) => (
              <Card
                key={i}
                title={t(item.title)}
                positionsOpen={item.positionsOpen}
                icon={item.icon}
              />
            ))}
          </main>
        ) : (
          <>
            <Swiper
              slidesPerView={1}
              modules={[Navigation]}
              spaceBetween={20}
              className="mt-8"
              navigation={{
                nextEl: "#dream-nextEl",
                prevEl: "#dream-prevEl",
              }}
              breakpoints={{
                100: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 2,
                },
              }}
            >
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
              <SwiperSlide>
                <Card />
              </SwiperSlide>
            </Swiper>

            <div className="flex items-center space-x-4 mt-6 justify-center mb-6">
              <SliderNavigationButton
                id="dream-prevEl"
                className="rotate-180"
              />
              <SliderNavigationButton id="dream-nextEl" />
            </div>
          </>
        )}

        <a
          href="/"
          className="w-fit block mx-auto text-green-haze-600 underline"
        >
          {t("Explore More")}
        </a>
      </div>
    </section>
  );
}

export default FindYourDreamJob;
