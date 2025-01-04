import PageLayout from "layouts/PageLayout";
import YourStepToNewCareer from "components/YourStepToNewCareer";
import HalfSplitGridLayout from "layouts/HalfSplitGridLayout";
import EmployerProfileDetails from "components/EmployerCard/EmployerProfileDetails";
import UserDetailsBar from "components/UserDetailsBar";

function EmployerProfile() {
  return (
    <>
      <PageLayout>
        <div className="container-wrapper">
          <div className="mb-10">
            <YourStepToNewCareer />
          </div>
          <HalfSplitGridLayout>
            {/* <EmployerUserDetailsBar /> */}
            <UserDetailsBar />
            <EmployerProfileDetails />
          </HalfSplitGridLayout>
        </div>
      </PageLayout>
    </>
  );
}

export default EmployerProfile;
