import Footer from "components/Footer";
import ThemeSwitch from "components/ThemeSwitch";
import About from "sections/LandingPage/About";
import FindTopFreelancers from "sections/LandingPage/FindTopFreelancers";
import FindYourDreamJob from "sections/LandingPage/FindYourDreamJob";
import Guide from "sections/LandingPage/Guide";
import Hero from "sections/LandingPage/Hero";
import LevarageNfts from "sections/LandingPage/LevarageNfts";
import TrustedBy from "sections/LandingPage/TrustedBy";
import WhyDeelance from "sections/LandingPage/WhyDeelance";

function LandingPage() {
  return (
    <>
      {/* <PageLayout
      childrenWrapperClassName="pt-0"
      navbarClassName="dark:bg-blue-bg shadow-none"
    > */}
      <ThemeSwitch className="text-xl opacity-80" />

      <div className="mb-20">
        <Hero />
      </div>

      <div className="mb-20 lg:mb-28">
        <TrustedBy />
      </div>

      <WhyDeelance />

      <div className="mb-14">
        <About />
      </div>

      <div className="mb-14 lg:mb-20">
        <LevarageNfts />
      </div>

      <div className="mb-12 lg:mb-20">
        <FindTopFreelancers />
      </div>

      <div className="mb-12 lg:mb-20">
        <FindYourDreamJob />
      </div>

      <div className="mb-12 lg:mb-20">
        <Guide />
      </div>

      <Footer />

      {/* <Articles /> */}
      {/* </PageLayout> */}
    </>
  );
}

export default LandingPage;
