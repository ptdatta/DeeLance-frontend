import Avatar from "components/Avatar";
import Pill from "components/Pill";
import Typography from "components/Typography";
import { BsFillBarChartFill } from "react-icons/bs";
import { MdLocationPin, MdVerifiedUser } from "react-icons/md";
import { PiBagFill } from "react-icons/pi";
import { IoIosPaper } from "react-icons/io";
import Button from "components/Button";
import { FaRegBookmark } from "react-icons/fa";
import IconText from "components/IconText";
import { Link } from "react-router-dom";

function StaticJobCard() {
  return (
    <div className="bg-white dark:bg-woodsmoke-900 rounded-lg px-8 grid grid-cols-[1fr_.5fr] gap-12 shadow-md">
      <aside className="py-6">
        <Avatar size={32} title="Michael James" className="mb-5" />

        <div>
          <Typography variant="2xl" className="font-medium mb-1">
            {"Senior Fullstack Developer"}
          </Typography>
          <Typography className="text-black/60 dark:text-white/60 mb-4">
            {"Budget: $500"}
          </Typography>

          <Typography className="text-black/60 dark:text-white/60 mb-5">
            {
              "Lorem ipsum dolor sit amet consectetur. Ultrices curabitur lobortis pharetra id nisi. Eu justo justo econsequat nisl. Turpis ipsum consectetur elit tempus. Lorem ipsum dolor sit amet consectetur. Ultrices curabitur lobortis pharetra id nisi....."
            }
          </Typography>

          <div className="flex flex-wrap [&>*]:m-1 -m-1">
            <Pill className="shadow shadow-black/20">{"Visual Design"}</Pill>
            <Pill className="shadow shadow-black/20">{"UX UI Design"}</Pill>
            <Pill className="shadow shadow-black/20">{"Figma"}</Pill>
            <Pill className="shadow shadow-black/20">{"Visual Design"}</Pill>
          </div>
        </div>
      </aside>

      <div className="rtl:border-r ltr:border-l-1 border-woodsmoke-700 rtl:pr-10 ltr:pl-10 py-6 flex flex-col">
        <div className="space-y-5 flex-1 mb-5">
          <IconText
            title={"Basic Level"}
            icon={<BsFillBarChartFill className="text-green-haze-600" />}
          />
          <IconText
            title={"KYC Verified"}
            icon={<MdVerifiedUser className="text-green-haze-600" />}
          />
          <IconText
            title={"Job type: Partial Onsite"}
            icon={<PiBagFill className="text-green-haze-600" />}
          />
          <IconText
            title={"Project type: Fixed Price"}
            icon={<IoIosPaper className="text-green-haze-600" />}
          />
          <IconText
            title={"United Kingdom"}
            icon={<MdLocationPin className="text-green-haze-600" />}
          />
        </div>

        <div className="flex">
          <Button
            variant="outlined"
            className="px-[.8em] text-black dark:text-white me-4"
          >
            <FaRegBookmark />
          </Button>
          <Button asChild className="flex-1 text-center lh-1">
            <Link to="/job-detail">{"View Job"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StaticJobCard;
