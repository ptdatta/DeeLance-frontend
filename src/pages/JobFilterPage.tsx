import { useQueryClient } from "@tanstack/react-query";
import FilterBar from "components/FilterBar";
import JobList from "components/JOb/JobList";
import YourStepToNewCareer from "components/YourStepToNewCareer";
import HalfSplitGridLayout from "layouts/HalfSplitGridLayout";
import PageLayout from "layouts/PageLayout";
import Tasks from "sections/MyProfilePage/overview/Tasks";

function JobFilterPage() {
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);

  return (
    <PageLayout>
      <div className="container-wrapper">
        <div className="mb-10">
          <YourStepToNewCareer />
        </div>

        <HalfSplitGridLayout>
          <FilterBar />

          {/* <JobList /> */}
          {user?.kind === 0 ? (
            <div>
              <Tasks />
            </div>
          ) : null}

          {user?.kind === 1 ? <JobList /> : null}
        </HalfSplitGridLayout>
      </div>
    </PageLayout>
  );
}

export default JobFilterPage;
