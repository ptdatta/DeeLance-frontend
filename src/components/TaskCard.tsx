/* eslint-disable jsx-a11y/label-has-associated-control */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useContext, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Cookie, ScanEye, Settings2, Trash2 } from "lucide-react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { twMerge } from "tailwind-merge";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "Providers/AuthContextProvider";
import Typography from "./Typography";
import SliderNavigationButton from "./SliderNavigationButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";
import UserProfileImage from "./UserProfileImage";
import { Skeleton } from "./ui/skeleton";
import { IoWarningOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";
import { MdArrowOutward } from "react-icons/md";

export function TaskCardSkeleton() {
  return (
    <div className="group dark:bg-woodsmoke-950 rounded-md overflow-hidden border-2 bg-white relative">
      <Skeleton className="w-full object-cover aspect-[1.66/1] bg-black/20 rounded-none" />

      <div className="py-3 px-4 overflow-hidden">
        <Skeleton className="mb-4 h-4 rounded-full w-[90%] bg-black/20" />

        <div className="flex items-center space-x-3">
          <Skeleton className="rounded-full w-11 h-11" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 rounded-full w-[60%] bg-black/20" />
            <Skeleton className="h-3 rounded-full w-[50%] bg-black/20" />
          </div>
        </div>
      </div>

      <div className="border-t-1 border-black/20 dark:border-white/20 py-4 flex items-center justify-between px-4">
        <Skeleton className="rounded-full w-8 h-4 ml-1" />
        <Skeleton className="rounded-full w-16 h-4 ml-1" />
      </div>
    </div>
  );
}

function TaskCard({ data }: any) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const userData: any = data.userId;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const { isToken } = useContext(AuthContext);
  const isUser = isToken ? user?._id === userData?._id : false;
  const { toast } = useToast();
  // const [isSaved, setIsSaved] = useState<boolean>(false);
  const { mutate: deleteTask, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      await axiosPrivate.delete(`/deleteTask/${userData._id}/${data._id}`);
      await queryClient.refetchQueries({
        queryKey: ["all tasks"],
      });
      await queryClient.refetchQueries({
        queryKey: ["user tasks", userData._id],
      });
    },
    onError: () => {
      toast({
        title: "Unexpected error occured!",
        description: "Please try again!",
        variant: "destructive",
      });
    },
  });
  // const { mutate: likeTask, isLoading: isLikeLoading } = useMutation({
  //   mutationFn: async () => {
  //     await axiosPrivate.post("/createSaveTask", {
  //       userId: user._id,
  //       taskId: data._id,
  //     });
  //   },
  // });

  const { mutate: togglePublishTask, isLoading: isTogglingPublishTask } =
    useMutation({
      mutationFn: async () => {
        const updatedTask = { ...data, isPublish: !data.isPublish };
        await axiosPrivate.patch(
          `/updatetasks/${user._id}/${data._id}`,
          updatedTask
        );
        await queryClient.refetchQueries({
          queryKey: ["all tasks"],
        });
        await queryClient.refetchQueries({
          queryKey: ["user tasks", userData._id],
        });
      },
      onError: () => {
        toast({
          title: "Failed to update task privacy",
          description: "Please try again!",
          variant: "destructive",
        });
      },
    });

  return (
    <div
      className={twMerge(
        "group dark:bg-woodsmoke-950 rounded-md overflow-hidden border-2 bg-white relative flex flex-col",
        isDeleting ? "opacity-70" : null
      )}
    >
      <div className="relative">
        <Swiper
          observer
          observeParents
          modules={[Navigation]}
          onInit={(swiper: any) => {
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = prevRef.current;
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {data.images.map((item: any, i: number) => (
            <SwiperSlide key={i}>
              <img
                src={item.url}
                className="w-full object-cover aspect-[1.66/1] bg-gray-200"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="shadow-md opacity-0 group-hover:opacity-100 shadow-black rounded-full w-fit h-fit absolute top-1/2 -translate-y-1/2 left-4 z-40">
          <SliderNavigationButton
            // id="left-btn"
            ref={prevRef}
            className="rounded-full w-8 h-8 text-sm rotate-180 disabled:hidden bg-white text-black"
          />
        </div>

        <SliderNavigationButton
          // id="right-btn"
          ref={nextRef}
          className="absolute top-1/2 -translate-y-1/2 right-4 rounded-full z-40 w-8 h-8 text-sm shadow-md opacity-0 group-hover:opacity-100 shadow-black disabled:hidden bg-white text-black"
        />
      </div>

      <div className="py-3 px-4 overflow-hidden flex-1">
        <Typography
          variant="base"
          className="mb-4 whitespace-nowrap overflow-hidden"
        >
          <Link to={`/task-preview/${data._id}`} className="hover:underline">
            {data?.title}
          </Link>
        </Typography>

        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2 overflow-hidden">
            <aside className="flex-shrink-0">
              <UserProfileImage
                className="w-11 h-11"
                avatar={userData.avatar}
                username={userData?.UserName}
              />
            </aside>

            <div>
              <Link
                to={`/profile/${userData._id}`}
                className="text-sm hover:underline"
              >
                {`${userData.UserName}`}
              </Link>
              <p className="text-xs whitespace-nowrap text-ellipsis opacity-60 font-medium">
                {userData.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-1 border-black/20 dark:border-white/20 py-4 flex items-center justify-between px-4">
        {/* <Typography variant="lg" as="button" className="text-green-haze-600">
          <BsThreeDotsVertical />
        </Typography> */}
        {/* <Typography variant="base">
          {data?.deliveryDays} Delivery Days
        </Typography> */}

        {
          isUser ? (
            <div className="flex items-center space-x-3">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="relative w-5 h-5 flex items-center justify-center"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader.CircularSnake
                        className="h-full w-full"
                        color="#fc7777"
                      />
                    ) : (
                      <BsThreeDotsVertical />
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="right" align="end" className="w-56">
                  <DropdownMenuLabel>Quick Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <ScanEye className="mr-2 h-4 w-4" />
                      <span>Preview</span>
                    </DropdownMenuItem>

                    {data?.blockchainCreationStatus === "failed" ? null : (
                      <DropdownMenuItem
                        onSelect={() =>
                          navigate({
                            pathname: "/create-task",
                            search: createSearchParams({
                              taskId: data._id,
                              editMode: true,
                            } as any).toString(),
                          })
                        }
                      >
                        <Settings2 className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                    )}

                    {data?.blockchainCreationStatus === "failed" ? null : (
                      <DropdownMenuItem
                        onSelect={() => {
                          togglePublishTask();
                        }}
                      >
                        <Cookie className="mr-2 h-4 w-4" />
                        <span>
                          {data?.isPublish ? "Unpublish Task" : "Publish Task"}
                        </span>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onSelect={() => deleteTask()}
                      className="data-[highlighted]:bg-red-200 data-[highlighted]:text-black text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {data?.blockchainCreationStatus === "failed" ? (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() =>
                          navigate({
                            pathname: "/create-task",
                            search: createSearchParams({
                              taskId: data._id,
                              editMode: true,
                              section: "Confirm Transaction",
                            } as any).toString(),
                          })
                        }
                        className="w-4.5 h-4.5 flex group/failed"
                      >
                        <IoWarningOutline className="text-red-500 w-full h-full group-hover/failed:hidden" />
                        <MdArrowOutward className="w-full h-full group-hover/failed:block hidden" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tx Failed. Try again</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>
          ) : (
            <span />
          )
          // <button
          //   type="button"
          //   className="text-lg ml-1.5"
          //   onClick={() => {
          //     likeTask();
          //   }}
          // >
          //   {isLikeLoading ? <Loader.CircularSnake /> : <FaHeart />}
          // </button>
        }

        <div className="rounded flex space-x-2">
          {/* <Typography variant="sm" className="lh-1">
            <sup className="opacity-70 text-[.7em]">ETH</sup> 20
          </Typography>
          <div className="w-[1px] bg-white/40"></div> */}

          <Typography variant="sm" className="lh-1">
            Price: <span className="font-bold">${data?.price}</span>
          </Typography>
        </div>
      </div>

      {isTogglingPublishTask ? (
        <div className="animate-in fade-in duration-300 absolute top-0 left-0 w-full h-full bg-white/60 backdrop-blur-[3px] z-50 flex items-center justify-center flex-col space-y-4">
          <Loader.CircularSnake className="w-8 h-8" color="black" />
          <p className="font-medium">
            {!data?.isPublish ? "Publishing" : "Unpublishing"} Task
          </p>
        </div>
      ) : null}

      {/* <Button asChild className="m-4 mt-2">
        <Link to={`/task-preview/${data._id}`}>View Task</Link>
      </Button> */}
    </div>
  );
}

export default TaskCard;
