import Accordion from "components/Accordion";
import Button from "components/Button";
import Paper from "components/Paper";
import SupportContact from "components/SupportContact";
import Timer from "components/Timer";
import TrackOrderTimelineCard from "components/TrackOrderTimelineCard";
import Typography from "components/Typography";

const KeyValue = ({ title, value }: any) => {
  return (
    <div className="flex items-center justify-between">
      <Typography className="text-black/60 dark:text-white/60">
        {title}
      </Typography>
      <Typography className="text-right">{value}</Typography>
    </div>
  );
};

function Overview() {
  return (
    <main className="grid grid-cols-[1fr_400px] gap-8">
      <div className="space-y-5">
        <Paper>
          <Typography variant="xl" className="mb-3">
            Order Started
          </Typography>

          <Typography className="text-black/60 dark:text-white/60">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
            magnam assumenda minima ipsa, laboriosam in nobis porro voluptatibus
            illo dolore pariatur quidem quae minus veritatis suscipit sequi
            doloremque quis nemo?
          </Typography>
        </Paper>

        <Accordion
          title="Timesheet"
          buttonClassName="px-7"
          childrenWrapperClassName="px-7"
        >
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            obcaecati ullam quibusdam at ab consequatur assumenda fugiat, sed
            rem quaerat aspernatur nihil natus modi dolores voluptate mollitia
            non eum odio.
          </Typography>
        </Accordion>

        <Accordion
          title="Metaverse"
          buttonClassName="px-7"
          childrenWrapperClassName="px-7"
        >
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            obcaecati ullam quibusdam at ab consequatur assumenda fugiat, sed
            rem quaerat aspernatur nihil natus modi dolores voluptate mollitia
            non eum odio.
          </Typography>
        </Accordion>

        <Accordion
          title="Message"
          buttonClassName="px-7"
          childrenWrapperClassName="px-7"
        >
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            obcaecati ullam quibusdam at ab consequatur assumenda fugiat, sed
            rem quaerat aspernatur nihil natus modi dolores voluptate mollitia
            non eum odio.
          </Typography>
        </Accordion>

        <Accordion
          title="Details"
          buttonClassName="px-7"
          childrenWrapperClassName="px-7"
        >
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            obcaecati ullam quibusdam at ab consequatur assumenda fugiat, sed
            rem quaerat aspernatur nihil natus modi dolores voluptate mollitia
            non eum odio.
          </Typography>
        </Accordion>
      </div>

      <aside className="space-y-5">
        <Paper>
          <Typography variant="lg" className="mb-5">
            Time left to deliver
          </Typography>

          <div className="mb-5">
            <Timer />
          </div>

          <div className="space-y-4">
            <Button className="w-full">Deliver Order</Button>
            <Button variant="outlined" className="w-full">
              Extend delivery date
            </Button>

            <Typography>
              <span className="inline-block align-middle">
                Your Delivery is accepted
              </span>
            </Typography>
          </div>
        </Paper>

        <Paper>
          <Typography variant="lg" className="mb-3 font-medium">
            NFT
          </Typography>

          <Typography className="text-black/60 dark:text-white/60 mb-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
            saepe temporibus natus at quos consequuntur deserunt a quibusdam ab
            ipsa repudiandae libero.
          </Typography>

          <Button className="w-full">Deliver NFT</Button>
        </Paper>

        <Paper>
          <Typography variant="lg" className="mb-3 font-medium">
            Order Details
          </Typography>

          <img
            src="/images/ui-ux-design.png"
            className="w-full aspect-[1/.6] rounded-md mb-5"
            alt=""
          />

          <div className="space-y-3">
            <KeyValue title="Ordered by" value="Maxwell" />
            <KeyValue title="Delivery date" value="Dec 20, 4:02 PM" />
            <KeyValue title="Total price" value="$100" />
            <KeyValue title="Order number" value="#FO716DE452B48" />
          </div>
        </Paper>

        <Paper>
          <Typography variant="lg" className="mb-5 font-medium">
            Track Order
          </Typography>

          <div className="[&>*:not(:last-child)]:pb-4">
            <TrackOrderTimelineCard
              title="Requirements submitted"
              active={false}
            />
            <TrackOrderTimelineCard title="Order in progress" active />
          </div>
        </Paper>

        <SupportContact />
      </aside>
    </main>
  );
}

export default Overview;
