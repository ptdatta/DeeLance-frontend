import Button from "components/Button";
import Loader from "components/Loader";
import Paper from "components/Paper";
import Typography from "components/Typography";
import { useFormContext } from "react-hook-form";
import { MdOutlineRocketLaunch, MdOutlineWatchLater } from "react-icons/md";

function Publish({ nextClick }: { nextClick: any }) {
  const {
    setValue,
    watch,
    formState: { isSubmitting },
  } = useFormContext();

  const onPublishClick = (isPublish: boolean) => {
    setValue("isPublish", isPublish);
    nextClick();
  };

  return (
    <Paper className="space-y-10 relative overflow-hidden">
      {/* {isSubmitting ? (
        <Loader.LoaderFullScreenWrapper className="absolute h-full backdrop-blur-md">
          <Loader.BarLoader className="max-w-[30rem] w-[90%]" />
        </Loader.LoaderFullScreenWrapper>
      ) : null} */}

      <div className="py-10">
        <Typography
          variant="3xl"
          className="font-bold opacity-80 text-center mb-3"
        >
          You are almost There!
        </Typography>
        <Typography
          variant="lg"
          className="text-black/60 dark:text-white/40 text-center max-w-[20rem] mx-auto lh-1_4"
        >
          {"Let's"} world know about your gig and get some buyers rolling in.
        </Typography>

        <div className="mt-8 flex items-center space-x-4 justify-center">
          <Button
            variant="outlined"
            type="button"
            onClick={() => onPublishClick(false)}
            disabled={isSubmitting}
            className="max-w-[10rem] w-full"
          >
            {watch("isPublish") === false && isSubmitting ? (
              <Loader.CircularSnake color="black" />
            ) : (
              <>
                <MdOutlineWatchLater className="mr-2 text-[1.4em]" />
                Publish Later
              </>
            )}
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => onPublishClick(true)}
            className="max-w-[10rem] w-full"
          >
            {watch("isPublish") === true && isSubmitting ? (
              <Loader.CircularSnake color="white" />
            ) : (
              <>
                <MdOutlineRocketLaunch className="mr-2 text-[1.4em]" />
                Publish Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* <div>
        <Controller
          control={control}
          name="isItYourContent"
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <div>
              <Checkbox
                isChecked={value}
                onChange={onChange}
                label="To comply with Deelance’s terms of service, make sure to upload only content you either own or you have the permission or license to use."
                {...rest}
              />

              {error ? (
                <span className="mt-2 flex text-red-500 w-fit pointer-events-none select-none text-sm">
                  {error.message}
                </span>
              ) : null}
            </div>
          )}
        />
      </div>

      <div>
        <Typography variant="xl" className="mb-4 font-medium">
          Terms & Condtition
        </Typography>

        <div className="space-y-3">
          <Controller
            control={control}
            name="termsAndCondition"
            render={({
              field: { onChange, value, ...rest },
              fieldState: { error },
            }) => (
              <div>
                <Checkbox
                  isChecked={value}
                  onChange={onChange}
                  {...rest}
                  label={
                    <>
                      I agree to Deelance{" "}
                      <span className="text-green-haze-600 underline">
                        Terms & Conditions
                      </span>
                    </>
                  }
                />

                {error ? (
                  <span className="mt-2 flex text-red-500 w-fit pointer-events-none select-none text-sm">
                    {error.message}
                  </span>
                ) : null}
              </div>
            )}
          />
        </div>
      </div> */}
    </Paper>
  );
}

export default Publish;
