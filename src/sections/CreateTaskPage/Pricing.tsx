import Input from "components/Input";
import Paper from "components/Paper";
import SelectBox from "components/SelectBox";
import Typography from "components/Typography";
import { useFormContext } from "react-hook-form";

function Pricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Paper>
      <Typography variant="xl" className="font-medium mb-6">
        Price & scope
      </Typography>

      <main className="grid  gap-x-6 gap-y-4 items-center mb-10">
        <div className="flex flex-col gap-2">
          <Typography>Package Title</Typography>
          <Input
            variant="outlined"
            placeholder="Describe your package"
            {...register("pricingTitle")}
            error={errors?.pricingTitle?.message}
          />
        </div>

        {/* <Typography>Description</Typography>
        <Textarea placeholder="Describe your package"
          {...register("pricingTitle")}
          error={errors?.pricingTitle?.message}
        /> */}
        {/* <textarea
          placeholder="Describe your package"
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700 py-4 px-5 h-20 rounded-md resize-none"
        /> */}
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2 w-[100%]">
            <Typography>Delivery Days</Typography>
            <SelectBox
              variant="outlined"
              {...register("deliveryDays", { valueAsNumber: true })}
              error={errors?.deliveryDays?.message}
            >
              <option value="0">Select Delivery Days</option>
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="4">4 days</option>
              <option value="5">5 days</option>
              <option value="6">6 days</option>
              <option value="7">7 days</option>
              <option value="8">8 days</option>
              <option value="9">9 days</option>
              <option value="10">10 days</option>
              <option value="11">11 days</option>
              <option value="12">12 days</option>
              <option value="13">13 days</option>
              <option value="14">14 days</option>
              <option value="16">16 days</option>
            </SelectBox>
          </div>
          <div className="flex flex-col gap-2 w-[100%]">
            <Typography>Revision</Typography>
            <SelectBox
              variant="outlined"
              {...register("revision", { valueAsNumber: true })}
              error={errors?.revision?.message}
            >
              <option value="0">
                Enter the number of revision you will provide (e.g., 1)
              </option>
              <option value="1">1 </option>
              <option value="2">2 </option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5">5 </option>
              <option value="6">6 </option>
              <option value="7">7 </option>
              <option value="8">8 </option>
              <option value="9">9 </option>
              <option value="10">10 </option>
              <option value="11">Unlimited</option>
            </SelectBox>
          </div>
        </div>
        {/* <Typography className="lh-1">Number of pages or screens</Typography>
        <SelectBox
          placeholder="Describe your package"
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700 rounded-md"
          options={[{ value: "Select screen" }]}
        /> */}
        <div className="flex flex-col gap-2 ">
          <Typography className="lh-1">Price</Typography>
          <Input
            type="number"
            variant="outlined"
            placeholder="Mention your price"
            {...register("price", { valueAsNumber: true })}
            error={errors?.price?.message}
          />
        </div>
      </main>

      {/* <Typography variant="xl" className="mb-6 font-medium">
        Service options
      </Typography>

      <div className="grid grid-cols-4 gap-y-4 gap-x-6 mb-8">
        {new Array(12).fill("").map((_, i) => (
          <Checkbox key={i} label="Project attributes" />
        ))}
      </div> */}

      {/* <Typography variant="xl" className="mb-2 font-medium">
        Add-ons (optional)
      </Typography>
      <Typography variant="sm" className="text-white/60 mb-8">
        You can add extra service here
      </Typography> */}

      {/* <Typography
        variant="xl"
        className="mb-4 font-medium"
        startIcon={
          <BsPlusCircleFill className="inline-block align-middle relative top-[-.1em] mr-[.3em] text-green-haze-600" />
        }
      >
        Create Add-Ons
      </Typography>

      <div className="grid grid-cols-3 gap-5">
        <SelectBox
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700 rounded-md"
          options={[{ value: "Select Days" }]}
        />
        <SelectBox
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700 rounded-md"
          options={[{ value: "Select Days" }]}
        />
        <SelectBox
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700 rounded-md"
          options={[{ value: "Select Days" }]}
        />
      </div> */}
    </Paper>
  );
}
export default Pricing;
