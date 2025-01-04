import Button from "components/Button";
import Paper from "components/Paper";
import ReviewCard from "components/ReviewCard";
import Typography from "components/Typography";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "api/axios";
import { Skeleton } from "components/ui/skeleton";
import Pill from "components/Pill";
import { EditorContent, useEditor } from "@tiptap/react";
import { EditorExtensions } from "components/TiptapRichTextEditor";
import Accordion from "components/Accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import SliderNavigationButton from "components/SliderNavigationButton";
import Avatar from "components/Avatar";
import { MessageCircle } from "lucide-react";

// function AddOnCard({ title, price, desc }) {
//   return (
//     <div>
//       {/* <Checkbox label={title} /> */}

//       <div className="pl-8 mt-1">
//         <Typography
//           variant="sm"
//           className="text-black/60 dark:text-white/60 mb-2"
//         >
//           {desc}
//         </Typography>
//         <Typography variant="lg" className="font-medium">
//           {price}
//         </Typography>
//       </div>
//     </div>
//   );
// }

function TaskPreview() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { data: user } = useQuery<any>({ queryKey: ["user"], enabled: false });
  console.log("user", user);
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const res = await axios.get(`/task/${id}`);
      return res.data.data;
    },
  });

  console.log("task data", data);
  const taskOwner = data?.userId;
  const isUser = user?._id === taskOwner?._id;

  const localEditor = useEditor({
    editable: false,
    extensions: EditorExtensions,
    content: data?.packageDescription,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  useEffect(() => {
    if (isFetched && isLoading === false) {
      localEditor?.commands.setContent(data.packageDescription);
    }
  }, [isLoading, isFetched]);

  const reviews = [
    {
      client: t("Sarah Johnson"),
      rating: 5,
      feedback: t(
        "Working with this UI/UX designer was an absolute pleasure! They took the time to understand our brand and delivered a design that perfectly captured our identity. The attention to detail and commitment to user experience truly set them apart. I highly recommend their services!"
      ),
      date: t("Apr 10, 2023"),
    },
    {
      client: t("Michael Rodriguez"),
      rating: 5,
      feedback: t(
        "As a startup founder, I was looking for a designer who could bring creativity and functionality together. This UI/UX designer exceeded my expectations. The collaborative approach and dedication to refining the user experience were outstanding. Our digital platform now stands out in the market!"
      ),
      date: t("May 15, 2023"),
    },
    {
      client: t("Emily Chen"),
      rating: 4,
      feedback: t(
        "An excellent UI/UX designer who brings innovation to the table. The designs were visually stunning and user-friendly. There were a few minor revisions, but the designer was quick to address them. Overall, a great experience and a fantastic final product."
      ),
      date: t("Jun 22, 2023"),
    },
    {
      client: t("David Thompson"),
      rating: 5,
      feedback: t(
        "If you're looking for a designer who stays ahead of the curve, look no further. This UI/UX designer not only delivered a sleek and modern design but also incorporated the latest trends. The collaborative process was smooth, and the end result speaks for itself. Highly recommended!"
      ),
      date: t("Jul 08, 2023"),
    },
  ];

  if (isLoading) {
    return (
      <div className="container-wrapper">
        <main className="grid lg:grid-cols-[1fr_.5fr] gap-8">
          <div className="space-y-4">
            <Skeleton className="h-3 rounded-full w-[40%]" />
            <Skeleton className="h-3 rounded-full w-[50%]" />
            <Skeleton className="h-3 rounded-full w-[80%]" />

            <Skeleton className="aspect-[1.66/1]" />

            <Skeleton className="h-3 rounded-full w-[]" />
            <Skeleton className="h-3 rounded-full w-full" />
            <Skeleton className="h-3 rounded-full w-full" />
            <Skeleton className="h-3 rounded-full w-full" />
            <Skeleton className="h-3 rounded-full w-full" />
            <Skeleton className="h-3 rounded-full w-full" />
            <Skeleton className="h-3 rounded-full w-full" />
            <Skeleton className="h-3 rounded-full w-full" />
            <Skeleton className="h-3 rounded-full w-full" />
          </div>

          <aside className="space-y-8 bg-white rounded-md py-8 px-10">
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-3 rounded-full w-[80%]" />
              <Skeleton className="h-3 rounded-full w-[60%]" />
              <Skeleton className="h-3 rounded-full w-[50%]" />
            </div>
          </aside>
        </main>
      </div>
    );
  }

  return (
    <div className="container-wrapper">
      {isUser ? null : (
        <div className="flex items-center justify-between fixed bottom-8 right-10 bg-white rounded-full px-4 py-3 shadow-lg z-50 space-x-8 pr-6">
          <div className="flex items-center space-x-2">
            <Avatar avatar={taskOwner.avatar} size={50} />
            <div>
              <Link
                to={`/profile/${taskOwner._id}`}
                className="hover:underline"
              >
                {taskOwner.UserName}
              </Link>
              <p className="text-sm opacity-60">{taskOwner.title}</p>
            </div>
          </div>

          <button type="button" className="flex opacity-80">
            <MessageCircle />
          </button>
        </div>
      )}

      <main className="grid lg:grid-cols-[1fr_.5fr] gap-8">
        <div>
          <div className="mb-10">
            <header className="mb-10">
              <Typography className="mb-4">
                {data?.category} {">"} {data?.subCategory}
              </Typography>

              <Typography variant="3xl" className="font-medium lh-1_3">
                {/* {(
                    "I will do website ui design, dashboard, mobile app UI UX design, ui ux design"
                  )} */}
                {data?.title}
              </Typography>

              {/* <Avatar
                  title="Farid Hossain"
                  subtitle="15 Reviews"
                  className="text-xl"
                /> */}
            </header>

            <div className="grid grid-cols-1 relative">
              <main>
                <div className="relative">
                  <Swiper
                    spaceBetween={10}
                    navigation
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full min-w-full max-w-full mb-6 shadow-xl rounded-md"
                    onInit={(swiper: any) => {
                      // eslint-disable-next-line no-param-reassign
                      swiper.params.navigation.prevEl = prevRef.current;
                      // eslint-disable-next-line no-param-reassign
                      swiper.params.navigation.nextEl = nextRef.current;
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }}
                    thumbs={
                      thumbsSwiper
                        ? {
                            swiper: thumbsSwiper,
                            slideThumbActiveClass: "active",
                          }
                        : undefined
                    }
                  >
                    {data.images.map((item: any) => (
                      <SwiperSlide key={item.url}>
                        <img
                          src={item.url}
                          alt=""
                          className="rounded-md aspect-[1.66/1] object-contain bg-white/40 w-full"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="shadow-md shadow-black rounded-full w-fit h-fit absolute top-1/2 -translate-y-1/2 left-4 z-40">
                    <SliderNavigationButton
                      // id="left-btn"
                      ref={prevRef}
                      className="rounded-full w-8 h-8 text-sm rotate-180 disabled:hidden bg-white text-black"
                    />
                  </div>

                  <SliderNavigationButton
                    // id="right-btn"
                    ref={nextRef}
                    className="absolute top-1/2 -translate-y-1/2 right-4 rounded-full z-40 w-8 h-8 text-sm shadow-md shadow-black disabled:hidden bg-white text-black"
                  />
                </div>

                {data.images.length > 1 ? (
                  <Swiper
                    //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {data.images.map((item: any) => (
                      <SwiperSlide
                        key={item.url}
                        className="opacity-50 [&.active]:opacity-100 cursor-pointer"
                      >
                        <img
                          src={item.url}
                          alt=""
                          className="rounded-md aspect-[1.66/1] object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : null}
              </main>
            </div>
          </div>

          <div className="mb-10">
            <Typography variant="xl" className="font-medium mb-3">
              {"Description"}
            </Typography>
            {/* <Typography className="text-black/60 dark:text-white/60"> */}

            {data.packageDescription ? (
              <EditorContent
                readOnly
                contentEditable={false}
                disabled
                editor={localEditor}
              />
            ) : null}

            {/* <div
              className="tiptap"
              dangerouslySetInnerHTML={{ __html: data?.packageDescription }}
            /> */}

            {/* {data?.packageDescription} */}
            {/* {(
                  "Embark on a journey of design excellence with me as your UI/UX designer. With a passion for marrying aesthetics and functionality, I bring a wealth of experience to ensure your digital interfaces are not just visually striking but also seamlessly user-friendly. From meticulous wireframing to engaging prototypes, my process is tailored to your brand's identity and your users' expectations.Collaboration is at the heart of my approach. By delving into your business objectives and understanding user behaviors, I create designs that transcend the ordinary. I prioritize usability, accessibility, and responsiveness, ensuring your digital platform captivates users across devices.Stay ahead in the dynamic digital landscape with my commitment to staying abreast of the latest design trends and technologies. Incorporating feedback loops and iterative design, I guarantee a flexible and refined product that stands out in the competitive market."
                )} */}
            {/* </Typography> */}
          </div>

          <div className="mb-10">
            <Typography variant="xl" className="font-medium mb-3">
              {"Tags"}
            </Typography>

            {data.keywords?.length > 0 ? (
              <div className="overflow-hidden">
                <div className="flex flex-wrap [&>*]:m-1 -m-1">
                  {data.keywords.map((keyword: any) => (
                    <Pill
                      as="p"
                      className="text-sm flex space-x-2 whitespace-nowrap items-center group border border-black/20"
                      key={keyword}
                      tabIndex={-1}
                    >
                      <span>{keyword}</span>
                    </Pill>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {(data.faqs as string[]).length > 0 ? (
            <div className="mb-10">
              <Typography variant="xl" className="font-medium mb-3">
                {"FAQ"}
              </Typography>

              <div className="space-y-4">
                {data.faqs.map((item: any) => (
                  <Accordion
                    key={item.question}
                    title={item.question}
                    buttonClassName={""}
                    childrenWrapperClassName={""}
                  >
                    <Typography>{item.answer}</Typography>
                  </Accordion>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <Typography variant="2xl" className="font-medium mb-8">
              {"Reviews"}
            </Typography>

            <div className="space-y-8">
              {reviews.map((item, i) => (
                <ReviewCard
                  key={i}
                  name={item.client}
                  review={item.feedback}
                  date={item.date}
                  ratingInNumber={item.rating}
                />
              ))}
            </div>
          </div>
        </div>

        <aside>
          <Paper>
            <div className="flex items-center justify-between mb-3">
              <Typography variant="xl" className="font-medium">
                {"Service Cost"}
              </Typography>
              <Typography variant="xl" className="font-medium">
                ${data?.price}
              </Typography>
            </div>

            <Typography className="text-black/60 dark:text-white/60 mb-5">
              {data?.pricingTitle}
              {/* {(
                  "Affordable UI/UX design that transforms your digital space. Elevate user experience without the hefty price tag. Get standout designs on a budget."
                )} */}
            </Typography>

            {data?.revision ? (
              <Typography variant="base" className="font-medium mb-4">
                Rivisions {data?.revision}
              </Typography>
            ) : null}

            <Typography variant="lg" className="font-medium">
              {"10 Days delivery"}
            </Typography>

            <hr className="border-white/20 my-4" />

            {/* <Typography variant="xl" className="font-medium mb-3">
              {("Add on")}
            </Typography>

            <div className="mb-8">
              {addOnServices.map((item, i) => (
                <>
                  <AddOnCard
                    key={i}
                    title={item.name}
                    desc={item.description}
                    price={item.price}
                  />
                  {addOnServices.length - 1 !== i ? (
                    <hr className="border-white/20 my-4" />
                  ) : null}
                </>
              ))}
            </div> */}

            {user?.accountType === "FREELANCER" ? null : (
              <Button className="w-full" asChild>
                <Link to={`/order-payment/${data._id}`}>Continue</Link>
              </Button>
            )}

            {/* <Typography variant="lg" className="font-medium mb-3">
                Add Extra Services
              </Typography>

              <div className="space-y-2">
                <Checkbox label="With NFT Ownership" />
                <Checkbox label="Without NFT Ownership" />
              </div> */}
          </Paper>
        </aside>
      </main>
    </div>
  );
}

export default TaskPreview;
