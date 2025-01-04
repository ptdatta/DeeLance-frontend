import { FaPencil } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { twMerge } from "tailwind-merge";
import { EducationCardProps } from "types/education.types";
import Typography from "./Typography";
import Button from "./Button";

// function WaitLoader() {
//   return <Loader.CircularSnake className="h-[40%] w-full" color="orangered" />;
// }

function EducationCard({
  _id,
  school,
  graduation_year,
  onEditClick,
  degree,
}: EducationCardProps) {
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const axiosPrivate = useAxiosPrivate();
  const { mutate: deleteEducation, isLoading } = useMutation({
    mutationFn: async () => {
      await axiosPrivate.delete(`/deleteducation/${user._id}/${_id}`);
      await queryClient.refetchQueries({ queryKey: ["user"] });
    },
  });

  return (
    <div
      className={twMerge(
        "flex items-center justify-between space-x-6 group rounded-md transition-all duration-200",
        isLoading ? "bg-red-50 pointer-events-none" : null
      )}
    >
      <div className="flex items-center space-x-4 relative flex-1">
        {/* <div className="w-24 h-24 flex items-center justify-center bg-woodsmoke-100 rounded-md relative">
          <MdVerified className="absolute -top-1 -right-1 text-2xl text-green-haze-600" />

          {isLoading ? (
            <WaitLoader />
          ) : (
            <img
              src="/images/logo-short.svg"
              className="w-[70%] h-[70%]"
              alt=""
            />
          )}
        </div> */}

        <div>
          <Typography variant="lg">{degree}</Typography>

          {school ? (
            <Typography
              variant="base"
              className="mb-2 mt-3 text-black/50 dark:text-white/50 lh-1"
            >
              Provider: {school}
            </Typography>
          ) : null}

          {graduation_year ? (
            <Typography
              variant="base"
              className="text-black/50 dark:text-white/50 lh-1"
            >
              Issued In: {graduation_year}
            </Typography>
          ) : null}
        </div>
      </div>

      {onEditClick ? (
        <div className="flex-shrink-0 hidden group-hover:flex items-center space-x-3">
          <Button
            onClick={() => deleteEducation()}
            variant="error-outlined"
            shape="icon"
            rounded="full"
          >
            <MdOutlineDeleteOutline className="text-[1.4em]" />
          </Button>

          <Button
            onClick={() =>
              onEditClick({
                _id,
                school,
                graduation_year,
                degree,
              })
            }
            variant="outlined"
            shape="icon"
            rounded="full"
          >
            <FaPencil />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default EducationCard;
