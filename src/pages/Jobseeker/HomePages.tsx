import JobList from "components/JOb/JobList";
import UserDetailsBarJob from "components/JOb/UserDetailsJobBar";

import WelcomeBanner from "components/WelcomeBanner";
import HalfSplitGridLayout from "layouts/HalfSplitGridLayout";
import PageLayout from "layouts/PageLayout";

function HomePages() {
  return (
    <PageLayout>
      <div className="container-wrapper">
        <div className="mb-10">
          <WelcomeBanner />
        </div>

        <HalfSplitGridLayout>
          <UserDetailsBarJob />
          <JobList />
        </HalfSplitGridLayout>
      </div>
    </PageLayout>
  );
}

export default HomePages;
