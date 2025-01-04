import Avatar from "components/Avatar";
import Button from "components/Button";
import Paper from "components/Paper";
import Pill from "components/Pill";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";
import { BsThreeDots } from "react-icons/bs";

const statusVariants = {
  0: { title: "Pending", className: "bg-white/20" },
  1: { title: "In Progress", className: "bg-green-haze-600" },
  2: { title: "Completed", className: "bg-woodsmoke-950" },
};

interface TicketCardType {
  status: keyof typeof statusVariants;
}
const TicketCard = ({ status = 0 }: TicketCardType) => {
  return (
    <Paper>
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-6">
          <Typography variant="xs" className="font-medium">
            Ticket # 2021-3565
          </Typography>

          <Pill className={statusVariants[status].className}>
            {statusVariants[status].title}
          </Pill>
        </div>

        <div className="flex items-center space-x-6">
          <Typography variant="sm" className="text-black/60 dark:text-white/60">
            4 seconds ago
          </Typography>

          <Button variant="simple" className="px-0 h-auto">
            <BsThreeDots className="text-[1.5em]" />
          </Button>
        </div>
      </header>

      <main>
        <Typography className="font-medium mb-2">
          Ac sit etiam velit, consequat est augue commodo non.
        </Typography>

        <Typography className="text-black/60 dark:text-white/60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit
          pulvinar sit cras consectetur aenean sem mauris ipsum. Convallis
          molestie faucibus suspendisse praesent felis neque, sed et. Quis
          maecenas quisque phasellus massa, neque, volutpat. Ullamcorper a
          accumsan elit vel velit.
        </Typography>
      </main>

      <footer className="mt-6 flex items-center space-x-8">
        <div className="text-[90%]">
          <Avatar size={38} title="David Smith" />
        </div>

        <Typography className="opacity-60" variant="xs">
          Date: 12/02/2020
        </Typography>

        <Typography className="opacity-60" variant="xs">
          Last reply: 2 days ago
        </Typography>
      </footer>
    </Paper>
  );
};

const CustomerSupportPage = () => {
  return (
    <PageLayout>
      <div className="container-wrapper">
        <header className="flex items-center justify-between mb-6">
          <Typography variant="2xl" className="font-semibold">
            My Ticket
          </Typography>

          <Button size="sm">Create New Ticket</Button>
        </header>

        <div className="space-y-5">
          <TicketCard status={1} />
          <TicketCard status={0} />
          <TicketCard status={2} />
        </div>
      </div>
    </PageLayout>
  );
};

export default CustomerSupportPage;
