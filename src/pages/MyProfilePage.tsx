import UserDetailsBar from "components/UserDetailsBar";
import HalfSplitGridLayout from "layouts/HalfSplitGridLayout";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import MediaQueryWrapper from "components/MediaQueryWrapper";
import ProfileHeader from "components/ProfileHeader";
import Paper from "components/Paper";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "components/ui/skeleton";
import axios from "api/axios";
import { AxiosError } from "axios";
import Button from "components/Button";

function ProfileNavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      end
      to={to}
      className={({ isActive }) =>
        twMerge(
          "px-4 py-3 border-y-4 border-b-transparent border-t-transparent",
          isActive ? "border-b-green-500" : null
        )
      }
    >
      {children}
    </NavLink>
  );
}

function MyProfilePage() {
  const { userId } = useParams();
  const {
    isLoading: isLoadingProfile,
    isFetched,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["profile", userId],
    cacheTime: 0,
    queryFn: async () => {
      const res = await axios.get(`/get-profile/${userId}`);
      const user = res.data.user;
      const locationRes = await axios.get("https://ipapi.co/json/");
      const locationData = locationRes.data;
      const location = `${locationData.city}, ${locationData.country_name}`;
      user.location = location;
      console.log("res", res);
      return user;
    },
  });

  if (isLoadingProfile && isFetched === false) {
    return (
      <div className="container-wrapper animate-in fade-in duration-300">
        <header className="flex items-center justify-between mb-6">
          <main className="flex items-center space-x-4 flex-1 max-w-[30rem]">
            <Skeleton className="w-36 h-36 rounded-full flex-shrink-0" />
            <div className="space-y-3 w-full">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-[90%] rounded-full" />
              <Skeleton className="h-4 w-[80%] rounded-full" />
            </div>
          </main>

          <aside className="flex-1 max-w-[16rem] flex space-x-6">
            <div className="space-y-2 w-full flex flex-col items-end">
              <Skeleton className="h-3 w-full rounded-full" />
              <Skeleton className="h-3 w-full rounded-full" />
            </div>

            <Skeleton className="w-2 rounded-full" />

            <Skeleton className="w-full" />
          </aside>
        </header>

        <HalfSplitGridLayout reverse>
          <main className="space-y-6">
            <Skeleton className="h-14 w-[100%]" />

            {new Array(3).fill("").map((_, i) => (
              <Paper key={i} className="space-y-3">
                <Skeleton className="h-3 w-[100%] rounded-full" />
                <Skeleton className="h-3 w-[100%] rounded-full" />
                <Skeleton className="h-3 w-[100%] rounded-full" />
                <Skeleton className="h-3 w-[100%] rounded-full" />
                <Skeleton className="h-3 w-[100%] rounded-full" />
                <Skeleton className="h-3 w-[100%] rounded-full" />
              </Paper>
            ))}
          </main>

          <aside className="space-y-5">
            {new Array(5).fill("").map((_, i) => (
              <Paper key={i} className="space-y-3">
                <Skeleton className="h-2 w-[100%] rounded-full" />
                <Skeleton className="h-2 w-[90%] rounded-full" />
                <Skeleton className="h-2 w-[80%] rounded-full" />
                <Skeleton className="h-2 w-[70%] rounded-full" />
                <Skeleton className="h-2 w-[60%] rounded-full" />
              </Paper>
            ))}
          </aside>
        </HalfSplitGridLayout>
      </div>
    );
  }

  if (
    (error instanceof AxiosError &&
      (error.response?.data?.error as string).match(/not found/i)) ||
    isError
  ) {
    return (
      <div className="container-wrapper animate-in fade-in duration-300">
        <p className="text-center text-lg mb-4">Profile not found</p>
        <Button asChild className="w-fit mx-auto">
          <Link to="/">Home</Link>
        </Button>
      </div>
    );
  }

  if (isSuccess)
    return (
      <div className="container-wrapper animate-in fade-in duration-300">
        <header className="mb-10">
          <ProfileHeader />{" "}
        </header>

        <HalfSplitGridLayout reverse>
          <main>
            <Paper className="p-0 mb-6 flex px-4">
              <ProfileNavLink to="">Overview</ProfileNavLink>
              <ProfileNavLink to="tasks">Tasks</ProfileNavLink>
              <ProfileNavLink to="saved-tasks">Saved Gigs</ProfileNavLink>
            </Paper>

            <Outlet />
          </main>

          <MediaQueryWrapper breakpoint="xl" up={false} inverse>
            <UserDetailsBar />
          </MediaQueryWrapper>
        </HalfSplitGridLayout>
      </div>
    );
}

export default MyProfilePage;
