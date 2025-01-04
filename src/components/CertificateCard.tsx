import { FaPencil } from "react-icons/fa6";
import { CertificateCardProps } from "types/certificate.types";
import { MdOutlineDeleteOutline, MdVerified } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import Typography from "./Typography";
import Button from "./Button";

// function WaitLoader() {
//   return <Loader.CircularSnake className="h-[40%] w-full" color="orangered" />;
// }

function CertificateCard({
  _id,
  issueBy,
  yearIssued,
  onEditClick,
  certificateName,
  onDeleteClick,
}: CertificateCardProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between space-x-6 group rounded-md transition-all duration-200"
      )}
    >
      <div className="flex items-center space-x-4 relative flex-1">
        <div className="w-24 h-24 flex items-center justify-center bg-woodsmoke-100 rounded-md relative">
          <MdVerified className="absolute -top-1 -right-1 text-2xl text-green-haze-600" />

          <img
            src="/images/logo-short.svg"
            className="w-[70%] h-[70%]"
            alt=""
          />
        </div>

        <div>
          <Typography variant="lg">{certificateName}</Typography>

          {issueBy ? (
            <Typography
              variant="base"
              className="mb-2 mt-3 text-black/50 dark:text-white/50 lh-1"
            >
              Provider: {issueBy}
            </Typography>
          ) : null}

          {yearIssued ? (
            <Typography
              variant="base"
              className="text-black/50 dark:text-white/50 lh-1"
            >
              Issued In: {yearIssued}
            </Typography>
          ) : null}
        </div>
      </div>

      {onEditClick ? (
        <div className="flex-shrink-0 hidden group-hover:flex items-center space-x-3">
          <Button
            onClick={() => onDeleteClick(_id)}
            variant="error-outlined"
            shape="icon"
            rounded="full"
          >
            <MdOutlineDeleteOutline className="text-[1.4em]" />
          </Button>

          <Button
            onClick={() =>
              onEditClick({
                _id,
                issueBy,
                yearIssued,
                certificateName,
              })
            }
            variant="outlined"
            shape="icon"
            rounded="full"
          >
            <FaPencil />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default CertificateCard;
