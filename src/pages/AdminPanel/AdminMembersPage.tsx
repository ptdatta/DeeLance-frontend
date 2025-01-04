import { DataTable } from "@/components/AdminPanel/MembersTable/DataTable";
import { columns } from "@/components/AdminPanel/MembersTable/columns";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

function AdminMembersPage() {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-all-users"],

    select(_data) {
      return _data.map((item: any) => {
        return {
          id: item._id,
          emailAddress: item?.email,
          currentBalance: item?.balance,
          totalWinning: item?.totalWinning,
          totalLoss: item?.totalLoss,
          totalWithdrawal: 0.2,
          username: item?.username,
          accountType: item?.accountType,
          role: item?.role,
          title:
            "You can't compress the program without quantifying the open-source SSD pixel!",
          status: "in progress",
          label: "documentation",
          priority: "medium",
        };
      });
    },
    queryFn: async () => {
      const dataRes = await axiosPrivate.get("/admin/all-users");
      return dataRes.data?.data;
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
    <div className="container-wrapper pt-7 pb-20">
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default AdminMembersPage;
