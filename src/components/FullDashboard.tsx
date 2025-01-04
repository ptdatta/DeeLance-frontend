import { Outlet } from "react-router-dom";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "Providers/AuthContextProvider";
import { queryKeys } from "utils";
import { streamClient } from "services/streamService";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";

function FullDashboard() {
  const axiosPrivate = useAxiosPrivate();
  const { isToken, token } = useContext(AuthContext);
  const { toast } = useToast();

  const {
    data: user,
    isLoading,
    isRefetching,
    isFetching,
    isFetched,
  } = useQuery({
    keepPreviousData: true,
    queryKey: ["user"],
    enabled: isToken,
    queryFn: async () => {
      const res = await axiosPrivate("/user");
      return res.data.data;
    },
  });

  const {
    isLoading: isStreamUserConnecting,
    isFetched: isStreamUserConnected,
  } = useQuery({
    queryKey: [queryKeys.messaging.streamUserKey],
    enabled: !!(user?._id && isFetched),
    staleTime: Infinity,
    queryFn: async () => {
      await streamClient.connectUser(
        {
          id: user?._id,
          name: `${user?.UserName}`,
          image: user?.avatar,
        },
        token
      );

      return true;
    },
    onError: () => {
      toast({
        title: "Stream Connection Failed",
        description: "Unexpected error occured while connecting to Stream Chat",
        variant: "destructive",
      });
    },
  });

  if (
    isLoading &&
    isToken === true &&
    isStreamUserConnecting === true &&
    isStreamUserConnected === false
  ) {
    return (
      <Loader.LoaderFullScreenWrapper className="bg-gray-200">
        <img
          src="/images/logo-dark.svg"
          className="h-12 block relative bottom-2"
          alt=""
        />
        <div className="pt-2 max-w-[20rem] w-full">
          <Loader.BarLoader />
        </div>
      </Loader.LoaderFullScreenWrapper>
    );
  }

  return (
    <>
      {isRefetching || isFetching ? (
        <Loader.BarLoader className="fixed top-0 left-0 w-full h-1 border-none shadow-none z-[1000000]" />
      ) : null}

      <Outlet />
    </>
  );
}

export default FullDashboard;
