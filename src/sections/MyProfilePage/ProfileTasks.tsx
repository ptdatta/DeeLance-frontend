import { Badge } from "@/components/ui/badge";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "Providers/AuthContextProvider";
import TaskCard, { TaskCardSkeleton } from "components/TaskCard";
import Typography from "components/Typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type TasksVisibility =
  | "published"
  | "un-published"
  | "failed-init-tx-status"
  | "all";

function ProfileTasks() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const user: any = queryClient.getQueryData(["user"]);
  const profile: any = queryClient.getQueryData(["profile", userId]);
  const { isToken } = useContext(AuthContext);
  const isUser = isToken ? profile._id === user._id : false;
  const [visibleTasks, setVisibleTasks] = useState<TasksVisibility>("all");
  const axiosPrivate = useAxiosPrivate();

  const { data: tasks, isLoading: areTasksLoading } = useQuery({
    queryKey: ["user tasks", profile._id],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/tasks/user/${profile._id}`);
      return res.data.data;
    },
    select: (data) => {
      const failedBlockchainTxTasks = data.filter(
        (item: any) => item.blockchainCreationStatus === "failed"
      );

      const publishedTasks = data.filter((item: any) => {
        if (item.blockchainCreationStatus === "failed") {
          return null;
        }

        return item.isPublish;
      });

      const unPublishTasks = data.filter((item: any) => {
        if (item.blockchainCreationStatus === "failed") {
          return null;
        }

        return item.isPublish === false;
      });

      return {
        published: publishedTasks,
        "un-published": unPublishTasks,
        "failed-init-tx-status": failedBlockchainTxTasks,
        all: data,
      };
    },
  });

  return (
    <div>
      {isUser ? (
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="lg" className="font-bold opacity-80">
            {visibleTasks === "published" ? "Published" : "Unpublished"} Tasks
          </Typography>

          <div className="relative">
            <Select
              defaultValue="all"
              onValueChange={(value: TasksVisibility) => setVisibleTasks(value)}
            >
              <SelectTrigger className="w-[220px] data-[state=open]:animate-in [&[data-state='open']_#ping]:hidden">
                <SelectValue placeholder="Select a Visibility" />

                {visibleTasks !== "failed-init-tx-status" &&
                tasks?.["failed-init-tx-status"].length !== 0 ? (
                  <div
                    id="ping"
                    className="w-3 h-3 rounded-full z-10 bg-red-600/60 absolute -top-0.5 -right-0.5 before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-red-600 before:absolute before:animate-ping before:-z-10"
                  />
                ) : null}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter by Visibility</SelectLabel>
                  <SelectItem value="all">
                    <span className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 border-black/50 !p-0 w-4 h-4 flex items-center justify-center text-[10px]"
                      >
                        {tasks?.all.length}
                      </Badge>
                      <span>All Tasks</span>{" "}
                    </span>
                  </SelectItem>
                  <SelectItem value="published">
                    <span className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 border-black/50 !p-0 w-4 h-4 flex items-center justify-center text-[10px]"
                      >
                        {tasks?.published.length}
                      </Badge>
                      <span>Published Tasks</span>{" "}
                    </span>
                  </SelectItem>
                  <SelectItem value="un-published">
                    <span className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 border-black/50 !p-0 w-4 h-4 flex items-center justify-center text-[10px]"
                      >
                        {tasks?.["un-published"].length}
                      </Badge>
                      <span>Unpublished Tasks</span>{" "}
                    </span>
                  </SelectItem>
                  <SelectItem value="failed-init-tx-status">
                    <span className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 border-black/50 !p-0 w-4 h-4 flex items-center justify-center text-[10px]"
                      >
                        {tasks?.["failed-init-tx-status"].length}
                      </Badge>
                      <span>Failed Tx Tasks</span>
                      {visibleTasks !== "failed-init-tx-status" &&
                      tasks?.["failed-init-tx-status"].length !== 0 ? (
                        <span className="w-2 h-2 rounded-full z-10 bg-red-600/60 relative before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-red-600 before:absolute before:animate-ping before:-z-10" />
                      ) : null}
                    </span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : null}

      <div className={twMerge("grid grid-cols-3 gap-6")}>
        {areTasksLoading ? (
          <>
            <TaskCardSkeleton />
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </>
        ) : (
          tasks![visibleTasks]?.map((item: any, i: number) => (
            <TaskCard data={item} key={i} />
          ))
        )}

        {isUser && areTasksLoading === false ? (
          <Link
            to="/create-task"
            type="button"
            className="group dark:bg-woodsmoke-950 rounded-md overflow-hidden border-2 bg-white flex items-center justify-center flex-col min-h-[20rem]"
          >
            <span className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-4 shadow-lg text-xl text-white">
              <FaPlus />
            </span>

            <Typography asChild className="font-black opacity-80">
              <span>Create new Task</span>
            </Typography>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default ProfileTasks;
