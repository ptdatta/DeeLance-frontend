import Button from "components/Button";
import Typography from "components/Typography";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    // <PageLayout childrenWrapperClassName="p-0">
    <div className="container-wrapper pt-8 pb-20">
      <img
        src="/images/404-illustration.svg"
        className="max-w-[40rem] w-full mx-auto"
        alt=""
      />

      <div className="text-center mt-6 flex flex-col items-center">
        <Typography variant="3xl" className="font-medium mb-6">
          OPPS! PAGE NOT FOUND
        </Typography>

        <div className="flex items-center space-x-5">
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild variant="outlined">
            <a href="mailto:info@deelance.com">Report Problem</a>
          </Button>
        </div>
      </div>
    </div>
    // </PageLayout>
  );
}
