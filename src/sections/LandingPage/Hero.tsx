import Pill from "components/Pill";
import SearchBox from "components/SearchBox";
import Typography from "components/Typography";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FREELANCER, JOB } from "utils/constants";

const LocalPill = ({ children }: any) => {
  return (
    <Pill
      as="button"
      className="text-base  border hover:bg-black/10 dark:bg-transparent dark:hover:text-white/60"
    >
      {children}
    </Pill>
  );
};
const images = [
  "/images/landing-page/hero-1.png",
  "/images/landing-page/hero-3.png",
  "/images/landing-page/hero-4.png",
  "/images/landing-page/hero-5.png",
  "/images/landing-page/hero-6.png",
  "/images/landing-page/hero-7.png",
];

const aspectVideoImages = [
  "/images/landing-page/hero-2.png",
  "/images/landing-page/hero-8.png",
  "/images/landing-page/hero-9.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-n_Skw7E2lPFMmSjnUTEdFSy06PEbnJJx7Q&usqp=CAU",
  "/images/landing-page/hero-10.png",
];

const swiperOptions = {
  effect: "fade",
  modules: [Autoplay, EffectFade],
  slidesPerView: 1,
  allowTouchMove: false,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
};

function Hero() {
  const [searchType, setSearchType] = useState(FREELANCER);
  const { t } = useTranslation();

  const handleSearchTypeChange = (type: any) => {
    setSearchType(type);
  };

  return (
    <section className="max-lg:pt-3 pt-10 bg-white dark:bg-blue-bg">
      <div className="container-wrapper grid lg:grid-cols-2 gap-16">
        <aside className="max-lg:hidden grid grid-cols-[1fr_.8fr] gap-6 [&_#card]:rounded-lg [&_#card]:shadow-lg [&_#card]:shadow-black/30">
          <div className="grid gap-6">
            <div
              id="card"
              className="aspect-video w-full overflow-hidden relative"
            >
              <Swiper
                {...swiperOptions}
                className="absolute top-0 left-0 w-full h-full"
              >
                {aspectVideoImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      className="w-full object-cover h-full"
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="pb-10">
              <div id="card" className="bg-white py-5 px-7 flex-1 relative">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-green-haze-600 flex items-center justify-center text-white text-xl">
                  <FaStar />
                </div>

                <Typography
                  variant="lg"
                  className="font-semibold text-green-haze-600 mb-3 lh-1_4"
                >
                  {t("Unlocking Unprecedented Opportunities")}
                </Typography>

                <Typography variant="xs" className="opacity-80 dark:text-black">
                  {t(
                    "Deelance, a pioneering Web3-based platform, redefines freelancing and recruitment. It fosters seamless, trusted transactions, empowering freelancers and employers. Deelance unlocks the potential of decentralized collaboration, creating new opportunities."
                  )}
                </Typography>
              </div>
            </div>
          </div>

          <div
            id="card"
            className="!rounded-b-none !shadow-none border-2 border-b-0 border-black/40 overflow-hidden relative"
          >
            <Swiper
              {...swiperOptions}
              className="absolute top-0 left-0 w-full h-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    id="card"
                    src={img}
                    className="w-full object-cover h-full"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </aside>

        <main className="pt-2 flex flex-col pb-8">
          <Typography
            variant="5xl"
            className="max-lg:text-4xl font-black lh-1_3 text-woodsmoke-900 dark:text-white mb-8"
          >
            {t(
              "Building a Web3 Environment for Enhanced Collaboration and A Better World"
            )}
          </Typography>

          <div className="mb-6">
            <SearchBox
              inputClassName="text-black"
              searchIconClassName="text-black/60"
              onTypeChange={handleSearchTypeChange}
            />
          </div>

          <div>
            <Typography className="mb-4">
              {searchType === JOB
                ? t("Search Jobs for")
                : t("Popular Services")}
            </Typography>

            <div className="flex flex-wrap [&>*]:mx-1 [&>*]:my-1.5 -mx-1 -my-1.5">
              <LocalPill>{t("Logo Design")}</LocalPill>
              <LocalPill>{t("Website Design")}</LocalPill>
              <LocalPill>{t("AI Services")}</LocalPill>
              <LocalPill>{t("Web Development")}</LocalPill>
              <LocalPill>{t("Graphic Design")}</LocalPill>
              <LocalPill>{t("Print Design")}</LocalPill>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Hero;
