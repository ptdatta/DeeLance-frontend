import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import FormError from "components/FormError";
import Input from "components/Input";
import Paper from "components/Paper";
import Textarea from "components/Textarea";
import TiptapRichTextEditor from "components/TiptapRichTextEditor";
import Typography from "components/Typography";
import { Grip } from "lucide-react";
import { taskFaqSchema } from "pages/CreateTaskPage";
import { useEffect, useMemo, useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from "@dnd-kit/utilities";

function Form({
  register,
  onSubmitClick,
  submitText = "Add",
  onDeleteClick,
  errors,
  onCancelClick,
}: {
  register: any;
  errors: any;
  onSubmitClick: any;
  submitText?: string;
  onDeleteClick?: any;
  onCancelClick: any;
}) {
  return (
    <div className="space-y-4">
      <Input
        variant="outlined"
        {...register("question")}
        placeholder="Add a Question: Do you translate to English as well?"
        error={errors?.question?.message}
      />
      <Textarea
        variant="outlined"
        {...register("answer")}
        error={errors?.answer?.message}
        placeholder="Yes, I also translate from English to Hebrew."
      />

      <div className="flex items-center justify-between space-x-6">
        {onDeleteClick ? (
          <Button
            variant="simple"
            onClick={onDeleteClick}
            className="p-0 text-red-600"
          >
            Delete
          </Button>
        ) : (
          <span />
        )}

        <div className="flex items-center space-x-3">
          <Button size="sm" onClick={onCancelClick} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onSubmitClick} size="sm">
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Card({
  item,
  question,
  answer,
  onDeleteClick,
  onUpdate,
}: {
  item: any;
  question: string;
  answer: string;
  onDeleteClick: any;
  onUpdate: any;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(taskFaqSchema),
    defaultValues: {
      question,
      answer,
    },
  });

  const onSubmit = (data: any) => {
    onUpdate(data);
  };

  useEffect(() => {
    if (isOpen === false) {
      reset();
    }
  }, [isOpen]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      item,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  useEffect(() => {
    setIsOpen(false);
  }, [isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="[&>*]:px-6 relative border-2 border-black/20 rounded bg-stone-50"
    >
      <div className="flex space-x-5 h-14 items-center">
        <button
          type="button"
          className={twMerge("opacity-50 w-[1.6em] h-[1.6em] cursor-grab")}
          {...attributes}
          {...listeners}
        >
          <Grip className="w-full h-full" />
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-between h-full"
          onClick={() => setIsOpen((val) => !val)}
        >
          <span className="text-left text-lg font-semibold opacity-90">
            {question}
          </span>
          <FaChevronDown
            className={twMerge("opacity-50", isOpen ? "rotate-180" : null)}
          />
        </button>
      </div>

      {isOpen ? (
        <main className="pb-4">
          <Form
            errors={errors}
            register={register}
            onSubmitClick={handleSubmit(onSubmit)}
            onDeleteClick={onDeleteClick}
            submitText="Update"
            onCancelClick={() => {
              setIsOpen(false);
            }}
          />
        </main>
      ) : null}
    </div>
  );
}

function Faq() {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "faqs",
  });
  const [items, setItems] = useState(fields);
  const itemsId = useMemo(() => items.map((data) => data.id), [items]);
  const updateFormFields = (updatedItems: any) => {
    updatedItems.forEach((item: any, index: number) => {
      update(index, item);
    });
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex(
          (data: any) => data.id === active.id
        );
        const newIndex = prevItems.findIndex(
          (data: any) => data.id === over.id
        );
        const newItems = arrayMove(prevItems, oldIndex, newIndex);
        // Update the order of items in the form state as well
        updateFormFields(newItems);
        return newItems;
      });
    }
  }

  const [isWillingToAddFaq, setWillingToAddFaq] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(taskFaqSchema),
  });

  const onSubmit = (data: any) => {
    const updatedItems = [...items, data];
    setItems(updatedItems);
    console.log(updatedItems);
    append(data);
    console.log(data);
    reset();
    setWillingToAddFaq(false);
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const sortedItems = [...items].sort(
    (a, b) => (a as any).sequence - (b as any).sequence
  );
  useEffect(() => {
    setItems(fields); // Update items when fields change
  }, [fields]);

  return (
    <div>
      <header className="flex items-center justify-between">
        <main>
          <Typography variant="2xl" className="font-medium mb-2">
            Frequently Asked Questions
          </Typography>
          <Typography className="opacity-80">
            Add Questions & Answers for Your Buyers.
          </Typography>
        </main>

        {isWillingToAddFaq ? null : (
          <Button
            onClick={() => setWillingToAddFaq(true)}
            size="sm"
            variant="simple"
          >
            <FiPlus className="mr-2" />
            Add FAQ
          </Button>
        )}
      </header>

      <hr className="mt-5 mb-6 border-black/20" />

      {isWillingToAddFaq ? (
        <div className="mb-6">
          <Form
            errors={errors}
            register={register}
            onSubmitClick={handleSubmit(onSubmit)}
            onCancelClick={() => setWillingToAddFaq(false)}
          />
        </div>
      ) : null}

      {fields.length === 0 ? null : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          // eslint-disable-next-line react/jsx-no-bind
          onDragEnd={handleDragEnd}
        >
          <main className="space-y-4">
            <SortableContext items={itemsId}>
              {sortedItems.map((item, i: number) => (
                <Card
                  key={item.id}
                  item={item}
                  question={(item as any).question}
                  answer={(item as any).answer}
                  onDeleteClick={() => remove(i)}
                  onUpdate={(data: any) => update(i, data)}
                />
              ))}
            </SortableContext>
          </main>
        </DndContext>
      )}
    </div>
  );
}
function DescriptionAndRequirements() {
  const { control } = useFormContext();

  return (
    <Paper>
      <Typography variant="xl" className="font-medium mb-4">
        Description
      </Typography>

      <div className="mb-6">
        <div>
          <Controller
            control={control}
            name="packageDescription"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TiptapRichTextEditor onChange={onChange} value={value} />
                <FormError>{error?.message}</FormError>
              </>
            )}
          />
        </div>
      </div>

      <Faq />
    </Paper>
  );
}

export default DescriptionAndRequirements;
