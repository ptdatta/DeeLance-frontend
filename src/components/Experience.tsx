import { months, years } from "utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { ExperienceType } from "types/exeprience.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "Providers/AuthContextProvider";
import Button from "./Button";
import {
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./Dialog";
import Input from "./Input";
import Paper from "./Paper";
import SelectBox from "./SelectBox";
import Typography from "./Typography";
import Checkbox from "./Checkbox";
import MediaQueryWrapper from "./MediaQueryWrapper";
import Loader from "./Loader";
import EmployementHistoryCard from "./EmploymentHistoryCard";

interface FormType extends Omit<ExperienceType, "_id"> {}

const schema: yup.ObjectSchema<FormType> = yup.object({
  title: yup.string().required("Title is a required"),
  companyName: yup.string().required("Company name is a required"),
  location: yup.string().required("Location name is a required"),

  locationType: yup
    .string()
    .required("Location type is required")
    .notOneOf(["", "Please Select"], "please select month"),
  employementType: yup
    .string()
    .required("Employement type is required")
    .notOneOf(["", "Please Select"], "please select month"),

  startMonth: yup
    .string()
    .required("Start month is required")
    .notOneOf(["", "month", "Month"], "please select month"),
  startYear: yup
    .string()
    .required("Start year is required")
    .notOneOf(["", "Year", "year"], "Year cannot be empty"),

  currentlyWorkingHere: yup.boolean(),

  endMonth: yup
    .string()
    .default("")
    .when("currentlyWorkingHere", {
      is: false,
      then: () => yup.string().required("End month is required"),
      otherwise: () => yup.string().default(""),
    }),
  endYear: yup
    .string()
    .default("")
    .when("currentlyWorkingHere", {
      is: false,
      then: () => yup.string().required("End year is required"),
      otherwise: () => yup.string().default(""),
    }),
});

function ExperienceModal({
  closeModal,
  experienceForEdit,
}: {
  closeModal: () => void;
  experienceForEdit: ExperienceType | null;
}) {
  const queryClient = useQueryClient();
  // const { userId } = useParams();
  const user: any = queryClient.getQueryData(["user"]);
  const { refetch: refetchProfile } = useQuery({
    queryKey: ["profile", user._id],
    enabled: false,
  });

  const axiosPrivate = useAxiosPrivate();
  const isEditMode = experienceForEdit?.title || experienceForEdit;
  const defaultValues = isEditMode
    ? experienceForEdit
    : { currentlyWorkingHere: true };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    const dataServerNeeds = {
      title: data.title,
      companyName: data.companyName,
      location: data.location,
      locationType: data.locationType,
      employementType: data.employementType,
      currentlyWorkingHere: data.currentlyWorkingHere,
      startMonth: data.startMonth,
      startYear: data.startYear,
      endMonth: data.endMonth,
      endYear: data.endYear,
    };

    return new Promise((resolve) => {
      const func = async () => {
        try {
          if (isEditMode) {
            await axiosPrivate.patch(
              `/api/users/${user._id}/${experienceForEdit?._id}`,
              dataServerNeeds
            );
            await refetchProfile();
            resolve("");
            closeModal();
          } else {
            await axiosPrivate.post(
              `/addExprience/${user._id}`,
              dataServerNeeds
            );
            await refetchProfile();
            resolve("");
            closeModal();
          }
        } catch (error) {
          resolve("");
        }
      };
      func();
    });
  };

  const currentlyWorking = watch("currentlyWorkingHere");

  useEffect(() => {
    if (currentlyWorking) {
      setValue("endMonth", "");
      setValue("endYear", "");
    }
  }, [currentlyWorking]);

  return (
    <div className="max-h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader
          variant="bordered"
          className="flex flex-row items-center justify-between space-y-0 px-8"
        >
          <Typography variant="xl">Add experience</Typography>
          <DialogCloseIcon />
        </DialogHeader>

        <main className="p-8 grid grid-cols-2 gap-6 overflow-y-auto max-h-[calc(100vh-240px)]">
          <Input
            variant="outlined"
            label="Title"
            placeholder="Ex: Retail Sales Manager"
            {...register("title")}
            error={errors?.title?.message}
          />

          <Input
            variant="outlined"
            label="Company name"
            placeholder="Ex: Microsoft"
            {...register("companyName")}
            error={errors?.companyName?.message}
          />

          <div className="col-span-2">
            <Input
              variant="outlined"
              label="Location"
              placeholder="Ex: London, United Kingdom"
              {...register("location")}
              error={errors?.location?.message}
            />
          </div>

          <SelectBox
            variant="outlined"
            label="Location type"
            className="rounded-md"
            {...register("locationType")}
            error={errors?.locationType?.message}
          >
            <option value="">Please select</option>

            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </SelectBox>

          <SelectBox
            variant="outlined"
            label="Employement type"
            className="rounded-md"
            {...register("employementType")}
            error={errors?.employementType?.message}
          >
            <option value="">Please select</option>

            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Apprenticeship">Apprenticeship</option>
            <option value="Seasonal">Seasonal</option>
          </SelectBox>

          <div className="col-span-2">
            <Controller
              name="currentlyWorkingHere"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="I am currently working in this role"
                  isChecked={field.value}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <SelectBox
            variant="outlined"
            label="Start date"
            className="rounded-md"
            {...register("startMonth")}
            error={errors?.startMonth?.message}
          >
            <option value="">Month</option>
            {months.map((item) => (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            variant="outlined"
            label={<span className="opacity-0">Year</span>}
            className="rounded-md"
            {...register("startYear")}
            error={errors?.startYear?.message}
          >
            <option value="">Year</option>

            {years.map((item) => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            variant="outlined"
            label="End date"
            className="rounded-md"
            {...register("endMonth")}
            error={errors?.endMonth?.message}
            disabled={watch("currentlyWorkingHere")}
          >
            <option value="">Month</option>
            {months.map((item) => (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            variant="outlined"
            label={<span className="opacity-0">Year</span>}
            className="rounded-md"
            {...register("endYear")}
            error={errors?.endYear?.message}
            disabled={watch("currentlyWorkingHere")}
          >
            <option value="">Year</option>

            {years.map((item) => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
          </SelectBox>
        </main>

        <DialogFooter
          variant="bordered"
          className="px-8 flex space-x-3 items-center justify-end"
        >
          <DialogClose asChild>
            <Button variant="outlined">
              {isEditMode ? "Cancel" : "Close"}
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting} className="w-[9rem]">
            {isSubmitting ? (
              <Loader.CircularSnake color="white" />
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}

function Experience() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const user: any = queryClient.getQueryData(["user"]);
  const profile: any = queryClient.getQueryData(["profile", userId]);
  const { isToken } = useContext(AuthContext);
  const isUser = isToken ? profile._id === user._id : false;
  const [experienceForEdit, setExperienceForEdit] =
    useState<ExperienceType | null>(null);

  const experience = profile?.experience;

  const handleEditClick = (experienceData: ExperienceType) => {
    setExperienceForEdit(experienceData);
    setDialogOpen(true);
  };

  const closeModal = () => {
    setDialogOpen(false);
    setExperienceForEdit(null);
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        if (open === false) {
          setExperienceForEdit(null);
        }
        setDialogOpen(open);
      }}
    >
      <Paper>
        <header className="flex items-center justify-between mb-5">
          <Typography variant="xl" className="font-medium">
            Employement history
          </Typography>

          {isUser ? (
            <MediaQueryWrapper breakpoint="sm">
              <DialogTrigger asChild>
                <Button size="sm">ADD NEW</Button>
              </DialogTrigger>
            </MediaQueryWrapper>
          ) : null}
        </header>

        <div className="[&>*:not(:last-child)]:pb-6">
          {experience && experience?.length !== 0 ? (
            experience.map((item: ExperienceType, i: number) => (
              <div key={i} className="relative z-10">
                <EmployementHistoryCard
                  _id={item._id}
                  title={item.title}
                  companyName={item.companyName}
                  location={item.location}
                  locationType={item.locationType}
                  employementType={item.employementType}
                  startMonth={item.startMonth}
                  startYear={item.startYear}
                  currentlyWorkingHere={item.currentlyWorkingHere}
                  endMonth={item.endMonth}
                  endYear={item.endYear}
                  onEditClick={handleEditClick}
                />
              </div>
            ))
          ) : (
            <div className="text-center">
              <Typography variant="lg" className="font-medium opacity-80 mb-3">
                No Experience to show
              </Typography>
              <Typography className="opacity-60 mb-4">
                You {"haven't"} added any experience to showcase your
                achievements. Click the Create button to start highlighting your
                accomplishments and enhancing your profile.
              </Typography>
            </div>
          )}
        </div>

        {isUser ? (
          <MediaQueryWrapper breakpoint="sm" inverse>
            <DialogTrigger asChild>
              <Button className="w-full mt-5">ADD NEW</Button>
            </DialogTrigger>
          </MediaQueryWrapper>
        ) : null}
      </Paper>

      {isUser ? (
        <DialogContent className="sm:max-w-[40rem] p-0 max-h-[90vh] overflow-y-auto">
          <ExperienceModal
            experienceForEdit={experienceForEdit}
            closeModal={closeModal}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default Experience;
