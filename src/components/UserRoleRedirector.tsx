import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

interface Props {
  freelancerRedirect?: string;
  clientRedirect?: string;
}

function UserRoleRedirector({ freelancerRedirect, clientRedirect }: Props) {
  const { data: user } = useQuery<any>({ queryKey: ["user"], enabled: false });

  if (user?.Mode === "FREELANCER") {
    return (
      <Navigate replace to={freelancerRedirect || `/profile/${user._id}`} />
    );
  }

  if (user?.Mode === "CLIENT") {
    return <Navigate replace to={clientRedirect || `/dashboard`} />;
  }
}

export default UserRoleRedirector;
