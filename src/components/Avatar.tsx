import { twMerge } from "tailwind-merge";
import pxToEm from "utils/pxToEm";

interface Props {
  title?: string;
  subtitle?: string;
  className?: string;
  avatar?: string | null;
  size?: number;
}

function Avatar({ title, subtitle, className, avatar, size = 44 }: Props) {
  const avatarSize = {
    width: pxToEm(size),
    height: pxToEm(size),
  };

  return (
    <div
      className={twMerge(
        "flex items-center [&>*:not(:last-child)]:me-[.75em]",
        className
      )}
    >
      <div style={avatarSize} className="rounded-full bg-black flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            className="w-full h-full object-cover rounded-full flex"
            alt="Avatar"
          />
        ) : null}
      </div>

      {title || subtitle ? (
        <div className="flex-1 overflow-hidden">
          {title ? <p className="text-[1em]">{title}</p> : null}

          {subtitle ? (
            <p className="text-[0.875em] text-black/60 dark:text-white/60 whitespace-nowrap">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
