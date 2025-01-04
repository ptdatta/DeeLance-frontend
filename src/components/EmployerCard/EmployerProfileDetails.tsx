import ReviewClients from "./ReviewClients";
import Pagination from "components/Pagination";
import Typography from "components/Typography";

function EmployerProfileDetails() {
  return (
    <>
      <section>
        <div className="bg-white dark:bg-woodsmoke-900 p-8 rounded-md shadow-lg mb-12">
          <Typography
            variant="lg"
            className="text-black dark:text-white font-semibold mb-3"
          >
            About
          </Typography>
          <Typography className="text-black/80 dark:text-white/80">
            Lorem ipsum is a placeholder text commonly used to demonstrate the
            visual form of a document or a typeface without relying on
            meaningful content. Lorem ipsum may be used as a placeholder before
            final copy is available.Lorem ipsum is a placeholder text commonly
            used to demonstrate the visual form of a document or a typeface
            without relying on meaningful content. Lorem ipsum may be used as a
            placeholder before final copy is available.Lorem ipsum is a
            placeholder text commonly used to demonstrate the visual form of a
            document or a typeface without relying on meaningful content. Lorem
            ipsum may be used as a placeholder before final copy is available.
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.Lorem ipsum is
            a placeholder text commonly used to demonstrate the visual form of a
            document or a typeface without relying on meaningful content.
          </Typography>
          <a href="/" className=" underline py-2 ">
            more
          </a>
        </div>

        <ReviewClients />

        <Pagination />
      </section>
    </>
  );
}

export default EmployerProfileDetails;
