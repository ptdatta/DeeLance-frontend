import { HiOutlinePencil } from "react-icons/hi";
import { useContext, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "Providers/AuthContextProvider";
import Loader from "./Loader";
import {
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./Dialog";
import Typography from "./Typography";
import Button from "./Button";
import { Slider } from "./Slider";
import { useToast } from "./ui/use-toast";
import UserProfileImage from "./UserProfileImage";

function AvatarUpload() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { isToken } = useContext(AuthContext);
  const user: any = queryClient.getQueryData(["user"]);
  const profile: any = queryClient.getQueryData(["profile", userId]);
  const isUser = isToken ? profile._id === user._id : false;
  const [files, setFiles] = useState<File[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<any>();
  const { toast } = useToast();
  const { refetch: refetchProfile } = useQuery({
    queryKey: ["profile", user._id],
    enabled: false,
  });

  const { mutate: upload, isLoading } = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const response = await axiosPrivate.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await refetchProfile();
      return response.data;
    },
    onSuccess: async () => {
      setFiles([]);
    },
    onError: () => {
      toast({
        title: "Failed to upload",
        description: "Please try again in sometime",
        variant: "destructive",
      });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: false,
    multiple: false,
    maxFiles: 1,
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

      setDialogOpen(true);
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
      if (files.length > 0) {
        files.forEach((file) => URL.revokeObjectURL((file as any).preview));
      }
    };
  }, [files]);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
      }}
    >
      <div className="relative flex-shrink-0 border-8 border-white rounded-full shadow-xl w-36 h-36 shadow-black/20">
        {isLoading || isUser === false ? null : (
          // eslint-disable-next-line react/button-has-type
          <button
            {...getRootProps({ className: "dropzone" })}
            className="absolute right-0 z-50 flex items-center justify-center w-8 h-8 bg-white border-2 rounded-full hover:bg-gray-200 top-1 border-black/60 text-black/60"
          >
            <HiOutlinePencil />
          </button>
        )}

        <input {...getInputProps()} />

        <UserProfileImage
          avatar={profile.avatar}
          username={profile?.UserName}
        />

        {isLoading ? (
          <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full rounded-full bg-black/80">
            <Loader.CircularSnake className="h-[40%] w-full" />
          </div>
        ) : null}
      </div>

      {isUser ? (
        <DialogContent className="sm:max-w-[20rem] p-0">
          <DialogHeader
            variant="bordered"
            className="flex flex-row items-center justify-between px-8 py-4 space-y-0"
          >
            <Typography variant="xl">Crop Image</Typography>

            <DialogCloseIcon />
          </DialogHeader>

          <main className="p-6">
            <AvatarEditor
              ref={editorRef}
              image={files.length > 0 ? (files[0] as any).preview : user.avatar}
              className="!w-full mx-auto !h-auto !max-w-none bg-transparent"
              color={[0, 0, 0, 0.4]} // RGBA
              border={20}
              scale={scale}
              borderRadius={100}
              rotate={0}
              crossOrigin="anonymous"
            />

            <div className="flex items-center mt-5 space-x-4">
              <Slider
                defaultValue={[scale]}
                max={2}
                min={0.2}
                step={0.1}
                className="flex-1"
                onValueChange={(value) => {
                  setScale(value[0]);
                }}
              />

              <p className="font-bold opacity-80">{scale}</p>
            </div>
          </main>

          <DialogFooter
            variant="bordered"
            className="flex items-center justify-end px-8 space-x-3"
          >
            <DialogClose asChild>
              <Button variant="outlined" size="sm">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="button"
              size="sm"
              onClick={() => {
                const originalImage = files[0];
                const canvas = editorRef?.current?.getImage();

                canvas.toBlob(
                  (blob: any) => {
                    const file = new File([blob], (originalImage as any).name, {
                      type: (originalImage as any).type,
                    });

                    const fileObj = file;
                    Object.assign(fileObj, {
                      preview: URL.createObjectURL(file),
                    });
                    Object.assign(fileObj, {
                      path: (originalImage as any).path,
                    });

                    const formData = new FormData();
                    formData.append("avatar", fileObj);

                    upload({ formData });
                    setDialogOpen(false);
                    setScale(1);
                  },
                  (originalImage as any).type
                );
              }}
            >
              Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default AvatarUpload;
