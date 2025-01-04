import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { MdAdd } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "Providers/AuthContextProvider";
import Paper from "./Paper";
import Typography from "./Typography";
import Button from "./Button";
import {
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./Dialog";
import Input from "./Input";
import Textarea from "./Textarea";
import Loader from "./Loader";
import EditPencilIcon from "./EditPencilIcon";

const MAX_DESC_LEN = 1000;
const TITLE_MAX = 55;

const schema = yup.object({
  title: yup
    .string()
    .required("This field is required")
    .max(TITLE_MAX, `Must be ${TITLE_MAX} characters or less`),
  description: yup
    .string()
    .required("This field is required")
    .max(MAX_DESC_LEN, `Must be ${MAX_DESC_LEN} characters or less`),
});

type FormType = {
  title: any;
  description: any;
};

export default function ProfileDetails() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { isToken } = useContext(AuthContext);
  const user: any = queryClient.getQueryData(["user"]);
  const { data: profile, refetch: refetchProfile } = useQuery<any>({
    queryKey: ["profile", userId],
    enabled: false,
  });

  const isUser = isToken ? profile._id === user._id : false;

  const [isModalOpen, setModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const initialValue: FormType = {
    title: profile.title,
    description: profile.description,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const onSubmit = (data: FormType) => {
    return new Promise((resolve) => {
      const func = async () => {
        try {
          await axiosPrivate.patch(`/profile/${user._id}`, {
            title: data.title,
            description: data.description,
          });

          await refetchProfile();

          resolve("");
          setModalOpen(false);
        } catch (error) {
          resolve("");
        }
      };

      func();
    });
  };

  const handleModelClose = () => {
    reset(initialValue);
  };

  useEffect(() => {
    if (isModalOpen === false) {
      handleModelClose();
    }
  }, [isModalOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={(value) => setModalOpen(value)}>
      <Paper size={6}>
        <div className="relative">
          {profile?.title && profile?.description ? (
            <>
              <div className="font-medium opacity-90 mb-3 text-2xl flex items-center justify-between space-x-6">
                <h1>{profile?.title}</h1>

                {isUser ? (
                  <EditPencilIcon
                    className="static"
                    onClick={() => setModalOpen(true)}
                  />
                ) : null}
              </div>
              <div className="opacity-60">
                {profile?.description ? (
                  profile?.description
                ) : (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {isUser ? (
                      <Button className="text-green-600 underline">
                        Add description
                      </Button>
                    ) : null}
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
              <header className="flex items-center justify-between mb-4">
                <Typography variant="xl" className="font-medium">
                  Headline & Bio
                </Typography>

                {isUser ? (
                  <Button
                    size="sm"
                    onClick={() => setModalOpen(true)}
                    className="flex items-center space-x-1"
                  >
                    <span className="lh-1 relative bottom-[-.05em] block">
                      Add Bio
                    </span>{" "}
                    <MdAdd className="text-[1.2em]" />
                  </Button>
                ) : null}
              </header>

              <Typography
                variant="lg"
                className="text-center font-medium mb-2 opacity-90"
              >
                No Details to show
              </Typography>

              <Typography
                variant="base"
                className="text-center opacity-80 max-w-[40rem] mx-auto w-full mb-5"
              >
                Please add your profile Headline and Bio to let others know who
                you are
              </Typography>
            </div>
          )}
        </div>
      </Paper>

      <DialogContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="[&>*]:px-8">
          <DialogHeader
            variant="bordered"
            className="flex items-center justify-between border-black/10"
          >
            <p className="text-xl font-medium uppercase opacity-80">BIO</p>
            <DialogCloseIcon />
          </DialogHeader>

          <main className="py-5 space-y-5 [&>*]:space-y-2 max-h-[calc(100vh-200px)] overflow-auto">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Headline*</p>
                <p className="opacity-60">
                  {watch("title")?.length || 0} / {TITLE_MAX}
                </p>
              </div>
              <Input
                variant="outlined"
                className="border"
                placeholder="Ex: Product Design Manager"
                error={errors.title?.message}
                {...register("title")}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Your bio*</p>
                <p className="opacity-60">
                  {watch("description")?.length || 0} / {MAX_DESC_LEN}
                </p>
              </div>
              <Textarea
                variant="outlined"
                className="border h-[10rem]"
                placeholder="Add a short bio to showcase your best self."
                error={errors.description?.message}
                {...register("description")}
              />
            </div>
          </main>

          <DialogFooter
            variant="bordered"
            className="flex items-center justify-end space-x-4 border-black/10"
          >
            <DialogClose asChild>
              <Button variant="outlined">Cancel</Button>
            </DialogClose>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="max-w-[6rem] w-full"
            >
              {isSubmitting ? <Loader.CircularSnake color="white" /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
