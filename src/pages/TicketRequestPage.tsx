import Button from "components/Button";
import Input from "components/Input";
import Paper from "components/Paper";
import Textarea from "components/Textarea";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";

function TicketRequestPage() {
  return (
    <PageLayout>
      <div className="container-wrapper">
        <header className="flex items-center justify-between mb-8">
          <Typography variant="2xl" className="font-semibold">
            My Ticket
          </Typography>
        </header>

        <main className="grid grid-cols-2 gap-16 items-center">
          <aside>
            <img
              src="/images/ticket-request-img.png"
              className="w-full"
              alt=""
            />
          </aside>

          <Paper size={10}>
            <Typography variant="xl" className="text-center mb-6 lh-1">
              Create New Request
            </Typography>

            <div className="space-y-4">
              <Input
                label="Name:"
                placeholder="Enter your name"
                className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
              />
              <Input
                label="Subject:"
                placeholder="Enter subject"
                className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
              />
              <Textarea
                label="Message:"
                placeholder="Enter subject"
                className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
              />

              <Button className="w-full">Submit</Button>
            </div>
          </Paper>
        </main>
      </div>
    </PageLayout>
  );
}

export default TicketRequestPage;
