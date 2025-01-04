import { months } from "utils/constants";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { ExperienceType } from "types/exeprience.type";
import Typography from "./Typography";
import EditPencilIcon from "./EditPencilIcon";
import Button from "./Button";
import Loader from "./Loader";

interface Props extends ExperienceType {
  onEditClick: (data: ExperienceType) => void;
}

function EmployementHistoryCard({
  _id,
  title,
  companyName,
  location,
  locationType,
  employementType,
  startMonth,
  startYear,
  currentlyWorkingHere,
  endMonth,
  endYear,
  onEditClick,
}: Props) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const userData: any = queryClient.getQueryData(["user"]);
  const { mutate: deleteExperience, isLoading: isDeleteing } = useMutation({
    mutationFn: async () => {
      await axiosPrivate.delete(`/deleteExprience/${userData._id}/${_id}`);
      await queryClient.refetchQueries({ queryKey: ["user"] });
    },
  });

  return (
    <div className="relative flex space-x-4 group z-10 overflow-hidden justify-between">
      <main>
        <Typography variant="lg" className="mb-2 font-medium">
          {title}
        </Typography>

        <Typography
          variant="base"
          className="mb-3 text-black/70 dark:text-white/70 lh-1"
        >
          {companyName} - {employementType}
        </Typography>

        <Typography
          variant="base"
          className="mb-2 text-black/50 dark:text-white/50 lh-1"
        >
          {months[Number(startMonth) - 1]?.title} {startYear} -{" "}
          {currentlyWorkingHere
            ? "Present"
            : endMonth && endYear
              ? `${months[Number(endMonth) - 1]?.title} ${endYear}`
              : "End Date Not Available"}
        </Typography>

        <Typography
          variant="base"
          className="mb-2 text-black/50 dark:text-white/50 lh-1"
        >
          {location} - {locationType}
        </Typography>
      </main>

      {onEditClick ? (
        <div className="items-center justify-end space-x-4 hidden group-hover:flex">
          <Button
            shape="icon"
            size="sm"
            variant="error-outlined"
            className="rounded-full"
            onClick={() => deleteExperience()}
            disabled={isDeleteing}
          >
            {isDeleteing ? (
              <Loader.CircularSnake color="black" className="h-1/2" />
            ) : (
              <MdDeleteOutline className="text-[1.4em]" />
            )}
          </Button>

          <EditPencilIcon
            className="static"
            onClick={() =>
              onEditClick({
                _id,
                title,
                companyName,
                location,
                locationType,
                employementType,
                startMonth,
                startYear,
                currentlyWorkingHere,
                endMonth,
                endYear,
              })
            }
          />
        </div>
      ) : null}
    </div>
  );
}

export default EmployementHistoryCard;
