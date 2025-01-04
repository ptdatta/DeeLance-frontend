import { useTranslation } from "react-i18next";
import { cn } from "utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "Providers/AuthContextProvider";
import Typography from "./Typography";
import CopyToClipboardButton from "./CopyToClipboardButton";
import VisibilityChanger from "./VisibilityChanger";
import EditableMetaverseId from "./EditableMetaverseId";
import MyWallet from "./MyWallet";
import ProfileProgress from "./ProfileProgress";

function InviteFriends() {
  const { t } = useTranslation();
  const { data: user } = useQuery<any>({ queryKey: ["user"] });
  const currentDomain = window.location.origin;
  const inviteLink = `${currentDomain}/signup?referrer=${user?._id}`;

  return (
    <div>
      <Typography className="font-bold mb-7">
        {t("Invite friends, earn 100 points")}
      </Typography>

      <Typography className="relative min-w-full px-5 py-2 overflow-hidden rounded bg-woodsmoke-100 dark:bg-woodsmoke-950 text-black/60 dark:text-white/60 text-ellipsis pr-14">
        <span className="z-10 break-all">{inviteLink}</span>

        <div className="absolute z-20 flex -translate-y-1/2 top-1/2 right-4">
          <CopyToClipboardButton className="text-xl" text={inviteLink} />
        </div>
      </Typography>
    </div>
  );
}

function UserDetailsBar({ className }: { className?: string }) {
  const { userId } = useParams();
  const { data: user } = useQuery<any>({ queryKey: ["user"] });
  const { data: profile } = useQuery<any>({ queryKey: ["profile", userId] });
  const { isToken } = useContext(AuthContext);
  const isUser = isToken ? profile?._id === user?._id : false;

  return (
    <div
      className={cn(
        "[&>*]:shadow [&>*]:bg-white dark:[&>*]:bg-woodsmoke-900 [&>*]:rounded-lg [&>*]:p-6 space-y-4",
        className
      )}
    >
      {isUser ? <ProfileProgress /> : null}
      <MyWallet />
      <InviteFriends />
      {/* <KeepOnEarning /> */}
      <VisibilityChanger />
      <EditableMetaverseId />
    </div>
  );
}

export default UserDetailsBar;
