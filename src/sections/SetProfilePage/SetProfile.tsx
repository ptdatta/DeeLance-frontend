import Input from "components/Input";
import Paper from "components/Paper";
import Textarea from "components/Textarea";
import { FieldMessage } from "pages/SetProfilePage";
import { useFormContext } from "react-hook-form";

function SetProfile() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <main className="space-y-6">
        <Paper className="">
          {/* <div className="relative">
            <Avatar size={60} />

            <button className="w-5 h-5 bg-white/90 rounded-full absolute top-0 left-0 flex items-center justify-center text-green-haze-600">
              <FaPencilAlt className="text-xs" />
            </button>
          </div> */}

          <Input
            className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
            label="Username"
            placeholder="Enter your username"
            error={errors?.username?.message}
            {...register("username")}
          />

          <FieldMessage>
            Add a personal touch! What name would you like others to see on your
            profile?
          </FieldMessage>
          {/* 
          <Input
            type="password"
            value="abcd123as;kdjasld"
            className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
          /> */}

          {/* <button className="absolute right-4 top-4 w-6 h-6 rounded-full bg-woodsmoke-300 dark:bg-woodsmoke-950 flex items-center justify-center text-xs">
            <FaPencilAlt />
          </button> */}
        </Paper>

        <Paper>
          <Input
            label="Title"
            placeholder="Describe your service"
            className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
            error={errors?.title?.message}
            {...register("title")}
          />

          <FieldMessage>
            Let others know what {"you're"} all about! {"What's"} your
            professional title?
          </FieldMessage>
        </Paper>

        <Paper>
          <Textarea
            label="Description"
            placeholder="Enter description"
            className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
            error={errors?.description?.message}
            {...register("description")}
          />

          <FieldMessage>
            Introduce yourself! Share a quick description that gives others a
            glimpse into your world.
          </FieldMessage>
        </Paper>
      </main>
    </div>
  );
}

export default SetProfile;
