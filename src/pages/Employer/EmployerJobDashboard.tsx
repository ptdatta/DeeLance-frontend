import EmployerList from "components/EmployerCard/EmployerList";
import FilterBar from "components/FilterBar";
import SelectButton from "components/SelectButton";
import YourStepToNewCareer from "components/YourStepToNewCareer";
import HalfSplitGridLayout from "layouts/HalfSplitGridLayout";
import PageLayout from "layouts/PageLayout";
import { useTranslation } from "react-i18next";

function EmployerJobDashboard() {
  const { t } = useTranslation();

  return (
    <>
      <PageLayout>
        <div className="container-wrapper">
          <div className="mb-10">
            <YourStepToNewCareer />
          </div>
          <header className="flex items-center justify-between mb-6">
            <h1 className=" text-3xl font-[600] my-5">{t("Job Seeker")}</h1>

            <div className="flex items-center [&>*:not(:last-child)]:me-4">
              <SelectButton title={t("New")} />
              <SelectButton title={t("Time")} />
              <SelectButton title={t("Budget")} />
            </div>
          </header>

          <HalfSplitGridLayout>
            <FilterBar />
            <EmployerList />
          </HalfSplitGridLayout>
        </div>
      </PageLayout>
    </>
  );
}

export default EmployerJobDashboard;
