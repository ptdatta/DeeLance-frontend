import { FaChevronDown } from "react-icons/fa";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Typography from "./Typography";
import CheckBoxNumberIndicator from "./CheckBoxNumberIndicator";

function FilterBar() {
  return (
    <div className="bg-white dark:bg-woodsmoke-900 rounded-lg p-6 [&>*:not(:last-child)]:pb-6 [&>*:not(:last-child)]:border-b-1 [&>*:not(:last-child)]:border-black/20 dark:[&>*:not(:last-child)]:border-white/20 space-y-7 shadow-md">
      <div>
        <Typography variant="lg" className="font-medium mb-5">
          {"Filters"}
        </Typography>
        <Typography variant="lg" className="font-medium mb-5">
          {"Categories"}
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Design & Creative"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Business"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Digital Marketing"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Life Style"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Programming & Tech."} />
          </CheckBoxNumberIndicator>
          <Button
            variant="simple"
            className="w-fit px-0 h-auto pt-2"
            endIcon={<FaChevronDown className="text-[.9em]" />}
          >
            {"Show More"}
          </Button>
        </div>
      </div>

      <div>
        <div className="space-y-3 flex flex-col">
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"$0K - $20K"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"$20K - $40K"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"$40K - $60K"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"$60K - $80K"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"$80K - $100K"} />
          </CheckBoxNumberIndicator>
          <Button
            variant="simple"
            className="w-fit px-0 h-auto pt-2"
            endIcon={<FaChevronDown className="text-[.9em]" />}
          >
            {"Show More"}
          </Button>
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          {"Experience Level"}
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Internship"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Entry Level"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Associate"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Mid Level"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Director"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Executive"} />
          </CheckBoxNumberIndicator>
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          {"Onsite/Remote"}
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"On-site"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Remote"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Hybrid"} />
          </CheckBoxNumberIndicator>
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          {"Job Posted"}
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"All"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"1 Day"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"7 Days"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"1 Month"} />
          </CheckBoxNumberIndicator>
        </div>
      </div>

      <div>
        <Typography variant="lg" className="font-medium mb-5">
          {"Job type"}
        </Typography>

        <div className="space-y-3 flex flex-col">
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Full Time"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Part Time"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Remote Jobs"} />
          </CheckBoxNumberIndicator>
          <CheckBoxNumberIndicator number={56}>
            <Checkbox label={"Freelancer"} />
          </CheckBoxNumberIndicator>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
