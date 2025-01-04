import { twMerge } from "tailwind-merge";
import Typography from "./Typography";

function IconText({ icon, title, iconClassName, sizeVariant = "sm" }: any) {
  return (
    <div>
      <Typography
        variant={sizeVariant}
        className="text-black/80 dark:text-white/80 flex"
      >
        {icon ? (
          <div
            className={twMerge(
              "w-[1.6em] relative text-[1.3em] flex-shrink-0",
              iconClassName
            )}
          >
            {icon}
          </div>
        ) : null}

        <span className="flex-grow">{title}</span>
      </Typography>
    </div>
  );
}

export default IconText;
