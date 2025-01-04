import { ColumnDef } from "@tanstack/react-table";
import numeral from "numeral";
import { Task } from "@/lib";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="block w-[44px] truncate">{row.getValue("id")}</span>
        <CopyToClipboardButton text={row.getValue("id")} className="w-[16px]" />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 justify-between w-fit">
          <span className="w-[160px] truncate font-medium">
            {row.getValue("emailAddress")}
          </span>
          <CopyToClipboardButton
            text={row.getValue("emailAddress")}
            className="w-[16px]"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "currentBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Balance" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {numeral(row.getValue("currentBalance")).format("$0,0.00")} USD
        </div>
      );
    },
  },
  {
    accessorKey: "totalWinning",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Money Earned" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-profit">
          {numeral(row.getValue("totalWinning")).format("$0,0.00") || 0} USDT
        </p>
      );
    },
  },
  {
    accessorKey: "totalLoss",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Money in proccess" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-loss">
          {numeral(row.getValue("totalLoss")).format("$0,0.00") || 0} USDT
        </p>
      );
    },
  },
  {
    accessorKey: "totalWithdrawal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Withdrawal" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("totalWithdrawal")} USDT</div>;
    },
  },
  {
    accessorKey: "accountType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Type" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p className="capitalize">
            {String(row.getValue("accountType")).toLowerCase()}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <p className="capitalize">{row.getValue("role")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("username")}</div>;
    },
  },

  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
