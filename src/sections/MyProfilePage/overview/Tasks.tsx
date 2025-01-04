import Button from "components/Button";
import TaskCard, { TaskCardSkeleton } from "components/TaskCard";
import Typography from "components/Typography";
import { useQuery } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import axios from "api/axios";

function Tasks({ className }: { className?: string }) {
  const { data, isLoading } = useQuery(["all tasks"], {
    queryFn: async () => {
      const res = await axios.get(`/tasks`);
      return res.data.data;
    },
  });

  return (
    <>
      {/* <header className="flex items-center justify-between mb-5">
        <Typography variant="xl" className="font-medium cursor-pointer">
          <Typography variant="xl">Task</Typography>
        </Typography>

        {user?.kind === 0 ? (
          <FilterButtons />
        ) : (
          <Button asChild>
            <Link to="/create-task">Create</Link>
          </Button>
        )}
      </header> */}

      {isLoading ? (
        <div className={twMerge("grid grid-cols-3 gap-6", className)}>
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
        </div>
      ) : (
        <>
          {/* <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={20}
              className="min-w-full max-w-full w-full"
              allowTouchMove={false}
              navigation={{
                prevEl: "#task-prevEl",
                nextEl: "#task-nextEl",
                hiddenClass: ".hidden",
              }}
              breakpoints={{
                1026: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                600: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                100: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
              }}
            > */}
          <div className={twMerge("grid grid-cols-3 gap-6", className)}>
            {data?.map((item: any, i: number) => (
              <TaskCard data={item} key={i} />
            ))}
          </div>
          {/* </Swiper> */}

          {/* <div className="flex items-center justify-end space-x-4 [&>*.swiper-button-lock]:hidden mt-6">
            <SliderNavigationButton id="task-prevEl" className="rotate-180" />
            <SliderNavigationButton id="task-nextEl" />
          </div> */}
        </>
      )}

      {data?.length === 0 || !data ? (
        <div className="text-center">
          <Typography variant="lg" className="font-medium opacity-80 mb-3">
            No tasks found
          </Typography>
          <Typography className="opacity-60 mb-4">
            You {"haven't"} added any tasks to your profile. Click the Create
            button to start creating tasks.
          </Typography>

          <Button size="sm" className="mx-auto">
            Create Task
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default Tasks;
