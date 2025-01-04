// @ts-nocheck

import IconText from "components/IconText";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";
import { BsBookmark, BsFillBarChartFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { PiBagFill } from "react-icons/pi";
import { IoIosPaper } from "react-icons/io";
import Pill from "components/Pill";
import Button from "components/Button";
import { FaDollarSign, FaLaptop, FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import AttachmentCard from "components/AttachmentCard";
import FileSelector from "components/FileSelector";
import React, { useState, useEffect, useContext } from "react";
import MilestoneCard from "components/MilestoneCard";
import SimilarJobs from "components/SimilarJobs";
import MilestoneSubmittedCard from "components/MilestoneSubmittedCard";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "utils/constants";
import axios from "axios";
import { AuthContext } from "Providers/AuthContextProvider";
import formateDate from "utils/formateDate";

const ExpectedBudget = ({ jobData }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Typography variant="lg" className="font-medium">
          Expected Budget
        </Typography>
        <Typography variant="2xl" className="font-medium">
          ${jobData?.salaryRate}
        </Typography>
      </div>

      <div className="space-y-4">
        <Button className="w-full">Submit Proposal</Button>
        <Button
          startIcon={<BsBookmark />}
          className="w-full text-black dark:text-white"
          variant="outlined"
        >
          Save Job
        </Button>
      </div>
    </div>
  );
};

const AboutBuyer = ({ jobData }) => {
  return (
    <div>
      <Typography variant="lg" className="mb-5 font-medium">
        About Job Poster
      </Typography>

      <div className="grid grid-cols-[92px_1fr] items-center gap-5 mb-6">
        <div className="aspect-square rounded-md bg-black" />
        <div>
          <Typography className="font-medium mb-1">
            {jobData?.userId?.FullName}
          </Typography>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-0.5 text-sm">
              <FaStar className="text-green-haze-600" />
              <FaStar className="text-green-haze-600" />
              <FaStar className="text-green-haze-600" />
              <FaStar className="text-green-haze-600" />
              <FaStar className="text-green-haze-600" />
            </div>
            <Typography
              variant="xs"
              className="font-medium text-black/40 dark:text-white/40"
            >
              5.0 of 8 reviews
            </Typography>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <IconText
          title={
            <>
              India <br />
              <span className="text-black/60 dark:text-white/60 mt-[.3em] flex">
                4:40 pm
              </span>
            </>
          }
          icon={<HiOutlineLocationMarker className="text-green-haze-600" />}
        />

        <IconText
          title={
            <>
              16 Jobs Posted <br />
              <span className="text-black/60 dark:text-white/60 mt-[.3em] flex">
                75% hire rate, 1 open job
              </span>
            </>
          }
          icon={<FaLaptop className="text-green-haze-600" />}
        />

        <IconText
          title={
            <>
              $600 Total Spent <br />
              <span className="text-black/60 dark:text-white/60 mt-[.3em] flex">
                12 hires, 1 active
              </span>
            </>
          }
          icon={<FaDollarSign className="text-green-haze-600" />}
        />
      </div>

      <Typography className="text-green-haze-600 mt-6">
        Member since Apr 15, 2021
      </Typography>
    </div>
  );
};

const Attachments = () => {
  return (
    <div>
      <Typography variant="xl" className="font-medium mb-4">
        Attachments
      </Typography>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <AttachmentCard
          type="xls"
          fileName="Data-Structure.xls"
          size="12.4 MB"
        />
        <AttachmentCard
          type="pdf"
          fileName="Data-Structure.xls"
          size="12.4 MB"
        />
        <AttachmentCard
          type="mp3"
          fileName="Data-Structure.mp3"
          size="12.4 MB"
        />
      </div>
    </div>
  );
};

const PayOptionCard = ({ title, desc, active = false, onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <div
      role="button"
      onClick={onClick}
      className={`bg-woodsmoke-200 dark:bg-woodsmoke-900 py-5 px-6 rounded-md flex space-x-3 cursor-pointer border-2  transition-all duration-200 hover:bg-woodsmoke-300 dark:hover:bg-woodsmoke-800 ${
        active ? "border-green-haze-600 shadow-lg" : "border-transparent"
      }`}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-4 h-4 border-2 rounded-full transition-all duration-200 ${
            active ? "border-green-haze-600" : "border-white/100"
          }`}
        >
          <div
            className={`w-full h-full rounded-full border-2 transition-all duration-200 ${
              active
                ? "bg-green-haze-600 border-white dark:border-woodsmoke-900"
                : "bg-transparent border-transparent"
            }`}
          />
        </div>
      </div>

      <div>
        <Typography className="mb-3 lh-1">{title}</Typography>
        <Typography variant="sm" className="text-black/60 dark:text-white/60">
          {desc}
        </Typography>
      </div>
    </div>
  );
};

function JobDetailPage() {
  const [payBy, setPayBy] = useState("milestone");
  const [milestones, setMilestones] = useState([{}]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [jobData, setJobData] = useState(null);

  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("job detail = ", res.data.data);
      setJobData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  return (
    <PageLayout>
      <div className="container-wrapper">
        <header className="bg-white dark:bg-woodsmoke-900 shadow-lg rounded-lg p-7 mb-5 grid lg:grid-cols-[1fr_372px] lg:gap-10">
          <div>
            <Typography
              variant="xs"
              className="text-black/60 dark:text-white/60 mb-6"
            >
              {formateDate(jobData?.creationDate)}
            </Typography>

            <Typography variant="2xl" className="font-medium mb-5">
              {jobData?.jobTitle}
            </Typography>

            <div className="flex items-center flex-wrap [&>*]:m-2.5 -m-2.5">
              <IconText
                iconClassName="w-auto mr-[.4em]"
                title="Basic Level"
                icon={<BsFillBarChartFill className="text-green-haze-600" />}
              />
              <IconText
                iconClassName="w-auto mr-[.4em]"
                title="KYC Verified"
                icon={<MdVerifiedUser className="text-green-haze-600" />}
              />
              <IconText
                iconClassName="w-auto mr-[.4em]"
                title={jobData?.salaryType}
                icon={<PiBagFill className="text-green-haze-600" />}
              />
              <IconText
                iconClassName="w-auto mr-[.4em]"
                title={jobData?.jobType}
                icon={<IoIosPaper className="text-green-haze-600" />}
              />
            </div>
          </div>

          <div />
        </header>

        <div className="grid lg:grid-cols-[1fr_372px] gap-10 lg:pr-10 mb-10">
          <main>
            <div className="flex flex-wrap [&>*]:m-1 -m-1 mb-6">
              <Pill className="bg-white shadow" sizeVariant="sm">
                Category
              </Pill>
              <Pill className="bg-white shadow" sizeVariant="sm">
                Industry
              </Pill>
              <Pill className="bg-white shadow" sizeVariant="sm">
                ReactJS
              </Pill>
            </div>

            <div>
              <Typography variant="xl" className="font-medium mb-4">
                Project Description
              </Typography>

              <Typography className="opacity-60 mb-8">
                {jobData?.jobRequirements}
              </Typography>

              {/* <Typography variant="xl" className="font-medium mb-4">
                Pellentesque elementum ante massa
              </Typography>

              <ul className="text-black/60 dark:text-white/60 list-disc space-y-3 pl-6">
                <Typography as="li">
                  Suspendisse gravida risus in sapien sollicitudin, quis
                  pulvinar neque congue.
                </Typography>
                <Typography as="li">
                  Quisque mollis enim nec lacus elementum vulputate.
                </Typography>
                <Typography as="li">
                  Nullam fermentum turpis a nisl tristique, quis rutrum quam
                  eleifend.
                </Typography>
                <Typography as="li">
                  Donec placerat orci id lobortis suscipit.
                </Typography>
                <Typography as="li">
                  Fusce quis massa rutrum, accumsan nibh vitae, hendrerit
                  turpis.
                </Typography>
                <Typography as="li">
                  Etiam dignissim mauris at orci finibus, quis blandit nisl
                  cursus.
                </Typography>
              </ul> */}
            </div>
          </main>

          <aside className="space-y-5 [&>*]:bg-white dark:[&>*]:bg-woodsmoke-900 [&>*]:rounded-lg [&>*]:p-6 [&>*]:shadow-[0_0_1rem_rgba(0,0,0,.4)] lg:mt-[-8rem]">
            <ExpectedBudget jobData={jobData} />
            <AboutBuyer jobData={jobData} />
          </aside>
        </div>

        <div className="mb-10">
          <Attachments />
        </div>

        {isSubmitted ? (
          <>
            <Typography variant="xl" className="font-semibold mb-5">
              Your Submitted purposel
            </Typography>
            <Typography variant="base" className="text-white/80 mb-4">
              Cover Letter
            </Typography>
            <Typography variant="base" className="text-white/60 mb-5">
              Lorem ipsum dolor sit amet consectetur. Ultrices curabitur
              lobortis pharetra id nisi. Eu justo justo econsequat nisl. Turpis
              ipsum consectetur elit tempus. Lorem ipsum dolor sit amet
              consectetur. Ultrices curabitur lobortis pharetra id nisi. Eu
              justo justo econsequat nisl. Turpis ipsum consectetur elit tempus.
              Lorem ipsum dolor sit amet consectetur. Ultrices curabitur
              lobortis pharetra id nisi. Eu justo justo econsequat nisl. Turpis
              ipsum consectetur elit tempus. Lorem ipsum dolor sit amet
              consectetur. Ultrices curabitur lobortis pharetra id nisi. Eu
              justo justo econsequat nisl. Turpis ipsum consectetur elit
              tempus.Lorem ipsum dolor sit amet consectetur. Ultrices curabitur
              lobortis pharetra id nisi. Eu justo justo econsequat nisl. Turpis
              ipsum consectetur elit tempus. Lorem ipsum dolor sit amet
              consectetur. Ultrices curabitur lobortis pharetra id nisi. Eu
              justo justo econsequat nisl. Turpis ipsum consectetur elit tempus.
            </Typography>

            <div className="grid grid-cols-3 gap-5 mb-10">
              <AttachmentCard
                fileName="My Resume.pdf"
                size="12.4 MB"
                type="pdf"
              />
            </div>

            <div className="flex items-center justify-between mb-5">
              <Typography variant="lg" className="font-medium">
                Project Terms
              </Typography>
              <Typography variant="lg" className="font-medium">
                Client’s Budget: $200
              </Typography>
            </div>

            <Typography
              variant="lg"
              className="text-black/80 dark:text-white/80 mb-3"
            >
              How do you want to paid?
            </Typography>
            <Typography variant="base" className="font-medium mb-4">
              By milestone
            </Typography>

            <Typography variant="base" className="text-white/60 mb-8">
              Divide the projects into smaller segments, called milestones.
              You’ll be paid for milestones as they are completed and approved.
            </Typography>

            <div className="space-y-4">
              <MilestoneSubmittedCard />
              <MilestoneSubmittedCard />
            </div>

            <Button
              onClick={() => setIsSubmitted(false)}
              className="ml-auto mt-7 bg-woodsmoke-900 px-[2em]"
            >
              Withdraw
            </Button>
          </>
        ) : (
          <>
            <Typography variant="xl" className="font-medium mb-8">
              Send Your Proposal
            </Typography>

            <div className="mb-4">
              <Typography className="text-black/60 dark:text-white/60 mb-3">
                Cover Letter
              </Typography>
              <textarea
                className="bg-woodsmoke-200 dark:bg-woodsmoke-900 p-5 rounded-md border-2 border-white/20 w-full resize-none h-32"
                placeholder="Enter Description"
              />
            </div>

            <div className="mb-10">
              <FileSelector />
            </div>

            <div className="flex items-center justify-between mb-5">
              <Typography variant="lg" className="font-medium">
                Project Terms
              </Typography>
              <Typography variant="lg" className="font-medium">
                Client’s Budget: $200
              </Typography>
            </div>

            <Typography className="text-black/60 dark:text-white/60 mb-3">
              How do you want to paid?
            </Typography>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mb-10">
              <PayOptionCard
                active={payBy === "milestone"}
                onClick={() => setPayBy("milestone")}
                title="By milestone"
                desc="Divide the projects into smaller segments, called milestones. You’ll be paid for milestones as they are completed and approved."
              />
              <PayOptionCard
                active={payBy === "project"}
                onClick={() => setPayBy("project")}
                title="By project"
                desc="Get your entire payment at the end, when all work has been delivered."
              />
            </div>

            {payBy === "milestone" ? (
              <div className="mb-6">
                <Typography variant="xl" className="font-medium mb-5">
                  How many milestones do you want to include?
                </Typography>

                <div className="space-y-3 mb-3">
                  {milestones.map((_, i) => (
                    <MilestoneCard key={i} />
                  ))}
                </div>

                <Button
                  variant="simple"
                  className="px-0 h-auto hover:text-green-haze-600"
                  onClick={() => setMilestones((val) => [...val, "abc"])}
                >
                  + Add Milestone
                </Button>
              </div>
            ) : null}

            <Button
              className="ml-auto flex"
              onClick={() => setIsSubmitted(true)}
            >
              Submit Proposal
            </Button>
          </>
        )}

        <footer className="mt-14">
          <SimilarJobs />
        </footer>
      </div>
    </PageLayout>
  );
}

export default JobDetailPage;
