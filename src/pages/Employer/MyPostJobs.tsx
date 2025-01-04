import Button from "components/Button";
import TabBar from "components/TabBar";
import TabButton from "components/TabButton";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";
import Table from "components/Table";
import { useState } from "react";

const tr = [
  <Typography key="item" variant="base">
    #FO716DE452B48
  </Typography>,
  <Typography key="item" variant="base">
    Setup and customize wordpress...
  </Typography>,
  <Typography key="item" variant="base">
    01
  </Typography>,
  <Typography key="item" variant="base">
    5 Days
  </Typography>,
  <Typography key="item" variant="base">
    $100
  </Typography>,
  <Button key="item" className="w-full">
    View Order
  </Button>,
];

const tabs = ["Active Posted Jobs", "Closed Posted Jobs"];

function MyPostJobs() {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <PageLayout>
      <div className="">
        <div className="container-wrapper">
          <div className="flex justify-between ">
            <Typography>My Posted Jobs</Typography>

            <Button>Create new job</Button>
          </div>

          <Typography variant="2xl" className="font-semibold mb-6">
            My Orders
          </Typography>

          <TabBar>
            {tabs.map((text, i) => (
              <TabButton
                key={i}
                active={text === tab}
                onClick={() => setTab(text)}
              >
                {text}
              </TabButton>
            ))}
          </TabBar>

          <div className="mt-8">
            <Table
              headings={[
                "Order Number",
                "Item",
                "Quantity",
                "Duration",
                "Amount",
                "",
              ]}
              tableItems={new Array(2 * (tabs.indexOf(tab) + 1))
                .fill("")
                .map(() => tr)}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default MyPostJobs;
