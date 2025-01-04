import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Input from "components/Input";
import Paper from "components/Paper";
import Typography from "components/Typography";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import SelectBox from "components/SelectBox.jsx";
import { years, months, countries } from "utils/constants";
import { IoClose } from "react-icons/io5";
import React, { useEffect } from "react";
import { FieldMessage } from "pages/SetProfilePage";
import { twMerge } from "tailwind-merge";

const ExperienceFormFields = ({ field, index, remove }: any) => {
  const {
    control,
    watch,
    register,
    formState: { errors: formErrors },
    setValue,
  } = useFormContext();
  const errors: any = formErrors;

  const currentlyWorking = watch(`experience.${index}.currentlyWorkingHere`);

  useEffect(() => {
    if (currentlyWorking) {
      setValue(`experience.${index}.endDate`, "");
      setValue(`experience.${index}.endYear`, "");
    }
  }, [currentlyWorking]);

  return (
    <main key={field.id} className="grid grid-cols-4 gap-6 items-start">
      <div className="col-span-4 flex items-center justify-between">
        <Typography variant="2xl" className="font-bold">
          Experience {index + 1}
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

      <div className="col-span-4">
        <Input
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
          label="Title*"
          placeholder="Ex: Software Engineer"
          error={errors?.experience?.[index]?.title?.message}
          {...register(`experience.${index}.title`)}
        />
      </div>

      <div className="col-span-2">
        <Input
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
          label="Company*"
          placeholder="Ex: Microsoft"
          error={errors?.experience?.[index]?.companyName?.message}
          {...register(`experience.${index}.companyName`)}
        />
      </div>

      <div className="col-span-2">
        {/* <Select
          placeholder="Select Location"
          label="Company Location"
          error={errors?.experience?.[index]?.location?.message}
          {...register(`experience.${index}.location`)}
          options={countries}
        /> */}

        <SelectBox
          label="Company Location"
          className="rounded-md dark:bg-woodsmoke-700"
          error={errors?.experience?.[index]?.location?.message}
          {...register(`experience.${index}.location`)}
        >
          <option value="">Select Country</option>

          {countries.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </SelectBox>
      </div>

      <div className="col-span-2">
        <SelectBox
          label="Employment type"
          className="dark:bg-woodsmoke-700 rounded-md"
          error={errors?.experience?.[index]?.employementType?.message}
          {...register(`experience.${index}.employementType`)}
        >
          <option value="">Please select</option>

          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Freelance">Freelance</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Apprenticeship">Apprenticeship</option>
          <option value="Seasonal">Seasonal</option>
        </SelectBox>
      </div>

      <div className="col-span-2">
        <SelectBox
          label="Location type"
          className="dark:bg-woodsmoke-700 rounded-md"
          error={errors?.experience?.[index]?.locationType?.message}
          {...register(`experience.${index}.locationType`)}
        >
          <option value="">Please select</option>

          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </SelectBox>
      </div>

      <div className="col-span-4">
        {/* <Checkbox
        label="I am currently working in this role."
        error={
          errors?.experience?.[index]?.currentlyWorkingHere?.message
        }
        {...register(`experience.${index}.currentlyWorkingHere`)}
      /> */}

        <Controller
          name={`experience.${index}.currentlyWorkingHere`}
          control={control}
          render={({ field: _field }) => (
            <Checkbox
              label="I am currently working in this role"
              isChecked={_field.value}
              {..._field}
              onChange={_field.onChange}
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
        error={errors?.experience?.[index]?.startDate?.message}
        {...register(`experience.${index}.startDate`)}
      >
        <option value="">Month</option>
        {months.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </SelectBox>

      <SelectBox
        className="rounded-md dark:bg-woodsmoke-700"
        {...register(`experience.${index}.startYear`)}
        error={errors?.experience?.[index]?.startYear?.message}
      >
        <option value="">Year</option>

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
        error={errors?.experience?.[index]?.endDate?.message}
        disabled={watch(`experience.${index}.currentlyWorkingHere`)}
        {...register(`experience.${index}.endDate`)}
      >
        <option value="">Month</option>
        {months.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </SelectBox>

      <SelectBox
        className="rounded-md dark:bg-woodsmoke-700"
        {...register(`experience.${index}.endYear`)}
        // error={errors?.endYear?.message}
        error={errors?.experience?.[index]?.endYear?.message}
        disabled={watch(`experience.${index}.currentlyWorkingHere`)}
      >
        <option value="">Year</option>

        {years.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </SelectBox>
      {/* <Input
      placeholder="Year"
      type="number"
      min="1932"
      max="2024"
      step="1"
      error={errors?.experience?.[index]?.endYear?.message}
      {...register(`experience.${index}.endYear`, {
        valueAsNumber: true,
      })}
    /> */}

      {/* <div className="col-span-4">
        <Textarea
          label="Description"
          placeholder="Enter description"
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
        />
      </div> */}
    </main>
  );
};

function AddExperience() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div>
      <Paper className="space-y-8">
        {fields.length !== 0 ? (
          fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <ExperienceFormFields
                field={field}
                index={index}
                remove={remove}
              />
              <hr className="mt-12 mb-10 bg-black dark:bg-white opacity-20 h-[2px]" />
            </React.Fragment>
          ))
        ) : (
          <FieldMessage className="text-center max-w-[30rem] mx-auto w-full mt-0">
            Ready to highlight your professional journey? Click {"'Add'"} to
            share details about your work experience and accomplishments.
          </FieldMessage>
        )}

        <Button
          onClick={() => append({ currentlyWorkingHere: true })}
          className={twMerge(
            "mt-8 block w-fit",
            fields.length === 0 ? "mt-6 mx-auto" : "ml-auto"
          )}
        >
          + Add {fields.length >= 1 ? "More" : "Experince"}
        </Button>
      </Paper>
    </div>
  );
}

export default AddExperience;
