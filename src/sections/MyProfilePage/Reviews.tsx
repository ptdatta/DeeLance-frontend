import Typography from "components/Typography";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import PerPageItemsSelector from "components/PerPageItemsSelector";
import Pagination from "components/Pagination";
import DullTabButton from "components/DullTabButton";
import ReviewCard from "components/ReviewCard";

const RatingBar = ({ title, progress }: any) => {
  return (
    <div className="flex items-center space-x-4">
      <Typography className="lh-1">{title}</Typography>

      <div className="h-3 rounded bg-black/20 dark:bg-white/60 overflow-hidden flex-1">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-green-haze-600"
        />
      </div>

      <Typography className="w-10 text-right lh-1">{progress}%</Typography>
    </div>
  );
};

function Reviews() {
  const [tab, setTab] = useState("freelancer");

  return (
    <div className="pt-5">
      <header className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-16 items-center border-b-2 border-white/30 pb-6 mb-8">
        <aside>
          <div className="mb-4">
            <Typography
              variant="4xl"
              className="inline text-green-haze-600 font-medium"
            >
              4.8
            </Typography>
            <Typography variant="base" className="inline">
              out of 5
            </Typography>
          </div>

          <div className="flex items-center space-x-1 text-2xl">
            <FaStar className="text-green-haze-600" />
            <FaStar className="text-green-haze-600" />
            <FaStar className="text-green-haze-600" />
            <FaStar />
            <FaStar />
          </div>
          <Typography className="text-black/60 dark:text-white/60 mt-3">
            27 Rating
          </Typography>
        </aside>

        <div className="space-y-4">
          <RatingBar title="5 star" progress={80} />
          <RatingBar title="4 star" progress={60} />
          <RatingBar title="3 star" progress={50} />
          <RatingBar title="2 star" progress={40} />
          <RatingBar title="1 star" progress={0} />
        </div>
      </header>

      <main>
        <Typography variant="2xl" className="font-medium mb-4">
          Client’s Reviews
        </Typography>

        <div className="flex items-center space-x-4 mb-10">
          <DullTabButton
            active={tab === "freelancer"}
            onClick={() => setTab("freelancer")}
          >
            As a Freelancer
          </DullTabButton>
          <DullTabButton
            active={tab === "jobseeker"}
            onClick={() => setTab("jobseeker")}
          >
            As a Job seeker
          </DullTabButton>
        </div>

        <div className="[&>*]:border-b-2 [&>*]:border-black/30 dark:[&>*]:border-white/30 [&>*]:pb-5 space-y-8">
          {tab === "freelancer" ? (
            <>
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </>
          ) : null}

          {tab === "jobseeker" ? (
            <>
              <ReviewCard />
              <ReviewCard />
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between mt-8">
          <PerPageItemsSelector />
          <Pagination />
        </div>
      </main>
    </div>
  );
}

export default Reviews;
