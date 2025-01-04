import Button from "components/Button";
import TabBar from "components/TabBar";
import TabButton from "components/TabButton";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";
import { useState } from "react";

const Card = () => {
  return (
    <div>
      <div>
        <Typography>Need a figma designer</Typography>
      </div>
      <div>
        <Typography>Posted Dec 19, 2021</Typography>
      </div>
      <div>
        <Button>
          {" "}
          <a href="/job-detail">View Proposal</a>
        </Button>
      </div>
    </div>
  );
};

const tabs = [
  { value: "All Proposals" },
  { value: "Active Proposals" },
  { value: "Expire Proposals" },
];

function MyProposalsPage() {
  const [tab, setTab] = useState(tabs[0].value);

  return (
    <PageLayout>
      <div className="container-wrapper">
        <Typography variant="2xl" className="mb-8 font-medium">
          My Proposals
        </Typography>

        <header className="mb-12">
          <TabBar>
            {tabs.map((item, i) => (
              <TabButton
                key={i}
                onClick={() => setTab(item.value)}
                active={tab === item.value}
                variant="simple"
                className="px-0"
              >
                {item.value}
              </TabButton>
            ))}
          </TabBar>
        </header>

        <div className="grid grid-cols-[1fr_1fr_auto] px-7 mb-4 items-center">
          <Typography>Title</Typography>
          <Typography>Date</Typography>
          <div>
            <Button className="opacity-0">Submit Proposal</Button>
          </div>
        </div>

        <div className="space-y-4 [&>*]:py-5 [&>*]:px-7 [&>*]:rounded-md [&>*]:bg-woodsmoke-200 dark:[&>*]:bg-woodsmoke-900 [&>*]:grid [&>*]:grid-cols-[1fr_1fr_auto] [&>*]:items-center">
          {tab === tabs[0].value ? (
            <>
              <Card />
              <Card />
              <Card />
              <Card />
            </>
          ) : null}
          {tab === tabs[1].value ? (
            <>
              <Card />
              <Card />
            </>
          ) : null}
          {tab === tabs[2].value ? (
            <>
              <Card />
            </>
          ) : null}
        </div>
      </div>
    </PageLayout>
  );
}

export default MyProposalsPage;
