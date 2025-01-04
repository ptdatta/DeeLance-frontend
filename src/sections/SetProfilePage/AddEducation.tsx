/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Input from "components/Input";
import Paper from "components/Paper";
import SelectBox from "components/SelectBox";
import Typography from "components/Typography";
import { months, years } from "utils/constants";
import { FieldMessage } from "pages/SetProfilePage";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const EducationFields = ({ index, remove }: any) => {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors: formErrors },
  } = useFormContext();
  const errors: any = formErrors;
  const currentlyStudying = watch(`education.${index}.currentlyStudyingHere`);

  useEffect(() => {
    if (currentlyStudying) {
      setValue(`education.${index}.endMonth`, "");
      setValue(`education.${index}.endYear`, "");
    }
  }, [currentlyStudying]);

  return (
    <div className="grid grid-cols-4 gap-6 items-start">
      <div className="col-span-4 flex items-center justify-between">
        <Typography variant="xl" className="font-bold">
          Education {index + 1}
        </Typography>

        <Button
          variant="error-outlined"
          onClick={() => remove(index)}
          startIcon={<IoClose className="text-[1.3em]" />}
          className="border-none flex items-center"
        >
          Remove
        </Button>
      </div>

      <div className="col-span-2">
        <Input
          label="School"
          placeholder="Ex: Oxford University"
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
          error={errors?.education?.[index]?.school?.message}
          {...register(`education.${index}.school`)}
        />
      </div>
      <Input
        label="Degree"
        placeholder="Ex: BSCS"
        className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
        error={errors?.education?.[index]?.degree?.message}
        {...register(`education.${index}.degree`)}
      />

      <Input
        label="Field Of Study"
        placeholder="Ex: Software Development"
        className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
        error={errors?.education?.[index]?.fieldOfStudy?.message}
        {...register(`education.${index}.fieldOfStudy`)}
      />

      <div className="col-span-4">
        <Controller
          name={`education.${index}.currentlyStudyingHere`}
          control={control}
          render={({ field }) => (
            <Checkbox
              label="I am currently studying here"
              isChecked={field.value}
              {...field}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <Typography className="col-span-2">Start Date*</Typography>
      <Typography className="col-span-2">End Date*</Typography>

      <SelectBox
        // @ts-ignore
        placeholder="Month"
        className="rounded-md dark:bg-woodsmoke-700"
        error={errors?.education?.[index]?.startMonth?.message}
        {...register(`education.${index}.startMonth`)}
      >
        <option value="">Start Month</option>
        {months.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </SelectBox>

      <SelectBox
        className="rounded-md dark:bg-woodsmoke-700"
        {...register(`education.${index}.startYear`)}
        error={errors?.education?.[index]?.startYear?.message}
      >
        <option value="">Start Year</option>

        {years.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </SelectBox>

      <SelectBox
        // @ts-ignore
        placeholder="Month"
        className="rounded-md dark:bg-woodsmoke-700"
        error={errors?.education?.[index]?.endMonth?.message}
        {...register(`education.${index}.endMonth`)}
        disabled={currentlyStudying}
      >
        <option value="">End Month</option>
        {months.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </SelectBox>

      <SelectBox
        className="rounded-md dark:bg-woodsmoke-700"
        {...register(`education.${index}.endYear`)}
        error={errors?.education?.[index]?.endYear?.message}
        disabled={currentlyStudying}
      >
        <option value="">End Year</option>

        {years.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </SelectBox>
    </div>
  );
};

function AddEducation() {
  const { fields, append, remove } = useFieldArray({
    name: "education",
  });

  return (
    <div>
      <Paper>
        {fields.length !== 0 ? (
          fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <EducationFields field={field} index={index} remove={remove} />

              <hr className="mt-12 mb-10 bg-black dark:bg-white opacity-20 h-[2px]" />
            </React.Fragment>
          ))
        ) : (
          <FieldMessage className="text-center max-w-[30rem] mx-auto w-full mt-0">
            Ready to showcase your education? Click {"'Add'"} to share details
            about your academic journey and achievements.
          </FieldMessage>
        )}

        <Button
          className={twMerge(
            "mt-8",
            fields.length === 0 ? "mt-6 mx-auto" : "ml-auto"
          )}
          onClick={() =>
            append({
              currentlyStudyingHere: true,
            })
          }
        >
          + Add {fields.length >= 1 ? "More" : "Education"}
        </Button>
      </Paper>
    </div>
  );
}

export default AddEducation;
