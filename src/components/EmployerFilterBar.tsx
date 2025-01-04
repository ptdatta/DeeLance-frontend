import { FaChevronDown } from "react-icons/fa";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Typography from "./Typography";

const CheckBoxWithIndicator = ({ isChecked, onChange, label, number }: any) => {
  return (
    <div className="flex items-center justify-between">
      <Checkbox isChecked={isChecked} onChange={onChange} label={label} />

      <div className="w-6 h-6 rounded bg-woodsmoke-700 flex items-center justify-center text-xs">
        {number}
      </div>
    </div>
  );
};

function EmployerFilterBar() {
  return (
    <div className="bg-woodsmoke-900 rounded-lg p-6 [&>*:not(:last-child)]:pb-6 [&>*:not(:last-child)]:border-b-1 [&>*:not(:last-child)]:border-white/20 space-y-7">
      <div>
        <Typography variant="lg" className="font-medium mb-5">
          Filters
        </Typography>
        <Typography variant="lg" className="font-medium mb-5">
          Categories
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxWithIndicator number={56} label="Design & Creative" />
          <CheckBoxWithIndicator number={56} label="Business" />
          <CheckBoxWithIndicator number={56} label="Digital Marketing" />
          <CheckBoxWithIndicator number={56} label="Life Style" />
          <CheckBoxWithIndicator number={56} label="Programming & Tech." />
          <Button
            variant="simple"
            className="w-fit px-0 h-auto pt-2"
            endIcon={<FaChevronDown className="text-[.9em]" />}
          >
            Show More
          </Button>
        </div>
      </div>

      <div>
        <div className="space-y-3 flex flex-col">
          <CheckBoxWithIndicator number={56} label="$0K - $20K" />
          <CheckBoxWithIndicator number={56} label="$20K - $40K" />
          <CheckBoxWithIndicator number={56} label="$40K - $60K" />
          <CheckBoxWithIndicator number={56} label="$60K - $80K" />
          <CheckBoxWithIndicator number={56} label="$80K - $100K" />
          <Button
            variant="simple"
            className="w-fit px-0 h-auto pt-2"
            endIcon={<FaChevronDown className="text-[.9em]" />}
          >
            Show More
          </Button>
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          Experience Level
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxWithIndicator number={56} label="Internship" />
          <CheckBoxWithIndicator number={56} label="Entry Level" />
          <CheckBoxWithIndicator number={56} label="Associate" />
          <CheckBoxWithIndicator number={56} label="Mid Level" />
          <CheckBoxWithIndicator number={56} label="Director" />
          <CheckBoxWithIndicator number={56} label="Executive" />
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          Onsite/Remote
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxWithIndicator number={56} label="On-site" />
          <CheckBoxWithIndicator number={56} label="Remote" />
          <CheckBoxWithIndicator number={56} label="Hybrid" />
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          Job Posted
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxWithIndicator number={56} label="All" />
          <CheckBoxWithIndicator number={56} label="1 Day" />
          <CheckBoxWithIndicator number={56} label="7 Days" />
          <CheckBoxWithIndicator number={56} label="1 Month" />
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          Job type
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxWithIndicator number={56} label="Full Time" />
          <CheckBoxWithIndicator number={56} label="Part Time" />
          <CheckBoxWithIndicator number={56} label="Remote Jobs" />
          <CheckBoxWithIndicator number={56} label="Freelancer" />
        </div>
      </div>
    </div>
  );
}

export default EmployerFilterBar;
