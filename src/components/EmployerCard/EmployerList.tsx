import EmployerCard from "./EmployerCard";
import PerPageItemsSelector from "components/PerPageItemsSelector";
import StaticPagination from "components/StaticPagination";

function EmployerList() {
  return (
    <div>
      <main className="gap-8 mb-10 grid grid-cols-[repeat(auto-fit,minmax(390px,1fr))] items-center justify-between">
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
        <EmployerCard />
      </main>

      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-1">
          <Typography>Show</Typography>
          <SelectBox
            wrapperClassName="max-w-[4.4rem] w-full"
            className="rounded-md px-4 py-1"
            options={[
              { value: 5 },
              { value: 10 },
              { value: 15 },
              { value: 15 },
              { value: 20 },
            ]}
          />
          <Typography>entries</Typography>
          <Typography></Typography>
          <Typography variant="sm">1 to 10 of 430 entries</Typography>
        </div>

        <Pagination />
      </div> */}

      <div className="flex items-center justify-between">
        <PerPageItemsSelector />
        <StaticPagination />
        {/* <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
}

export default EmployerList;
