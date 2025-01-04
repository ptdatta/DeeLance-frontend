import TabBar from "components/TabBar";
import TabButton from "components/TabButton";
import { useState } from "react";
import Details from "sections/OrderPage/Details";
import Message from "sections/OrderPage/Message";
import Overview from "sections/OrderPage/Overview";

const tabs = ["Overview", "Messages", "Details"];

function OrderPage() {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <div className="container-wrapper">
      <TabBar>
        {tabs.map((text, i) => (
          <TabButton key={i} active={text === tab} onClick={() => setTab(text)}>
            {text}
          </TabButton>
        ))}
      </TabBar>

      <div className="mt-7">
        {tab === tabs[0] ? <Overview /> : null}

        {tab === tabs[1] ? <Message /> : null}

        {tab === tabs[2] ? <Details /> : null}
      </div>
    </div>
  );
}

export default OrderPage;
