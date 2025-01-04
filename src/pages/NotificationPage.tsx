import Avatar from "components/Avatar";
import Button from "components/Button";
import Paper from "components/Paper";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";

const Card = () => {
  return (
    <Paper>
      <div className="mb-3 flex items-center space-x-4">
        <div className="flex-shrink-0 relative w-fit">
          <div className="w-5 h-5 absolute top-0 right-0 bg-green-haze-600 rounded-full flex items-center justify-center text-sm">
            2
          </div>
          <Avatar size={60} />
        </div>

        <div>
          <Typography variant="lg" className="font-medium lh-1">
            SALE IS LIVE
          </Typography>

          <Typography
            variant="xs"
            className="text-black/60 dark:text-white/60 mt-2 lh-1"
          >
            Today at 9:42 AM
          </Typography>
        </div>
      </div>

      <div className="flex-1">
        <Typography className="text-black/60 dark:text-white/60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure atque
          autem beatae illum voluptate dignissimos est neque. Sint, aliquam illo
          nulla perspiciatis iste inventore? Odio doloremque id doloribus porro
          nulla!
        </Typography>
      </div>
    </Paper>
  );
};

function NotificationPage() {
  return (
    <PageLayout>
      <div className="container-wrapper">
        <header className="flex item justify-between mb-6">
          <Typography variant="2xl" className="font-semibold">
            Notifications
          </Typography>

          <Button size="sm">Mark all as read</Button>
        </header>

        <main className="space-y-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </main>
      </div>
    </PageLayout>
  );
}

export default NotificationPage;
