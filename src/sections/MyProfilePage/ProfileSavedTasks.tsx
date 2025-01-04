import { useQuery } from "@tanstack/react-query";
import TaskCard, { TaskCardSkeleton } from "components/TaskCard";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

function ProfileSavedTasks() {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useParams();
  const { data: savedTasks, isLoading: isSavedTasksLoading } = useQuery({
    queryKey: ["user-saved-tasks"],
    queryFn: async () => {
      const res = await axiosPrivate(`/getSaveTask/${userId}`);
      return res.data;
    },
  });

  if (isSavedTasksLoading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        <TaskCardSkeleton />
        <TaskCardSkeleton />
        <TaskCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {savedTasks.tasks.map((task: any) => (
        <TaskCard key={task.taskId._id} data={task.taskId} />
      ))}
    </div>
  );
}

export default ProfileSavedTasks;
