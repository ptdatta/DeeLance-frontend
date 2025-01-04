import EmployerList from "components/EmployerCard/EmployerList";
import WelcomeBanner from "components/WelcomeBanner";
import PageLayout from "layouts/PageLayout";
import HalfSplitGridLayout from "layouts/HalfSplitGridLayout";
import Coomingsoon from "components/Coomingsoon";
import SelectButton from "components/SelectButton";
import EmployerUserDetailsBar from "components/EmployerUserDetailsBar";
import { useState, useEffect } from "react";

function EmployerHome() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    // Auto trigger the popup after 3000 milliseconds (3 seconds)
    const popupTimer = setTimeout(() => {
      openPopup();
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(popupTimer);
  }, []);

  return (
    <PageLayout>
      <div className="container-wrapper">
        <div className="mb-10">
          <WelcomeBanner />
        </div>
        <header className="flex items-center justify-between mb-6">
          <h1 className=" text-3xl font-[600] my-5">Employer</h1>

          <div className="flex items-center space-x-4">
            <SelectButton title="New" />
            <SelectButton title="Time" />
            <SelectButton title="Budget" />
            <SelectButton title="Filter" HRef="/employer-filter-page" />
          </div>
        </header>

        <HalfSplitGridLayout>
          {/* <UserDetailsBar /> */}
          <EmployerUserDetailsBar />
          {/* <UserDetailsBar /> */}
          <EmployerList />
        </HalfSplitGridLayout>
      </div>
      <Coomingsoon isOpen={isPopupOpen} onClose={closePopup} />
    </PageLayout>
  );
}

export default EmployerHome;
