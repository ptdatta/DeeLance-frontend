import Paper from "components/Paper";
import SelectBox from "components/SelectBox";
import Typography from "components/Typography";
import { countries, timezones, languages } from "utils/constants";
import { useFormContext } from "react-hook-form";

function OtherDetails() {
  const {
    register,
    formState: { errors: formErrors },
  } = useFormContext();

  const errors: any = formErrors;

  return (
    <div>
      {/* <Typography variant="2xl" className="font-semibold mb-6">
        Select NFT Subscription
      </Typography> */}

      {/* <div className="mb-6 border-1 border-white/20 rounded-md py-3 px-5 flex items-center justify-between space-x-4"> */}
      {/* <Typography variant="xl" className="font-semibold">
        Earn Badge & Stand Out
      </Typography> */}

      {/* <Button>Enroll Now</Button>
      </div> */}

      <main className="grid grid-cols-2 gap-6">
        <Paper>
          <Typography className="font-medium mb-5" variant="xl">
            Time Zone
          </Typography>

          <Typography className="mb-1">Country</Typography>

          <SelectBox
            className="rounded-md dark:bg-woodsmoke-700"
            {...register("otherDetails.timeZone.region")}
            error={errors?.otherDetails?.timeZone?.region?.message}
          >
            <option value="">Select Country</option>

            {countries.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label}
              </option>
            ))}
          </SelectBox>

          <Typography className="mb-1 mt-6">Time Zone</Typography>

          <SelectBox
            className="rounded-md dark:bg-woodsmoke-700"
            {...register("otherDetails.timeZone.timeZone")}
            error={errors?.otherDetails?.timeZone?.timeZone?.message}
          >
            <option value="">Select time zone</option>

            {timezones.map((item, index) => (
              <option key={index} value={item.timeZone}>
                {item.country} {item.timeZone}
              </option>
            ))}
          </SelectBox>
        </Paper>

        {/* <Paper>
          <Typography className="font-medium mb-5" variant="xl">
            Payment
          </Typography>

          <Typography className="mb-1">Select payment method</Typography>
          <Select placeholder="Payment Currency" className="mb-4" />
        </Paper> */}

        <Paper>
          <Typography className="font-medium mb-5" variant="xl">
            Language
          </Typography>

          {/* <Select isMulti placeholder="Select language" /> */}
          <div className="space-y-5">
            <SelectBox
              className="rounded-md overflow-hidden dark:bg-woodsmoke-700"
              {...register("otherDetails.language")}
              error={errors?.otherDetails?.language?.message}
            >
              <option value="">Select your Language</option>
              {languages.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </SelectBox>

            <SelectBox
              label="Payment Method"
              className="rounded-md overflow-hidden dark:bg-woodsmoke-700"
              {...register("otherDetails.payment")}
              error={errors?.otherDetails?.payment?.message}
            >
              <option value="">Select your Language</option>
              <option value="crypto">Crypto</option>
              <option value="card">Card</option>
              <option value="other">Other</option>
            </SelectBox>
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default OtherDetails;
