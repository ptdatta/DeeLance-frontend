import Typography from "components/Typography";
import UserDetailsBar from "components/UserDetailsBar";
import PageLayout from "layouts/PageLayout";

function MyWalletPage() {
  return (
    <PageLayout>
      <div className="container-wrapper">
        <Typography variant="2xl" className="mb-5 font-semibold">
          My Wallet
        </Typography>

        {/* <TabBar>
          {tabs.map((text, i) => (
            <TabButton
              key={i}
              active={tab === text}
              onClick={() => setTab(text)}
            >
              {text}
            </TabButton>
          ))}
        </TabBar> */}

        <main className="mt-7">
          <UserDetailsBar className="grid gap-5 space-y-0 lg:grid-cols-2" />

          {/* {tab === tabs[0] ? <Overview /> : null}

          {tab === tabs[1] ? <TotalNfts /> : null}

          {tab === tabs[2] ? <TxHistory /> : null} */}
        </main>
      </div>
    </PageLayout>
  );
}

export default MyWalletPage;
