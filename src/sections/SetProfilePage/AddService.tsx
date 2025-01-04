import Button from "components/Button";
import Input from "components/Input";
import Paper from "components/Paper";
import Typography from "components/Typography";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Pill from "components/Pill";
import { IoClose } from "react-icons/io5";
import { FieldMessage } from "pages/SetProfilePage";

// const options = [
//   { value: "javascript", label: "JavaScript" },
//   { value: "python", label: "Python" },
//   { value: "java", label: "Java" },
//   { value: "ruby", label: "Ruby" },
//   { value: "html", label: "HTML5" },
//   { value: "css", label: "CSS3" },
//   { value: "react", label: "React.js" },
//   { value: "angular", label: "Angular" },
//   { value: "vue", label: "Vue.js" },
//   { value: "mysql", label: "MySQL" },
//   { value: "mongodb", label: "MongoDB" },
//   { value: "postgresql", label: "PostgreSQL" },
//   { value: "photoshop", label: "Adobe Photoshop" },
//   { value: "illustrator", label: "Adobe Illustrator" },
//   { value: "indesign", label: "Adobe InDesign" },
//   { value: "sketch", label: "Sketch" },
//   { value: "figma", label: "Figma" },
//   { value: "coreldraw", label: "CorelDRAW" },
// ];

const schema = yup.object({
  skill: yup
    .string()
    .min(2, "minimum length is 2")
    .max(30, "Exceeding maximum length"),
});

function AddService() {
  const { fields, append, remove } = useFieldArray({
    name: "skills",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    append({
      code: data.skill,
      label: data.skill,
    });

    reset();
  };

  return (
    <div>
      <main className="grid grid-cols-2 gap-6">
        <Paper className="col-span-2">
          <Typography asChild className="mb-2 flex">
            <label htmlFor="skills">Skills</label>
          </Typography>

          <div className="flex space-x-4 [&>*]:flex-shrink-0">
            <div className="flex-1">
              <Input
                placeholder="Enter your skill to add"
                className="dark:bg-woodsmoke-700"
                error={errors?.skill?.message}
                {...register("skill")}
              />
            </div>

            <Button
              disabled={!isValid}
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Add
            </Button>
          </div>

          <FieldMessage>
            Highlight your strengths! Add your key skills to let others know
            what you excel at
          </FieldMessage>

          <div className="flex [&>*]:mx-1.5 [&>*]:my-1.5 -mx-1.5 -my-1.5 flex-wrap mt-6">
            {fields.map((field: any, index) => (
              <Pill
                as="div"
                className="text-base flex space-x-2 whitespace-nowrap"
                key={field.id}
              >
                <span>{field.label}</span>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-[1.1em]"
                  tabIndex={-1}
                >
                  <IoClose />
                </button>
              </Pill>
            ))}
          </div>
        </Paper>

        {/* <Paper>
          <Typography htmlFor="skills" as="label" className="mb-2 flex">
            Category
          </Typography>
          <Select
            isMulti
            options={options}
            id="skills"
            placeholder="Select Category"
          />
        </Paper>

        <Paper>
          <Typography htmlFor="skills" as="label" className="mb-2 flex">
            Subcategory
          </Typography>
          <Select
            isMulti
            options={options}
            id="skills"
            placeholder="Select Subcategory"
          />
        </Paper> */}
      </main>
    </div>
  );
}

export default AddService;
