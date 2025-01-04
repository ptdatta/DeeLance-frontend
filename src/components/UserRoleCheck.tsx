import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  roleCheck: "FREELANCER" | "CLIENT";
}

function UserRoleCheck({ roleCheck, children }: Props) {
  const { data: user } = useQuery<any>({ queryKey: ["user"], enabled: false });

  if (user.Mode === roleCheck) {
    return children;
  }
}

export default UserRoleCheck;
