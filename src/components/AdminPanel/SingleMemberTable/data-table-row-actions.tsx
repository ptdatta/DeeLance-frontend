/* eslint-disable @typescript-eslint/no-unused-vars */
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const axiosPrivate = useAxiosPrivate();
  // const { refetch: refetchAllUsers } = useQuery({
  //   queryKey: ["admin-all-users"],
  //   enabled: false,
  // });
  // const { mutate: deleteUser } = useMutation({
  //   mutationFn: async ({ userId }: { userId: string }) => {
  //     await axiosPrivate.post("/admin/delete-user", { userId });
  //     await refetchAllUsers();
  //   },
  //   onError: (error) => {
  //     if (error instanceof AxiosError) {
  //       if (error.response?.data?.msg) {
  //         alert(error.response?.data?.msg);
  //       }
  //     }
  //   },
  // });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild className="text-sm">
            <Link target="_blank" to={`/task-preview/${row.getValue("_id")}`}>
              <span>Visit</span>{" "}
              <FaExternalLinkAlt className="ml-auto w-3 opacity-80" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm text-red-400 data-[highlighted]:bg-red-400">
            Pause Gig
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
