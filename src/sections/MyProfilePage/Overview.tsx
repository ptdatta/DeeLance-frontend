import Certifications from "components/Certifications";
import Experience from "components/Experience";
import ProfileDetails from "components/ProfileDetails";
import UserProfileSkills from "components/UserProfileSkills";
import Educations from "components/Educations";

function Overview() {
  return (
    <div className="space-y-6">
      <ProfileDetails />
      <UserProfileSkills />
      <Experience />
      <Certifications />
      <Educations />
    </div>
  );
}

export default Overview;
