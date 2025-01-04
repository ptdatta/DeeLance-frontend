import Button from "components/Button";
import Paper from "components/Paper";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";
import Message from "sections/OrderPage/Message";

function TicketPage() {
  return (
    <PageLayout>
      <div className="container-wrapper">
        <header className="flex items-center justify-between mb-8">
          <Typography variant="2xl" className="font-semibold">
            My Ticket
          </Typography>

          <Button size="sm">Create New Ticket</Button>
        </header>

        <main className="grid grid-cols-[400px_1fr] gap-8">
          <Paper>
            <Typography variant="xl" className="mb-4">
              Orignal Request
            </Typography>

            <Typography
              variant="sm"
              className="mb-2 text-black/60 dark:text-white/60"
            >
              Ticket # 2021-3565
            </Typography>

            <Typography
              variant="sm"
              className="mb-6 text-black/60 dark:text-white/60"
            >
              Ac sit etiam velit, consequat est augue commodo non.
            </Typography>

            <Typography className="opacity-60 mb-3" variant="xs">
              Date: 12/02/2020
            </Typography>

            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates sed, praesentium voluptas, nostrum quo corporis at
              beatae saepe optio totam quisquam? Architecto dolore reiciendis
              maiores adipisci nobis voluptate amet perferendis?
            </Typography>
          </Paper>

          <Message className="rounded-lg" />
        </main>
      </div>
    </PageLayout>
  );
}

export default TicketPage;
