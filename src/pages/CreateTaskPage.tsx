/* eslint-disable no-param-reassign */
import Button from "components/Button";
import TabBar from "components/TabBar";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DescriptionAndRequirements from "sections/CreateTaskPage/DescriptionAndRequirements";
import Gallery from "sections/CreateTaskPage/Gallery";
import Overview from "sections/CreateTaskPage/Overview";
import Pricing from "sections/CreateTaskPage/Pricing";
import Publish from "sections/CreateTaskPage/Publish";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "utils/cn";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import Loader from "components/Loader";
import { AxiosError } from "axios";
import { useToast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";
import ConfirmTransaction from "@/sections/CreateTaskPage/ConfirmTransaction";

export const CREATE_TASK_TITLE_PREFIX = "I can ";

export const taskFaqSchema = yup.object({
  question: yup.string().required(),
  answer: yup
    .string()
    .max(300, "it cannot be more than 300 characters.")
    .required(),
});

export const taskKeywordSchema = yup
  .string()
  .min(2, "It should be atleast contain 2 characters")
  .required("This field is required");

const schema = yup.object({
  title: yup
    .string()
    .required("title is required")
    .min(15, "Create a title with atleast 15 characters minimum"),
  category: yup
    .string()
    .required("category is required")
    .notOneOf(["", " "], "category is required"),
  subCategory: yup
    .string()
    .required("sub category is required")
    .notOneOf(["", " "], "sub category is required"),
  projectAttributes: yup.array().of(yup.string()),
  keywords: yup
    .array()
    .of(
      yup.object({
        title: taskKeywordSchema,
        value: yup.boolean().default(false),
      })
    )
    .required("This field is required")
    .min(2, "atleast add 3 keywords")
    .max(5, "No more than 5 keywords can be entered"),
  pricingTitle: yup.string().required("pricing title is required"),
  packageDescription: yup
    .string()
    .required("Description is required")
    .max(1200, "description cannot be more than 1200 characters"),
  deliveryDays: yup
    .number()
    .required("Delivery Days are required")
    .notOneOf([0], "Delivery Days are required"),
  price: yup.number().required("Price is required"),
  images: yup.array().of(yup.mixed()),
  isPublish: yup.boolean().default(false),
  faqs: yup.array().of(taskFaqSchema),
  revision: yup.number().required("Revision is required."),
});

const steps = [
  {
    id: "1",
    name: "Overview",
    fields: [
      "title",
      "category",
      "subCategory",
      "keywords",
      "projectAttributes",
    ],
  },
  {
    id: "2",
    name: "Pricing",
    fields: ["pricingTitle", "deliveryDays", "price", "serviceOptions"],
  },
  {
    id: "3",
    name: "Description & Requirments",
    fields: ["packageDescription"],
  },
  {
    id: "4",
    name: "Gallery & Portfolio",
    fields: ["images", "externalLink", "socialLinks"],
  },
  {
    id: "5",
    name: "Publish",
    fields: ["", ""],
  },
  {
    id: "5",
    name: "Confirm Transaction",
    fields: ["", ""],
  },
];

function CreateTaskPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");
  const isEditMode = Boolean(searchParams.get("editMode") || false);
  const section = searchParams.get("section");
  const axiosPrivate = useAxiosPrivate();
  const { toast } = useToast();

  const {
    data: singleTask,
    isLoading: isTaskLoading,
    isFetched: isSingleTaskFetched,
  } = useQuery({
    queryKey: ["edit task", taskId],
    enabled: isEditMode,
    keepPreviousData: false,
    cacheTime: 0,
    queryFn: async () => {
      const res = await axiosPrivate.get(`/task/${taskId}`);
      return res.data.data;
    },
  });

  const [tab, setTab] = useState(0);
  const isPreviousTab = tab > 0;
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    disabled: isEditMode ? !(isTaskLoading === false) : false,
    defaultValues: {
      isPublish: false,
    },
  });

  const isLoading = methods.formState.isSubmitting;

  const onSubmit = (data: any) => {
    return new Promise((resolve) => {
      const createTask = async () => {
        if (isEditMode) {
          const formattedKeywords = data.keywords
            .filter((item: any) => (item.value === true ? item : null))
            .map((item: any) => item.title);

          const filteredFaqs = data.faqs.map((item: any) => ({
            question: item.question,
            answer: item.answer,
          }));

          const body = {
            ...data,
            title: `${CREATE_TASK_TITLE_PREFIX}${data.title}`,
            userId: user._id,
            keywords: formattedKeywords, // working now
            faqs: filteredFaqs,
          };

          // const formData = new FormData();

          // formData.append("userId", body.userId);
          // formData.append("title", body.title);
          // formData.append("keywords", body.keywords);
          // formData.append("pricingTitle", body.pricingTitle);
          // formData.append("description", body.description);
          // formData.append("deliveryDays", body.deliveryDays);
          // formData.append("price", body.price);
          // formData.append("packageDescription", body.packageDescription);
          // formData.append("isPublish", body.isPublish);
          // formData.append("category", body.category);
          // formData.append("subCategory", body.subCategory);
          // formData.append("faqs", JSON.stringify(body.faqs));

          try {
            const res = await axiosPrivate.patch(
              `/updatetasks/${user._id}/${taskId}`,
              body
            );

            const formatedImages = data.images.map((item: any) => {
              return item.file;
            });

            // Construct FormData and append image files
            const formData = new FormData();
            formatedImages.forEach((img: string) => {
              formData.append("images", img);
            });
            const ImgResponse = await axiosPrivate.put(
              `/updatetasksImages/${user._id}/${taskId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            resolve(ImgResponse.data);
            resolve(res.data);
            navigate(`/profile/${user._id}/tasks`);
          } catch (error) {
            resolve(error);
          }

          return;
        }

        const formatedImages = data.images.map((item: any) => {
          return item.file;
        });

        const formattedKeywords = data.keywords
          .filter((item: any) => (item.value === true ? item.title : null))
          .map((item: any) => item.title);

        const filteredFaqs = data.faqs.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        const body = {
          ...data,
          title: `${CREATE_TASK_TITLE_PREFIX}${data.title}`,
          images: formatedImages,
          keywords: formattedKeywords,
          userId: user._id,
          faqs: filteredFaqs,
        };

        const formData = new FormData();

        formData.append("userId", body.userId);
        formData.append("title", body.title);
        formData.append("keywords", body.keywords);
        formData.append("pricingTitle", body.pricingTitle);
        formData.append("description", body.description);
        formData.append("deliveryDays", body.deliveryDays);
        formData.append("price", body.price);
        formData.append("packageDescription", body.packageDescription);
        formData.append("isPublish", body.isPublish);
        formData.append("category", body.category);
        formData.append("subCategory", body.subCategory);
        formData.append("faqs", JSON.stringify(body.faqs));
        formData.append("revision", body.revision);

        body.images.forEach((img: string) => {
          formData.append("images", img);
        });

        try {
          const res = await axiosPrivate.post("/create-task", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          resolve(res.data);
          searchParams.set("taskId", res.data.data._id);
          setSearchParams(searchParams);

          // navigate(`/dashboard`);
          setTab((val) => val + 1);
        } catch (error) {
          if (error instanceof AxiosError) {
            const is4TaskError = (error.response?.data.msg as string).match(
              /4 tasks/i
            );
            const isCompleteProfileError = (
              error.response?.data.msg as string
            ).match(/complete your profile/i);

            toast({
              title: error.response?.data.msg,
              description: is4TaskError
                ? "If you want to add new Gigs then please remove your other ones or edit them"
                : "",
              variant: "destructive",
              action: isCompleteProfileError ? (
                <ToastAction
                  altText="Contiue to complete profile"
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  Continue
                </ToastAction>
              ) : undefined,
            });
          }

          resolve(error);
        }
      };

      createTask();
    });
  };

  const onNextClick = async () => {
    const allFieldsOfTab = steps[tab].fields;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const errors = await methods.trigger(allFieldsOfTab, {
      shouldFocus: true,
    });

    if (errors === false) return;

    if (tab === steps.length - 2) {
      methods.handleSubmit(onSubmit)();
      return;
    }

    setTab((val) => val + 1);
  };

  useEffect(() => {
    if (!isEditMode || isSingleTaskFetched === false) return;

    const updatedKeywords = singleTask?.keywords.map((item: any) => ({
      title: item,
      value: true,
    }));

    const updatedImages = singleTask.images.map((image: any) => {
      return {
        ...image,
        id: image._id, // Renaming _id to id
      };
    });

    const data = {
      ...singleTask,
      title: singleTask.title.replace(CREATE_TASK_TITLE_PREFIX, ""),
      keywords: updatedKeywords,
      images: updatedImages, // Setting the updated images array
    };

    methods.reset(data);
  }, [isEditMode, isSingleTaskFetched]);

  useEffect(() => {
    if (section) {
      steps.forEach((item, index) => {
        if (item.name === section) {
          setTab(index);
        }
      });
    }
  }, [section]);

  return (
    <div className="container-wrapper">
      <header className="absolute left-0 flex items-center w-full h-16 bg-white top-navbar-height">
        <div className="flex items-center justify-between container-wrapper">
          <TabBar
            showLine={false}
            className="flex flex-wrap [&>*]:mx-3 [&>*]:my-1 -mx-3 -my-1"
          >
            {steps
              .filter((item) =>
                item.name === "Confirm Transaction" &&
                singleTask?.blockchainCreationStatus === "success"
                  ? null
                  : item
              )
              .map((step, i) => {
                const stepIndex = steps.indexOf(step);

                return (
                  <button
                    type="button"
                    key={i}
                    // active={stepIndex === tab}
                    className={cn(
                      "cursor-auto flex items-center space-x-3 flex-row opacity-40",
                      stepIndex === tab ? "opacity-100" : null
                    )}
                  >
                    <span>{step.name}</span>

                    {i === steps.length - 1 ? null : (
                      <FaChevronRight className="opacity-60" />
                    )}
                  </button>
                );
              })}
          </TabBar>

          {isEditMode ? (
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                variant="simple"
                onClick={() => navigate(`/profile/${user._id}/tasks`)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => methods.handleSubmit(onSubmit)()}
                disabled={methods.formState.isSubmitting}
              >
                <span className="w-5 h-5 mr-1.5 flex items-center justify-center relative bottom-[.1em]">
                  {methods.formState.isSubmitting ? (
                    <Loader.CircularSnake
                      color="white"
                      className="w-[80%] h-[80%] "
                    />
                  ) : (
                    <Save className="w-full h-full" />
                  )}
                </span>
                Save
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mt-16">
        {/* <header className="mt-16 mb-8">
        <div className="flex items-center mb-6 space-x-4">
          <button type="button" onClick={() => navigate(-1)}>
            <FaChevronLeft />
          </button>

          <Typography variant="2xl" className="font-bold">
            Create Task
          </Typography>
        </div>
      </header> */}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="relative">
              {tab === 0 ? <Overview /> : null}
              {tab === 1 ? <Pricing /> : null}
              {tab === 2 ? <DescriptionAndRequirements /> : null}
              {tab === 3 ? <Gallery isEditMode={isEditMode} /> : null}
              {tab === 4 ? <Publish nextClick={onNextClick} /> : null}
              {singleTask?.blockchainCreationStatus !== "success" ? (
                <>{tab === 5 ? <ConfirmTransaction /> : null}</>
              ) : null}

              {/* {isEditMode === false ? (
                <>{tab === 5 ? <ConfirmTransaction /> : null}</>
              ) : null} */}

              <div className="flex items-center justify-between mt-5">
                {isPreviousTab ? (
                  <>
                    {tab === steps.length - 1 ? null : (
                      <Button
                        onClick={() => {
                          if (isPreviousTab) {
                            setTab((val) => val - 1);
                          }
                        }}
                        startIcon={<FaChevronLeft />}
                      >
                        Back
                      </Button>
                    )}
                  </>
                ) : (
                  <span />
                )}

                {/* {steps[steps.indexOf(tab) - 1] ? (
              <Button
                onClick={() => {
                  const condition = steps[steps.indexOf(tab) - 1];
                  setTab(condition);
                }}
                startIcon={
                  steps[steps.indexOf(tab) - 1] === undefined ? null : (
                    <FaChevronLeft />
                  )
                }
              >
                {steps[steps.indexOf(tab) - 1]}
              </Button>
            ) : (
              <span></span>
            )}

            {!isLastTab ? (
              <Button
                onClick={() => {
                  setTab(isThereNextTab);
                }}
                endIcon={isThereNextTab ? <FaChevronRight /> : null}
              >
                {isThereNextTab ? isThereNextTab : null}
              </Button>
            ) : (
              <Button key="new item" type="submit">
                Create Task
              </Button>
            )} */}

                {tab === steps.length - 2 || tab === steps.length - 1 ? (
                  <span />
                ) : (
                  <Button
                    loading={isLoading}
                    disabled={isLoading}
                    type="button"
                    onClick={onNextClick}
                    endIcon={
                      tab === steps.length - 1 ? null : <FaChevronRight />
                    }
                  >
                    {tab === steps.length - 1
                      ? "Create Task"
                      : // : `Next: ${steps[tab + 1].name}`}
                        `Next`}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
}

export default CreateTaskPage;
