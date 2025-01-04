import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Typography from "./Typography";
import AttachmentCard from "./AttachmentCard";
import prettyBytes from "pretty-bytes";

function FileSelector({ reset = false }) {
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (reset) {
      setUploadProgress(0);
    }
  }, [reset]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isFileDialogActive,
    open,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    // accept: {
    //   "image/*": [],
    // },
    multiple: true,
    // maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });

  const loading = isFileDialogActive || isFocused || isDragActive;

  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`flex justify-center items-center rounded bg-dark-blue relative border-2 border-dashed transition-all duration-200 z-10 group ${
          loading
            ? "border-green-haze-600 bg-green-haze-950"
            : "border-black/40 dark:border-white/40 bg-woodsmoke-200 dark:bg-woodsmoke-900"
        }`}
      >
        {uploadProgress < 100 && uploadProgress > 0 ? (
          <div className="flex justify-center m-10 absolute ">
            <p>loading</p>
          </div>
        ) : null}

        <div
          className={`px-10 w-full flex flex-col justify-center items-center z-10 transition-all duration-300 py-9`}
        >
          <input {...getInputProps()} />

          <img src="/images/upload-icon.svg" className="w-[3rem] mb-2" alt="" />

          <Typography className="mb-1 text-black/60 dark:text-white/60">
            Upload Projects here, or{" "}
            <button onClick={open} className="text-green-haze-600 underline">
              Browse
            </button>
          </Typography>
          <Typography className="text-black/60 dark:text-white/60">
            Attach files, Max size: 25MB
          </Typography>
        </div>
      </div>

      {acceptedFiles ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {acceptedFiles?.map((file: any) => (
            <AttachmentCard
              key={file.path}
              fileName={file.path}
              type={file.path.split(".").pop()}
              size={prettyBytes(file.size)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FileSelector;
