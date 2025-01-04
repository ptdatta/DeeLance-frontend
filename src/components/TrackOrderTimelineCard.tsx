import { twMerge } from "tailwind-merge";
import Typography from "./Typography";

function TrackOrderTimelineCard({ title, active = false }: any) {
  return (
    <div className={`relative z-10 overflow-hidden`}>
      <div className="flex items-center space-x-3">
        <div
          className={twMerge(
            "w-7 h-7 rounded-full border-2 border-green-haze-600 bg-green-haze-600",
            active ? "bg-transparent" : null
          )}
        />

        <Typography
          variant="sm"
          className={twMerge(
            "text-black/60 dark:text-white/60",
            active ? "text-black dark:text-white" : null
          )}
        >
          {title}
        </Typography>
      </div>

      <div className="absolute top-7 left-[.87rem] w-[2px] h-full bg-green-haze-600 -z-10" />
    </div>
  );
}

export default TrackOrderTimelineCard;
