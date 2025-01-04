// @ts-nocheck

import { useContext } from "react";

import Typography from "components/Typography";
import CopyToClipboardButton from "components/CopyToClipboardButton";
import KeepOnEarning from "components/KeepOnEarning";
import VisibilityChanger from "components/VisibilityChanger";
import EditableMetaverseId from "components/EditableMetaverseId";
import Avatar from "components/Avatar";
import MyWallet from "components/MyWallet";

import { useTranslation } from "react-i18next";

import { AuthContext } from "Providers/AuthContextProvider";

const UserDetail = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-3">
        <Avatar
          avatar="/images/avatar.png"
          title={user ? user.FullName : "Login to let it work!"}
          subtitle={user ? user.title : "Login to let it work!"}
        />
        {/* <div>
          <Typography variant="xl" className="lh-1 mb-2">
            
          </Typography>
          <Typography
            variant="sm"
            className="text-black/60 dark:text-white/60 lh-1"
          >
            
          </Typography>
        </div> */}
      </div>
      {
        <Typography className="text-black dark:text-white">
          {t("Logged as")} Jobseeker
        </Typography>
      }
      {
        <div className="text-center flex items-center justify-evenly">
          <div>
            <Typography variant="xl" className="text-green-haze-600 font-bold">
              5
            </Typography>
            <Typography className="text-black/60 dark:text-white/60">
              {t("Followers")}
            </Typography>
          </div>
          <div>
            <Typography variant="xl" className="text-green-haze-600 font-bold">
              5
            </Typography>
            <Typography className="text-black/60 dark:text-white/60">
              {t("Following")}
            </Typography>
          </div>
          <div>
            <Typography variant="xl" className="text-green-haze-600 font-bold">
              {user?.points}
            </Typography>
            <Typography className="text-black/60 dark:text-white/60">
              {t("Points")}
            </Typography>
          </div>
        </div>
      }
    </div>
  );
};

const InviteFriends = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const currentDomain = window.location.origin;
  const inviteLink = `${currentDomain}/signup?referrer=${user?._id}`;
  return (
    <div>
      <Typography className="font-bold mb-7">
        {t("Invite friends, earn 100 points")}
      </Typography>

      {/* <div className="flex mb-4">
        <input
          type="text"
          name=""
          id=""
          className="flex-1 bg-transparent rounded bg-woodsmoke-100 dark:bg-woodsmoke-950 text-black dark:text-white px-5 me-4"
          placeholder={t("Invite by Email")}
        />
        <Button>{t("Invite")}</Button>
      </div> */}

      <Typography className="py-2 px-5 bg-woodsmoke-100 dark:bg-woodsmoke-950 rounded text-black/60 dark:text-white/60 overflow-hidden min-w-full text-ellipsis relative pr-14">
        <span className="z-10">{inviteLink}</span>

        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 flex">
          <CopyToClipboardButton className="text-xl" text={inviteLink} />
        </div>
      </Typography>
    </div>
  );
};

function UserDetailsBar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="[&>*]:shadow [&>*]:bg-white dark:[&>*]:bg-woodsmoke-900 [&>*]:rounded-lg [&>*]:p-6 space-y-4">
      <UserDetail points={user?.points} userId={user?._id} />
      <MyWallet />
      <InviteFriends />
      <KeepOnEarning />
      <VisibilityChanger />
      <EditableMetaverseId />
    </div>
  );
}

export default UserDetailsBar;
