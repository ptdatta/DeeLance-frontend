import { twMerge } from "tailwind-merge";
import Button from "./Button";
import Typography from "./Typography";
import { HiOutlineDownload } from "react-icons/hi";

function AttachmentCard({
  type = "xls",
  fileName,
  size,
  className,
  downloadIcon,
}: any) {
  return (
    <div
      className={twMerge(
        "bg-woodsmoke-200 dark:bg-woodsmoke-900 p-5 rounded-md flex items-center justify-between space-x-8",
        className
      )}
    >
      <div className="flex items-center space-x-2 flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <img
            src={`/images/file-icons/${type}.png`}
            className="w-[3rem]"
            alt=""
          />
        </div>
        <div className="overflow-hidden">
          <Typography
            variant="sm"
            className="mb-1 whitespace-nowrap break-keep text-ellipsis overflow-hidden"
          >
            {fileName}
          </Typography>
          <Typography variant="xs" className="text-black/60 dark:text-white/60">
            {size}
          </Typography>
        </div>
      </div>

      {downloadIcon ? (
        <Button size="lg" variant="simple" className="h-auto px-0">
          <HiOutlineDownload />
        </Button>
      ) : (
        <Button variant="simple" size="sm" className="simple p-0 h-auto">
          Download
        </Button>
      )}
    </div>
  );
}

export default AttachmentCard;
