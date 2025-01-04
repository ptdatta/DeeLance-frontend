import { DataTable } from "@/components/AdminPanel/SingleMemberTable/DataTable";
import { columns } from "@/components/AdminPanel/SingleMemberTable/columns";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function AdminSingleMemberPage() {
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axiosPrivate.post("/admin/get-user-details", {
        userId,
      });
      return response.data?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container-wrapper pt-7 pb-20 space-y-4">
        {new Array(20).fill("").map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="container-wrapper py-10">
      <DataTable data={data.tasks} columns={columns} />
    </div>
  );
}

export default AdminSingleMemberPage;
