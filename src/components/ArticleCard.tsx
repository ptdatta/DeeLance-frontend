import { FaChevronRight } from "react-icons/fa";
import Typography from "./Typography";

function ArticleCard() {
  return (
    <div className="w-full rounded-xl p-6 bg-woodsmoke-300 dark:bg-woodsmoke-700">
      <div className="aspect-video rounded-xl bg-black mb-4" />

      <Typography
        variant="xl"
        className="font-medium text-woodsmoke-900 dark:text-white mb-4 max-lg:text-lg"
      >
        Blockchain Security: Safeguarding Your Digital Assets
      </Typography>

      <a
        href="/"
        className="flex items-center space-x-2 dark:text-green-haze-500 text-green-haze-800"
      >
        <span>Read More</span>{" "}
        <FaChevronRight className="inline-block lh-1 text-[.9em]" />
      </a>
    </div>
  );
}

export default ArticleCard;
