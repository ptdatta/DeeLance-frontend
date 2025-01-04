import Button from "components/Button";
import Typography from "components/Typography";
import { BsHeartFill, BsStarFill } from "react-icons/bs";
import { BiMap } from "react-icons/bi";

function EmployerCard() {
  return (
    <div className="bg-white dark:bg-woodsmoke-900 shadow-lg rounded-lg py-4 px-8 relative">
      <BsHeartFill className="text-end absolute right-8 text-green-haze-600 text-2xl" />

      <div className="flex justify-between items-center border-b-1 border-black/30 dark:border-white/30 mb-2 pb-4">
        <div className="flex gap-3">
          <img src="/images/avatar.png" alt="" className="w-[75px] h-auto" />
          <div className=" py-2">
            <Typography className=" text-xl font-semibold pb-1">
              {"James"}
            </Typography>
            <p className="flex items-center gap-1 text-black/60 dark:text-white/60 text-sm font-medium">
              <BiMap /> {"New York, US"}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Typography className="flex items-center justify-between gap-3 text-black/60 dark:text-white/60 text-sm font-semibold ">
            <span>
              <BsStarFill className=" text-green-haze-600" />
            </span>{" "}
            4.5 (13)
          </Typography>{" "}
        </div>
      </div>

      <div className=" mt-5">
        <h1 className="font-[600] text-lg pb-3">{"UI/UX Designer"}</h1>

        <Typography className="pb-2 text-black/60 dark:text-white/60 font-normal text-xs">
          {"Job Duration :"}{" "}
          <span className="text-black/60 dark:text-white/60 text-xs">
            Fulltime
          </span>
        </Typography>
        <Typography className="pb-2 text-black/60 dark:text-white/60 font-normal text-xs">
          {"Experience :"}{" "}
          <span className="text-black/60 dark:text-white/60 text-xs">
            {" "}
            {"4 Year"}
          </span>
        </Typography>
        <Typography className="text-sm text-black/60 dark:text-white/60">
          {
            "Enhance your project with our Premium Custom Illustrations add-on! Elevate your UI/UX design with unique, tailor-made illustrations that bring your brand to life."
          }
        </Typography>
      </div>

      <div className="flex flex-wrap pt-6 [&>*]:mx-1.5 [&>*]:my-1 -mx-1.5 -my-1">
        <a
          href="/"
          className="flex-1 bg-woodsmoke-100 dark:bg-woodsmoke-700 text-xs font-normal rounded-full py-2 px-6 shadow text-center whitespace-nowrap"
        >
          {"Adobe XD"}
        </a>
        <a
          href="/"
          className="flex-1 bg-woodsmoke-100 dark:bg-woodsmoke-700 text-xs font-normal rounded-full py-2 px-6 shadow text-center whitespace-nowrap"
        >
          {"Adobe XD"}
        </a>
        <a
          href="/"
          className="flex-1 bg-woodsmoke-100 dark:bg-woodsmoke-700  text-xs font-normal rounded-full py-2 px-6 shadow text-center whitespace-nowrap"
        >
          {"Adobe XD"}
        </a>
      </div>

      <div className="flex justify-between pt-6">
        <Button asChild>
          <a href="/employer-profile">{"Hire Me"}</a>
        </Button>
        <Button variant="outlined">
          <a href="/job-detail/657c385806198eb1005e5888">{"View Details"}</a>
        </Button>
      </div>
    </div>
  );
}

export default EmployerCard;
