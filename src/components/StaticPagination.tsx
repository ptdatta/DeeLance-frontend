import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

const PaginationButton = ({ active, children, className, ...props }: any) => {
  return (
    <Button
      {...props}
      variant="simple"
      className={twMerge(
        `h-8 w-8 p-0 rounded text-black dark:text-white text-sm ${
          active
            ? "bg-green-haze-600"
            : "bg-woodsmoke-200 dark:bg-woodsmoke-900 hover:bg-woodsmoke-400 dark:hover:bg-woodsmoke-700"
        }`,
        className
      )}
    >
      {children}
    </Button>
  );
};

function StaticPagination() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center [&>*:not(:last-child)]:me-1">
      <PaginationButton className="rtl:rotate-180">
        <FaChevronLeft />
      </PaginationButton>

      <PaginationButton active>{t("1")}</PaginationButton>
      <PaginationButton>{t("2")}</PaginationButton>
      <PaginationButton>{t("3")}</PaginationButton>
      <PaginationButton>{t("...")}</PaginationButton>
      <PaginationButton>{t("20")}</PaginationButton>

      <PaginationButton className="rtl:rotate-180">
        <FaChevronRight />
      </PaginationButton>
    </div>
  );
}

export default StaticPagination;
