// import Typography from "components/Typography";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import Pill from "components/Pill";
// import SliderNavigationButton from "components/SliderNavigationButton";
// import contentfulClient from "contentfulClient";
// import { useEffect, useState } from "react";
// import Button from "components/Button";
// import { useTranslation } from "react-i18next";
// import MediaQueryWrapper from "components/MediaQueryWrapper";

// const Card = ({ title, banner, tagId, id }: any) => {
//   const [category, setCategory] = useState(null);
//   const postLink = `https://academy.deelance.com/${tagId}/${String(title)
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^\w-]+/g, "")}?search=${id}`;

//   const getTag = async () => {
//     try {
//       const res = await contentfulClient.getTag(tagId);
//       setCategory(res.name);
//     } catch (error) {
//       console.log("error ===");
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getTag();
//   }, [tagId]);

//   return (
//     <a
//       href={postLink}
//       target="_blank"
//       rel="noreferrer"
//       className="flex flex-col flex-1"
//     >
//       <span className="flex-1">
//         <img
//           src={banner}
//           className="aspect-video relative bg-black rounded-lg mb-3"
//           alt="banner"
//         />
//         {category ? (
//           <Pill
//             as="span"
//             className="absolute top-4 right-5 font-medium capitalize"
//           >
//             {category}
//           </Pill>
//         ) : null}

//         <Typography as="span" variant="lg" className="limit-text-lines mb-4">
//           {title}
//         </Typography>
//       </span>

//       <span className="flex items-center space-x-4 text-sm font-medium">
//         <span>More About this</span>
//         <FaExternalLinkAlt className="relative bottom-[.16em]" />
//       </span>
//     </a>
//   );
// };

// function PopularServices() {
//   const [data, setData] = useState(null);
//   const { t } = useTranslation();

//   const getData = async () => {
//     try {
//       const res = await contentfulClient.getEntries({
//         content_type: "academy",
//         limit: 10,
//       });
//       setData(res.items);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <section className="container-wrapper">
//       <header className="flex max-md:flex-col md:items-center justify-between mb-8 sm:mb-10 max-md:space-y-6">
//         <div>
//           <Typography
//             variant="4xl"
//             className="text-woodsmoke-800 dark:text-white font-semibold max-sm:text-3xl"
//           >
//             {t("Deelance Articles")}
//           </Typography>
//         </div>

//         <MediaQueryWrapper breakpoint="sm">
//           <div className="flex items-center space-x-4">
//             <div className="pr-6">
//               <Button
//                 variant="outlined"
//                 as="a"
//                 target="_blank"
//                 href="https://academy.deelance.com/"
//                 endIcon={<FaExternalLinkAlt />}
//               >
//                 {t("More Articles")}
//               </Button>
//             </div>

//             <SliderNavigationButton
//               id="services-prevEl"
//               className="rotate-180"
//             />
//             <SliderNavigationButton id="services-nextEl" />
//           </div>
//         </MediaQueryWrapper>
//       </header>

//       <Swiper
//         slidesPerView={4}
//         spaceBetween={30}
//         slidesPerGroup={4}
//         modules={[Navigation]}
//         className="[&_.swiper-slide]:max-h-none [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex [&_.swiper-slide]:flex-col"
//         navigation={{
//           nextEl: "#services-nextEl",
//           prevEl: "#services-prevEl",
//         }}
//         breakpoints={{
//           100: {
//             slidesPerView: 1,
//             slidesPerGroup: 1,
//           },
//           600: {
//             slidesPerView: 2,
//             slidesPerGroup: 2,
//           },
//           1024: {
//             slidesPerView: 4,
//             slidesPerGroup: 4,
//           },
//         }}
//       >
//         {data ? (
//           data.map((item) => (
//             <SwiperSlide key={item.sys.id}>
//               <Card
//                 id={item.sys.id}
//                 title={item.fields.title}
//                 banner={item.fields.banner.fields.file.url}
//                 tagId={item.metadata.tags[0].sys.id}
//               />
//             </SwiperSlide>
//           ))
//         ) : (
//           <Typography>loading....</Typography>
//         )}
//       </Swiper>

//       <MediaQueryWrapper breakpoint="sm" inverse>
//         <div className="flex mt-8 space-x-6">
//           <Button
//             variant="outlined"
//             as="a"
//             target="_blank"
//             href="https://academy.deelance.com/"
//             endIcon={<FaExternalLinkAlt />}
//             className="flex-1"
//           >
//             {t("More")}
//           </Button>

//           <div className="flex items-center space-x-3">
//             <SliderNavigationButton
//               id="services-prevEl"
//               className="rotate-180"
//             />
//             <SliderNavigationButton id="services-nextEl" />
//           </div>
//         </div>
//       </MediaQueryWrapper>
//     </section>
//   );
// }

function PopularServices() {
  return (
    <div>
      <h1>PopularServices</h1>
    </div>
  );
}

export default PopularServices;
