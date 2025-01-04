/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as libraryDayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const dayjs = libraryDayjs.extend(relativeTime);

const formatLastActive = (dateString: string) => {
  // @ts-ignore
  const now = dayjs();
  // @ts-ignore
  const lastActive = dayjs(dateString);
  const diffMinutes = now.diff(lastActive, "minute");
  const diffHours = now.diff(lastActive, "hour");
  const diffDays = now.diff(lastActive, "day");

  if (diffMinutes < 60) {
    return `${diffMinutes} m`;
  }
  if (diffHours < 24) {
    return `${diffHours} hr`;
  }
  return `${diffDays} ${diffDays > 1 ? "days" : "day"}`;
};

export { dayjs, formatLastActive };
