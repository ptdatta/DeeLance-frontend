import Paper from "components/Paper";
import TabBar from "components/TabBar";
import TabButton from "components/TabButton";
import Typography from "components/Typography";
import EmployerUserDetailsBar from "components/EmployerUserDetailsBar";
import HalfSplitGridLayout from "layouts/HalfSplitGridLayout";
import PageLayout from "layouts/PageLayout";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "components/Button";

const tabs = [
  { value: "Overview", route: "" },
  { value: "Project", route: "project" },
  { value: "Portfolio", route: "portfolio" },
  { value: "CV", route: "cv" },
  { value: "Reviews", route: "reviews" },
  { value: "Settings", route: "settings" },
];

function EmployerProfiles() {
  const location = useLocation();

  return (
    <PageLayout>
      <div className="container-wrapper">
        <Paper size={9} className="relative z-10 mb-8">
          <div className=" flex justify-between items-center">
            <div>
              <Typography variant="2xl" className="font-medium mb-3">
                Show clients you know your stuff
              </Typography>
              {/* <Typography className="text-black/60 dark:text-white/60">
            Lorem ipsum is a placeholder <br />
            text commonly used to demonstrate
          </Typography> */}
            </div>

            <div className=" flex justify-evenly gap-6">
              <Button className="px-12">Chat</Button>
              <Button className=" px-12">Hire Me</Button>
            </div>
          </div>

          <img
            src="/images/wave.svg"
            className="absolute bottom-0 right-0 w-[60%] -z-10 pointer-events-none select-none"
            alt=""
          />
        </Paper>

        <HalfSplitGridLayout>
          <EmployerUserDetailsBar />

          <main>
            <header className="mb-7">
              <TabBar>
                {tabs.map((item, i) => (
                  <TabButton
                    key={i}
                    active={
                      location.pathname ===
                      `/profile${item.route === "" ? "" : "/"}${item.route}`
                    }
                    as={Link}
                    to={item.route}
                    variant="simple"
                    className="px-0"
                  >
                    {item.value}
                  </TabButton>
                ))}
              </TabBar>
            </header>

            <Outlet />
          </main>
        </HalfSplitGridLayout>
      </div>
    </PageLayout>
  );
}

export default EmployerProfiles;
