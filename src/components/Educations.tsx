import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Method } from "axios";
import { EducationType } from "types/education.types";
import { useQueryClient } from "@tanstack/react-query";
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
import Typography from "./Typography";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";
import EducationCard from "./EducationCard";

interface EducationFormType {
  closeModal: () => void;
  educationDataForEdit: EducationType | null | undefined;
  userId: string;
}

const currentYear = new Date().getFullYear();

interface FormData extends Omit<EducationType, "_id"> {}

const schema: yup.ObjectSchema<FormData> = yup
  .object({
    degree: yup.string().required("This field is required."),
    school: yup.string().required("This field is required."),
    graduation_year: yup
      .number()
      .transform((value) => {
        if (
          Number.isNaN(value) ||
          value === "" ||
          value === null ||
          value === undefined
        )
          return undefined;
        return value;
      })
      .required("This field is required.")
      .test({
        name: "check if 4 digit",
        test: (value) => /^\d{4}$/.test(String(value)),
        message: "Date has wrong format. Use this format instead: YYYY",
      })
      .min(1964, "The value must be greater than or equal to 1964")
      .test({
        name: "check max",
        message: `The value must be less than or equal to ${currentYear}`,
        test: (value) => {
          return !(value > currentYear);
        },
      }),
  })
  .required();

function EducationForm({
  closeModal,
  educationDataForEdit,
  userId,
}: EducationFormType) {
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const apiCallMethod: Method = educationDataForEdit ? "put" : "post";
  const endpoint = educationDataForEdit
    ? `/updateEducation/${user._id}/${educationDataForEdit._id}`
    : `/addeducation/${user._id}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: educationDataForEdit?._id ? educationDataForEdit : undefined,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axiosPrivate[apiCallMethod](endpoint, data);
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      closeModal();
    } catch (err: any) {
      toast({
        title: "Unexpected error occurred.",
        description: err.response?.data?.message || "Please try again in sometime or try after refreshing website",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader
        variant="bordered"
        className="flex flex-row items-center justify-between space-y-0 px-8"
      >
        <Typography variant="xl">Add license or certification</Typography>
        <DialogCloseIcon />
      </DialogHeader>

      <main className="p-8 grid grid-cols-2 gap-6">
        <Input
          variant="outlined"
          label="Degree"
          placeholder="Your Degree Name"
          {...register("degree")}
          error={errors?.degree?.message}
        />

        <Input
          variant="outlined"
          label="School"
          placeholder="Enter your school"
          {...register("school")}
          error={errors?.school?.message}
        />

        <Input
          variant="outlined"
          label="Graduation Year"
          placeholder="2002"
          type="number"
          {...register("graduation_year", { valueAsNumber: true })}
          error={errors?.graduation_year?.message}
        />
      </main>

      <DialogFooter
        variant="bordered"
        className="px-8 flex items-center justify-end space-x-5"
      >
        <DialogClose asChild>
          <Button variant="simple">
            {educationDataForEdit?._id ? "Cancel" : "Close"}
          </Button>
        </DialogClose>

        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="w-[10rem]"
        >
          {isSubmitting ? (
            <Loader.CircularSnake color="white" />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>{educationDataForEdit ? "Edit" : "Save changes"}</>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

function Educations() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { userId } = useParams();
  const [educationDataForEdit, setCertificateDataForEdit] = useState<
    EducationType | null | undefined
  >(null);
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const profile: any = queryClient.getQueryData(["profile", userId]);
  const { isToken } = useContext(AuthContext);
  const isUser = isToken ? profile._id === user._id : false;

  const handleEditClick = (certificate: EducationType) => {
    setCertificateDataForEdit(certificate);
    setDialogOpen(true);
  };

  const closeModal = () => {
    setCertificateDataForEdit(null);
    setDialogOpen(false);
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        if (open === false && educationDataForEdit?._id) {
          setCertificateDataForEdit(null);
        }
        setDialogOpen(open);
      }}
    >
      <Paper>
        <header className="flex items-center justify-between mb-5">
          <Typography variant="xl" className="font-medium">
            Education
          </Typography>

          {isUser ? (
            <DialogTrigger asChild>
              <Button size="sm">Create</Button>
            </DialogTrigger>
          ) : null}
        </header>

        <div className="space-y-4">
          {profile.education && profile?.education?.length !== 0 ? (
            profile.education.map((item: EducationType, i: number) => (
              <EducationCard
                key={i}
                _id={item._id}
                onEditClick={handleEditClick}
                degree={item.degree}
                graduation_year={item.graduation_year}
                school={item.school}
              />
            ))
          ) : (
            <div className="text-center">
              <Typography variant="lg" className="font-medium opacity-80 mb-3">
                Add your education and degrees.
              </Typography>
              <Typography className="opacity-60 mb-4">
                You {"haven't"} added any education and degress to showcase your
                achievements. Click the Create button to start highlighting your
                accomplishments and enhancing your profile.
              </Typography>
            </div>
          )}
        </div>
      </Paper>

      {isUser ? (
        <DialogContent className="sm:max-w-[40rem] p-0">
          <EducationForm
            educationDataForEdit={educationDataForEdit}
            closeModal={closeModal}
            userId={userId}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default Educations;
