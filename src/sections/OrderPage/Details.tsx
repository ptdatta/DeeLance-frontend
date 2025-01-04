import Button from "components/Button";
import Paper from "components/Paper";
import SupportContact from "components/SupportContact";
import Table from "components/Table";
import Typography from "components/Typography";

function Details() {
  return (
    <div className="grid grid-cols-6 gap-6">
      <Paper className="col-span-6">
        <div className="flex items-start justify-between space-x-4 mb-6">
          <div className="grid grid-cols-[auto_auto] items-center gap-y-4 gap-x-8">
            <Typography className="opacity-60">Order Number:</Typography>
            <Typography>#FO716DE452B48</Typography>
            <Typography className="opacity-60">Buyer:</Typography>
            <Typography>Maxwell</Typography>
            <Typography className="opacity-60">Task:</Typography>
            <Typography>I will create your website pages in Figma</Typography>
          </div>

          <aside>
            <Typography variant="3xl" className="font-semibold text-right mb-3">
              $100
            </Typography>

            <Typography className="text-white/60 text-right">
              Date Order: <span className="text-white">10 Dec, 2022</span>
            </Typography>
          </aside>
        </div>

        <Typography className="text-white/60">
          Lorem ipsum dolor sit amet consectetur. Ultrices curabitur lobortis
          pharetra id nisi. Eu justo justo econsequat nisl. Turpis ipsum
          consectetur elit tempus. Lorem ipsum dolor sit amet consectetur.
          Ultrices curabitur lobortis pharetra id nisi. Eu justo justo
          econsequat nisl. Turpis ipsum consectetur elit tempus.
        </Typography>
      </Paper>

      <div className="col-span-4 bg-woodsmoke-900 rounded-md overflow-hidden">
        <Table
          className="rounded-none"
          headings={["Item", "Quantity", "Duration", "Price"]}
          tableItems={[
            [
              <Typography key="1">Setup and customize wordpress</Typography>,
              <Typography key="2">5 Days</Typography>,
              <Typography key="3">Milestone 1</Typography>,
              <Typography key="4">$100</Typography>,
            ],
            [
              <Typography key="1">Setup and customize wordpress</Typography>,
              <Typography key="2">5 Days</Typography>,
              <Typography key="3">Milestone 1</Typography>,
              <Typography key="4">$100</Typography>,
            ],
          ]}
        />
      </div>

      <SupportContact className="col-span-2" />

      <Paper className="col-span-3">
        <Typography variant="lg" className="font-semibold mb-3">
          Client’s Feedback
        </Typography>

        <Typography variant="sm" className="text-white/60">
          No Feedback Received.
        </Typography>
      </Paper>

      <Paper className="col-span-3">
        <Typography variant="lg" className="font-semibold mb-3">
          Your Feedback to Client
        </Typography>

        <Typography variant="sm" className="text-white/60">
          No Feedback send.
        </Typography>
      </Paper>

      <div className="col-span-3" />

      <Button variant="error-outlined">Cancel Order</Button>
      <Button className="col-span-2" variant="contained">
        Deliver Order
      </Button>
    </div>
  );
}

export default Details;
