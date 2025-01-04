import Button from "components/Button";
import Table from "components/Table";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";

function SavedJobPage() {
  return (
    <PageLayout>
      <div className="container-wrapper">
        <Typography variant="2xl" className="font-semibold mb-5">
          Saved Jobs
        </Typography>

        <Table
          headings={["Title", "Date", "Category", "", "Amount", ""]}
          tableItems={[
            [
              <Typography key="1">Need Fullstack senior developer</Typography>,
              <Typography key="1">December 7, 2022</Typography>,
              <Typography key="1">Software Developer</Typography>,
              <Typography key="1">40</Typography>,
              <Typography key="1">$200</Typography>,
              <Button key="12" className="w-full">
                View Job
              </Button>,
            ],
            [
              <Typography key="1">Need Fullstack senior developer</Typography>,
              <Typography key="1">December 7, 2022</Typography>,
              <Typography key="1">Software Developer</Typography>,
              <Typography key="1">40</Typography>,
              <Typography key="1">$200</Typography>,
              <Button key="12" className="w-full">
                View Job
              </Button>,
            ],
            [
              <Typography key="1">Need Fullstack senior developer</Typography>,
              <Typography key="1">December 7, 2022</Typography>,
              <Typography key="1">Software Developer</Typography>,
              <Typography key="1">40</Typography>,
              <Typography key="1">$200</Typography>,
              <Button key="12" className="w-full">
                View Job
              </Button>,
            ],
            [
              <Typography key="1">Need Fullstack senior developer</Typography>,
              <Typography key="1">December 7, 2022</Typography>,
              <Typography key="1">Software Developer</Typography>,
              <Typography key="1">40</Typography>,
              <Typography key="1">$200</Typography>,
              <Button key="12" className="w-full">
                View Job
              </Button>,
            ],
            [
              <Typography key="1">Need Fullstack senior developer</Typography>,
              <Typography key="1">December 7, 2022</Typography>,
              <Typography key="1">Software Developer</Typography>,
              <Typography key="1">40</Typography>,
              <Typography key="1">$200</Typography>,
              <Button key="12" className="w-full">
                View Job
              </Button>,
            ],
          ]}
        />
      </div>
    </PageLayout>
  );
}

export default SavedJobPage;
