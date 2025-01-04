/* eslint-disable react/require-default-props */
import { twMerge } from "tailwind-merge";

function UserProfileImage({
  className,
  avatar,
  username,
}: {
  className?: string;
  username: string;
  avatar: string;
}) {
  return avatar ? (
    <img
      src={avatar}
      className={twMerge("w-full h-full object-cover rounded-full", className)}
      alt=""
    />
  ) : (
    <div
      className={twMerge("w-full h-full rounded-full bg-green-200", className)}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-full opacity-80"
      >
        <text
          x="50%"
          y="52%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={30}
          className="font-roboto font-medium"
        >
          {username[0]}
        </text>
      </svg>
    </div>
  );
}

export default UserProfileImage;
