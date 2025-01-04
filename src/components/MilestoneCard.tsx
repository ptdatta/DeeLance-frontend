import Input from "./Input";
import SelectBox from "./SelectBox";
import Typography from "./Typography";

function MilestoneCard() {
  return (
    <div className="p-5 bg-white shadow-lg dark:bg-woodsmoke-900 rounded-md grid sm:grid-cols-[1fr_.5fr_.5fr] gap-4">
      <div className="space-y-2">
        <Typography>Description</Typography>
        <Input
          className="bg-woodsmoke-200/60 dark:bg-woodsmoke-700"
          placeholder="Write description"
        />
      </div>
      <div className="space-y-2">
        <Typography>Due Date</Typography>
        <SelectBox
          className="rounded-md bg-woodsmoke-200/60 dark:bg-woodsmoke-700 h-[45px]"
          // options={[{ value: "Select" }] as any}
        />
      </div>
      <div className="space-y-2">
        <Typography>Amount</Typography>
        <Input
          type="number"
          className="bg-woodsmoke-200/60 dark:bg-woodsmoke-700"
          placeholder="0.00"
        />
      </div>
    </div>
  );
}

export default MilestoneCard;
