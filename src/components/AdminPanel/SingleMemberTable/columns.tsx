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
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="block w-[44px] truncate">{row.getValue("_id")}</span>
        <CopyToClipboardButton
          text={row.getValue("_id")}
          className="w-[16px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gig Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 justify-between w-fit">
          <span className="w-[160px] truncate font-medium">
            {row.getValue("title")}
          </span>
          <CopyToClipboardButton
            text={row.getValue("title")}
            className="w-[16px]"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gig Price" />
    ),
    cell: ({ row }) => {
      return <div>{numeral(row.getValue("price")).format("$0,0.00")} USD</div>;
    },
  },
  {
    accessorKey: "deliveryDays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Days" />
    ),
    cell: ({ row }) => {
      return <p className="text-profit">{row.getValue("deliveryDays")} days</p>;
    },
  },
  {
    accessorKey: "isPublish",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Published" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-profit">
          {row.getValue("isPublish") ? "true" : "false"}
        </p>
      );
    },
  },
  {
    accessorKey: "orders",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orders" />
    ),
    cell: () => {
      return <div>0</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
