import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { Progress } from "./ui/progress";

function ProfileProgress() {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useParams();
  const userQuery = useQuery({ queryKey: ["profile", userId], enabled: false });
  const user: any = userQuery.data;

  const isUserLoading =
    userQuery.isLoading || userQuery.isFetching || userQuery.isRefetching;
  const { data, isLoading } = useQuery(["progress", isUserLoading], {
    enabled: !user.is_profileCompleted,
    queryFn: async () => {
      const res = await axiosPrivate.get(
        `/api/profile/complete_percentage/${user._id}`
      );
      return res.data;
    },
  });
  const missingAreas = data?.missing_areas;

  if (user.is_profileCompleted) {
    return null;
  }

  if (isLoading) {
    return (
      <div>
        <header className="space-y-3 mb-4">
          <Skeleton className="p-3 rounded-full w-[50%]" />
          <Skeleton className="p-2 rounded-full w-[90%]" />
        </header>

        <div className="flex items-center space-x-4 mb-5">
          <Skeleton className="p-2.5 rounded-full flex-1" />
          <Skeleton className="p-2.5 px-4 rounded-full" />
        </div>

        <div className="space-y-3">
          <Skeleton className="p-1.5 rounded-full" />
          <Skeleton className="p-1.5 rounded-full" />
          <Skeleton className="p-1.5 rounded-full" />
          <Skeleton className="p-1.5 rounded-full" />
          <Skeleton className="p-1.5 rounded-full" />
          <Skeleton className="p-1.5 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-4">
        <h1 className="font-semibold opacity-90 mb-3 text-lg">
          Complete your profile
        </h1>
        <p className="opacity-80">
          By completeing all the details you have a higher chance of being seen
          by recruters.
        </p>
      </header>

      <main>
        <div className="flex items-center space-x-5 mb-5">
          <Progress className="flex-1" value={data?.completion_percent} />
          <p className="font-medium">{data?.completion_percent}%</p>
        </div>

        <div className="space-y-2">
          {Object.keys(missingAreas).map((item: any, i: any) => (
            <div
              key={i}
              className="flex items-center justify-between opacity-80"
            >
              <p>
                Add{" "}
                <span className="font-medium">{missingAreas[item].label}</span>
              </p>{" "}
              <p>{missingAreas[item].progress}%</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default ProfileProgress;
