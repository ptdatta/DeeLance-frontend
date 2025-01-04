import Paper from "components/Paper";
import Typography from "components/Typography";
import { useToast } from "components/ui/use-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { cn } from "utils/cn";
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
import { Grip } from "lucide-react";
import { twMerge } from "tailwind-merge";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "components/Loader";

function ImageCard({
  item,
  onDeleteClick,
  isEditMode,
}: {
  item: any;
  preview: string;
  onDeleteClick: (id: string) => void;
  isEditMode: boolean;
}) {
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
  const axiosPrivate = useAxiosPrivate();
  const { data: user } = useQuery<any>({
    queryKey: ["user"],
    enabled: false,
  });
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  const { isLoading: isDeleting, mutateAsync: deleteImageMutation } =
    useMutation({
      mutationFn: async () => {
        await axiosPrivate.delete(
          `/deleteImagetasks/${user._id}/${taskId}/images/${item.id}`
        );
      },
    });

  const deleteHandle = async () => {
    if (isEditMode) {
      await deleteImageMutation();
    }

    onDeleteClick(item.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={twMerge("aspect-[1.66/1] border-2 relative group bg-white")}
    >
      <img
        src={item.url || item.preview}
        className="absolute top-0 left-0 w-full h-full object-contain z-10"
        alt=""
      />

      {isDeleting ? (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 flex items-center justify-center">
          <Loader.CircularSnake className="h-10 w-10" />
        </div>
      ) : null}

      {isDeleting ? null : (
        <div
          className={twMerge(
            "bottom-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto -right-0.5 absolute border-2 flex items-center py-1.5 px-3 rounded-t space-x-2 border-b-0 bg-white",
            isDragging ? "pointer-events-auto opacity-100" : null
          )}
        >
          <button
            className="text-red-600 text-xl"
            type="button"
            onClick={deleteHandle}
          >
            <MdDelete />
          </button>

          <button
            {...attributes}
            {...listeners}
            type="button"
            className="cursor-grab"
          >
            <Grip className="w-5 h-5 opacity-70" />
          </button>
        </div>
      )}
    </div>
  );
}

function Gallery({ isEditMode }: { isEditMode: boolean }) {
  const { control, getValues } = useFormContext();
  const {
    fields: fieldsState,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "images",
  });
  const fields = isEditMode ? getValues("images") : fieldsState;

  const [items, setItems] = useState(fields);

  const updateFormFields = (updatedItems: any) => {
    updatedItems.forEach((item: any, index: number) => {
      update(index, item);
    });
  };

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems: any) => {
        const oldIndex = prevItems.findIndex(
          (data: { id: any }) => data.id === active.id
        );
        const newIndex = prevItems.findIndex(
          (data: { id: any }) => data.id === over.id
        );
        const newItems = arrayMove(prevItems, oldIndex, newIndex);
        updateFormFields(newItems);
        return newItems;
      });
    }
  }, []);

  const itemsId = useMemo(() => items.map((data: any) => data.id), [items]);

  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const sortedItems = [...items].sort((a, b) => a.sequence - b.sequence);

  useEffect(() => {
    setItems(fields); // Update items when fields change
  }, [fields]);
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noDrag: false,
    multiple: true,
    maxFiles: 3,
    noClick: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },

    onDropAccepted: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (acceptedFiles.length > 3) {
        toast({
          title: "More than 3 images are not allowed",
          description: "Please upload a maximum of 3 images only.",
          variant: "destructive",
        });
        return;
      }

      acceptedFiles.forEach((file, index) => {
        append({
          id: index.toString(),
          file,
          preview: URL.createObjectURL(file),
        });
      });
      setItems((prevItems: any) => [
        ...prevItems,
        ...acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        })),
      ]);
    },

    onDropRejected: () => {
      toast({
        title: "Invalid File Format",
        description:
          "Please upload a valid image file with one of the supported extensions: .png, .jpg, .jpeg, etc.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    return () => {
      if (files?.length > 0) {
        files.forEach((file) => URL.revokeObjectURL((file as any).preview));
      }
    };
  }, []);

  const deleteImage = async (id: any) => {
    remove(items.findIndex((item: any) => item.id === id));
    setItems((prevItems: any[]) =>
      prevItems.filter((item: any) => item.id !== id)
    );
  };

  return (
    <Paper>
      <header className="mb-10">
        <Typography variant="2xl" className="font-semibold mb-2.5">
          Showcase Your Services In A Gig Gallery
        </Typography>
        <Typography variant="sm" className="text-black/60 dark:text-white/60">
          Encourage buyers to choose your Gig by featuring a variety of your
          work.
        </Typography>
      </header>

      <main className="space-y-8">
        <div>
          <Typography variant="lg" className="font-medium mb-3">
            Images <span className="opacity-60 text-[.7em]">(Only 3)</span>
          </Typography>

          <div className="grid grid-cols-3 gap-6 max-w-[50rem] w-full">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={itemsId}>
                {sortedItems.map((data: any) => (
                  <ImageCard
                    key={data.id}
                    item={data}
                    preview={isEditMode ? data : (data as any).preview}
                    onDeleteClick={() => deleteImage(data.id || data._id)}
                    isEditMode={isEditMode}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {fieldsState?.length >= 3 ? null : (
              <div
                {...getRootProps({ className: "dropzone" })}
                className={cn(
                  "aspect-[1.66/1] border-2 border-gray-500 border-dashed transition-all duration-300 p-10 flex items-center justify-center",
                  isDragActive ? "border-green-500" : null
                )}
              >
                <p className="text-center text-sm">
                  <span className="opacity-70">Drag & drop a Photo or</span>{" "}
                  <button
                    type="button"
                    onClick={() => open()}
                    className="text-green-500 hover:underline"
                  >
                    Browse
                  </button>
                </p>

                <input {...getInputProps()} />
              </div>
            )}
          </div>
        </div>
      </main>
    </Paper>
  );
}
export default Gallery;
