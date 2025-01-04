import Input from "components/Input";
import Paper from "components/Paper";
import SelectBox from "components/SelectBox";
import { categories, subcategories } from "utils/constants";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Button from "components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CREATE_TASK_TITLE_PREFIX,
  taskKeywordSchema,
} from "pages/CreateTaskPage";
import * as yup from "yup";
import FormError from "components/FormError";
import Pill from "components/Pill";
import { IoClose } from "react-icons/io5";
import Textarea from "components/Textarea";
import Typography from "components/Typography";
import { useEffect, useState } from "react";

function Overview() {
  const {
    register,
    formState: { errors },
    watch,
    control,
    trigger,
  } = useFormContext();
  const keywordFormMethods = useForm({
    resolver: yupResolver(yup.object({ keyword: taskKeywordSchema })),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  const onKeywordSubmit = (data: any) => {
    append({
      value: true,
      title: data.keyword,
    });
    keywordFormMethods.setValue("keyword", "");
  };

  const [prevScrollTop, setPrevScrollTop] = useState<number>(0);

  useEffect(() => {
    const textarea: HTMLTextAreaElement | null =
      document.querySelector(".custom-textarea");

    const handleTextareaScroll = () => {
      const scrollTop = textarea?.scrollTop ?? 0;

      // Calculate the difference in scrollTop
      const scrollDiff = scrollTop - prevScrollTop;

      // Adjust the position of the span element
      const spanElement = document.querySelector(
        ".custom-span"
      ) as HTMLSpanElement;
      if (spanElement) {
        spanElement.style.top = `${parseFloat(spanElement.style.top || "17") - scrollDiff}px`;
      }

      // Update prevScrollTop
      setPrevScrollTop(scrollTop);
    };

    if (textarea) {
      textarea.addEventListener("scroll", handleTextareaScroll);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("scroll", handleTextareaScroll);
      }
    };
  }, [prevScrollTop]);
  return (
    <Paper>
      <header className="space-y-5 pb-6 border-b-1 border-b-white-40 mb-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Typography>Task Title</Typography>
            <Typography variant="sm" className="opacity-60 font-medium">
              {watch("title")?.length || 0}/80 max
            </Typography>
          </div>
          <div className="text-lg relative overflow-hidden">
            <span
              className={`absolute top-[1.07rem] left-5 font-medium opacity-80 lh-1 custom-span`}
            >
              {CREATE_TASK_TITLE_PREFIX.trim()}
            </span>
            <Textarea
              {...register("title")}
              variant="outlined"
              required
              placeholder="Build your custom responsive website"
              className="resize-none font-medium indent-11 custom-textarea"
              error={errors?.title?.message}
              maxLength={80}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SelectBox
            label="Category"
            variant="outlined"
            {...register("category")}
            error={errors?.category?.message}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </SelectBox>

          <SelectBox
            label="Subcategory"
            variant="outlined"
            {...register("subCategory")}
            error={errors?.subCategory?.message}
            disabled={!watch("category")}
          >
            <option value="">
              Select Sub Category{" "}
              {watch("category") ? `in ${watch("category")}` : null}
            </option>
            {watch("category")
              ? (subcategories as any)[watch("category")]?.map((cat: any) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))
              : null}
          </SelectBox>
        </div>

        <div>
          <p className="inline-block mb-2">Keywords</p>

          <div className="mb-6">
            <div className="flex space-x-4">
              <Input
                variant="outlined"
                className="flex-1"
                showErrorText={false}
                placeholder="Write skill to add"
                {...keywordFormMethods.register("keyword")}
                error={keywordFormMethods.formState.errors.keyword?.message}
              />
              <Button
                shape="icon"
                type="button"
                className="flex-shrink-0 w-12 h-auto"
                onClick={() => {
                  keywordFormMethods.handleSubmit(onKeywordSubmit)();
                  trigger("keywords");
                }}
              >
                <FaPlus />
              </Button>
            </div>

            <FormError>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              {keywordFormMethods.formState.errors.keyword?.message}
            </FormError>
          </div>

          {fields.length > 0 ? (
            <div className="overflow-hidden">
              <div className="flex flex-wrap [&>*]:m-1 -m-1">
                {fields.map((field: any, index) => (
                  <Pill
                    as="button"
                    type="button"
                    className="text-sm flex space-x-2 whitespace-nowrap items-center group border border-black/20"
                    key={field.id}
                    onClick={() => {
                      remove(index);
                      trigger("keywords");
                    }}
                    tabIndex={-1}
                  >
                    <span>{field.title}</span>
                    <IoClose className="opacity-50 group-hover:opacity-100" />
                  </Pill>
                ))}
              </div>
            </div>
          ) : null}

          <FormError className="mt-4">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {errors?.keywords?.message}
          </FormError>
        </div>
      </header>

      {/* <Typography variant="xl" className="font-medium mb-5">
          Project attributes
        </Typography>

        <div className="mb-7">
          <TabBar>
            <TabButton>Website Type</TabButton>
            <TabButton>Tool</TabButton>
          </TabBar>
        </div>

        <div className="grid grid-cols-4 gap-y-4 gap-x-6 mb-7">
          {new Array(24).fill("").map((_, i) => (
            <Checkbox key={i} label="Project attributes" />
          ))}
        </div>

        <Typography variant="sm" className="opacity-60 mt-1">
          (max. 5 tags)
        </Typography> */}
    </Paper>
  );
}

export default Overview;
