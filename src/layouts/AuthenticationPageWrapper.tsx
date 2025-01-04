import Logo from "components/Logo";
import Typography from "components/Typography";
import { Outlet } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ReactNode } from "react";

interface CardProps {
  img: string;
  title: string;
  desc: string;
}
const Card = ({ img, title, desc }: CardProps) => {
  return (
    <div className="flex flex-col items-center flex-1 justify-center">
      <div className="flex-1 w-full relative mt-10 max-lg:mb-8 mb-12">
        <img
          src={`/images/auth-page/${img}`}
          className="w-full h-full object-contain lg:absolute top-0 left-0 max-lg:h-[14rem]"
          alt=""
        />
      </div>

      <div className="px-10 text-center">
        <Typography
          variant="4xl"
          className="font-black uppercase text-center text-white max-xl:text-2xl"
        >
          {title}
        </Typography>

        <Typography
          variant="xl"
          className="max-xl:mt-2 mt-4 text-white max-xl:text-base opacity-90"
        >
          {desc}
        </Typography>
      </div>
    </div>
  );
};

function AuthenticationPageWrapper({ children }: { children?: ReactNode }) {
  return (
    <section className="grid lg:grid-cols-[1fr_1fr] min-h-screen z-10 lg:gap-6 bg-white dark:bg-blue-bg/50">
      <div className="lg:w-1/2 lg:h-full lg:fixed top-1/2 left-0 lg:-translate-y-1/2 z-10 flex items-center justify-center bg-green-haze-500 overflow-hidden shadow-2xl shadow-black/60 flex-col max-lg:row-start-3">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          allowTouchMove={false}
          loop
          className="w-full h-full [&_.swiper-slide]:flex [&_.swiper-slide]:flex-col auth-slider"
          pagination={{
            enabled: true,
            el: ".auth-pagination-wrapper",
            clickable: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Card
              img="ill-2.svg"
              title="Welcome to Deelance"
              desc="Where Opportunities Unfold and Freelance Dreams Take Flight."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              img="ill-6.svg"
              title="Explore Global Opportunities"
              desc="find global opportunities, achieve freelancing success limitlessly."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              img="ill-3.svg"
              title="Maximize with NFTs"
              desc="Dive into the future with digital assets."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              img="ill-4.svg"
              title="Premium Work Ecosystem"
              desc="Experience excellence in a superior work environment."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              img="ill-5.svg"
              title="Efficient Freelance Portal"
              desc="Streamline your freelancing journey effortlessly."
            />
          </SwiperSlide>
        </Swiper>

        <div className="mt-8 lg:mt-12 auth-pagination-wrapper w-[90%] lg:w-[70%] mb-10 flex items-center space-x-4 [&>*]:flex-1 [&>*]:h-2 [&>*]:bg-green-haze-300 [&>*]:rounded-full [&>*]:block [&>*.swiper-pagination-bullet-active]:before:bg-green-haze-700 !static [&>*]:transition-all [&>*]:duration-200 [&>*]:relative [&>*]:overflow-hidden" />
      </div>

      <aside className="relative" />

      <div className="px-8 lg:px-16 py-10 lg:py-12 relative z-30 flex-1">
        <Logo className="max-w-[14rem] w-full h-auto sm:h-auto xl:h-auto mb-12" />

        {children}
        <Outlet />
      </div>
    </section>
  );
}

export default AuthenticationPageWrapper;
