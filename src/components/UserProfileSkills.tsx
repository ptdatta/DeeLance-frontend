import { MdAdd } from "react-icons/md";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "Providers/AuthContextProvider";
import Paper from "./Paper";
import Typography from "./Typography";
import Pill from "./Pill";
import Button from "./Button";
import {
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./Dialog";
import Loader from "./Loader";
import Input from "./Input";
import FormError from "./FormError";
import EditPencilIcon from "./EditPencilIcon";

const schema = yup.object({
  skills: yup
    .array()
    .min(5, "Please Must add At least 5 skills")
    .of(
      yup.object().shape({
        code: yup
          .string()
          .required("This field is required")
          .min(2, `Must be 2 characters or more`),
        label: yup
          .string()
          .required("This field is required")
          .min(2, `Must be 2 characters or more`),
      })
    ),
});

const skillSchema = yup.object({
  title: yup
    .string()
    .required("This field is required")
    .min(2, `Must be 2 characters or more`),
});

export default function UserProfileSkills() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { isToken } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const user: any = queryClient.getQueryData(["user"]);
  const profile: any = queryClient.getQueryData(["profile", userId]);
  const isUser = isToken ? profile._id === user._id : false;

  const {
    handleSubmit: saveSkills,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      skills: user?.skills,
    },
  });

  const {
    fields: skillList,
    append,
    remove,
  } = useFieldArray({
    name: "skills",
    control,
  });

  const skillMethods = useForm({
    resolver: yupResolver(skillSchema),
  });

  const skillOnSubmit = (data: any) => {
    append({
      code: data.title,
      label: data.title,
    });

    skillMethods.reset();
  };

  const handleSave = (data: any) => {
    return new Promise((resolve) => {
      const func = async () => {
        try {
          await axiosPrivate.patch(`/user/${user._id}/skills`, {
            skills: data.skills,
          });
          await queryClient.refetchQueries(["profile", userId]);
          resolve("");
          setIsModalOpen(false);
        } catch (error) {
          resolve("");
        }
      };

      func();
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(value) => setIsModalOpen(value)}>
      <Paper>
        <div className="relative">
          <header className="flex items-center justify-between mb-4">
            <Typography variant="xl" className="font-medium">
              Skills
            </Typography>

            {isUser ? (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {profile?.skills?.length > 0 ? (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {isUser ? (
                      <EditPencilIcon onClick={() => setIsModalOpen(true)} />
                    ) : null}
                  </>
                ) : (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <span className="lh-1 relative bottom-[-.05em] block">
                      Add Skills
                    </span>{" "}
                    <MdAdd className="text-[1.2em]" />
                  </Button>
                )}
              </>
            ) : null}
          </header>

          <div className="flex [&>*]:mx-1.5 [&>*]:my-1.5 -mx-1.5 -my-1.5 flex-wrap mt-6">
            {profile?.skills.length === 0 ? (
              <div className="text-center w-full">
                <Typography
                  variant="lg"
                  className="font-medium opacity-80 mb-2"
                >
                  Let Your Abilities Speak for Themselves!
                </Typography>
                <Typography className="opacity-60 mb-4">
                  Excited to impress? Hit {"'Add'"} and {"let's"} make your
                  skills the talk of the town!
                </Typography>
              </div>
            ) : (
              profile?.skills.map((field: any, i: number) => (
                <Pill
                  as="div"
                  className="text-base flex space-x-2 whitespace-nowrap"
                  key={i}
                >
                  <span>{field.label}</span>
                </Pill>
              ))
            )}
          </div>
        </div>
      </Paper>

      {isUser ? (
        <DialogContent className="p-0">
          <div className="[&>*]:px-8">
            <DialogHeader
              variant="bordered"
              className="flex items-center justify-between border-black/10"
            >
              <p className="text-xl font-medium opacity-80">Skills</p>
              <DialogCloseIcon />
            </DialogHeader>

            <main className="py-5 max-h-[calc(100vh-200px)] overflow-auto">
              <p className="text-lg font-medium opacity-80 mb-3">
                Add at least 5 skills.
              </p>

              <div>
                <form
                  onSubmit={skillMethods.handleSubmit(skillOnSubmit)}
                  className="flex space-x-4"
                >
                  <Input
                    variant="outlined"
                    placeholder="Write skill to add"
                    className="flex-1"
                    error={errors.skills?.message}
                    showErrorText={false}
                    {...skillMethods.register("title")}
                  />
                  <Button
                    shape="icon"
                    type="submit"
                    className="flex-shrink-0 w-12 h-auto"
                    disabled={!skillMethods.formState.isValid}
                  >
                    <FaPlus />
                  </Button>
                </form>

                {errors.skills ? (
                  <FormError>{errors.skills?.message}</FormError>
                ) : null}
              </div>

              {skillList.length > 0 ? (
                <div className="overflow-hidden">
                  <div className="mt-4 flex flex-wrap [&>*]:m-1 -m-1">
                    {skillList.map((field, index) => (
                      <Pill
                        as="button"
                        className="text-sm flex space-x-2 whitespace-nowrap items-center group border border-black/20"
                        key={field.id}
                        onClick={() => remove(index)}
                        tabIndex={-1}
                      >
                        <span>{field.label}</span>
                        <IoClose className="opacity-50 group-hover:opacity-100" />
                      </Pill>
                    ))}
                  </div>
                </div>
              ) : null}
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
                onClick={() => saveSkills(handleSave)()}
                className="max-w-[6rem] w-full"
              >
                {isSubmitting ? <Loader.CircularSnake color="white" /> : "Save"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
