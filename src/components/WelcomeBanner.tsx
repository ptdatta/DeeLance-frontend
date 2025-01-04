import Button from "components/Button";
import SearchBox from "components/SearchBox";
import Typography from "components/Typography";
import { Link } from "react-router-dom";
import MediaQueryWrapper from "./MediaQueryWrapper";
import AuthGuard from "./AuthGuard";

function WelcomeBanner() {
  return (
    <div className="bg-white dark:bg-woodsmoke-900 p-8 rounded-xl relative z-10 shadow-lg">
      <header className="mb-7">
        <Typography variant="2xl" className="mb-3 font-medium">
          {"Congratulations! You are now part of Deelance!"}
        </Typography>
        <Typography
          variant="base"
          className="text-green-haze-500 font-bold mb-2"
        >
          {"Tips to get Started:"}
        </Typography>

        <ul className="space-y-1 list-disc pl-5">
          <Typography asChild variant="sm">
            <li>{"Complete your profile."}</li>
          </Typography>

          <Typography asChild variant="sm">
            <li>
              Add portfolio items testimonials and certifications to stand out.
            </li>
          </Typography>

          <Typography asChild variant="sm">
            <li>{"Submit eye-catching proposals."}</li>
          </Typography>
          <Typography
            asChild
            variant="sm"
            // startIcon={
            //   <MdDone className="inline text-green-haze-500 align-top relative top-[.15em]" />
            // }
          >
            <li>
              {
                "Remember that this is only an Alpha version: weekly updates will arrive on the platform!"
              }
            </li>
          </Typography>
        </ul>
      </header>

      <div className="flex max-sm:flex-col">
        <div className="max-w-[40rem] w-full me-4">
          <SearchBox />
        </div>
        {/* {user?.kind === 0 ? ( */}
        {/* <Button
          asChild
          className="sm:h-auto whitespace-nowrap max-sm:mt-4"
          variant="outlined"
        >
          <Link to={user?.kind === 0 ? "/post-jobs" : "/create-task"}>
            {user?.kind === 0 ? t("Post a Job") : t("Create Task")}
          </Link>
        </Button> */}
        {/* <Button asChild>
          <Link to="/post-jobs">Post a Job</Link>
        </Button> */}

        <AuthGuard>
          <Button asChild>
            <Link to="/create-task">Create Task</Link>
          </Button>
        </AuthGuard>
        {/* ) : (
          <Button
            as={Link}
            to="/create-task"
            className="h-auto"
            variant="outlined"
          >
            {}
          </Button>
        )} */}
      </div>

      <MediaQueryWrapper breakpoint="xl">
        <img
          src="/images/person-with-vr.png"
          className="absolute top-0 rtl:left-10 ltr:right-10 h-full w-auto -z-10 pointer-events-none select-none rtl:-scale-x-100"
          alt=""
        />
      </MediaQueryWrapper>
    </div>
  );
}

export default WelcomeBanner;
