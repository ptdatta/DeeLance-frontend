import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-6 max-lg:pr-6">
        <Input
          placeholder="Filter by Email Address"
          value={
            (table.getColumn("emailAddress")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("emailAddress")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />

        <p className="text-sm">Total Users {table.getRowCount()}</p>

        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
