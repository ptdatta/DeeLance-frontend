import Button from "./Button";
import Typography from "./Typography";
import { BsKey, BsPencilFill } from "react-icons/bs";
import CopyToClipboardButton from "./CopyToClipboardButton";
import KeepOnEarning from "./KeepOnEarning";
import Avatar from "./Avatar";

const UserDetail = () => {
  return (
    <div className="space-y-5 bg-woodsmoke-50 dark:bg-woodsmoke-950 ">
      <div className="flex items-center space-x-3 ">
        <Avatar avatar="/images/avatar.png" />
        <div>
          <Typography variant="xl" className="lh-1 mb-2">
            John Doe
          </Typography>
          <Typography variant="sm" className="text-black dark:text-white lh-1">
            UI/UX Designer
            <br />
            Logged in as Employer
          </Typography>
        </div>
      </div>

      <div className="text-center flex items-center justify-evenly">
        <div>
          <Typography variant="xl" className="text-green-haze-600 font-bold">
            10
          </Typography>
          <Typography className="text-black dark:text-white/60">
            Followers
          </Typography>
        </div>
        <div>
          <Typography variant="xl" className="text-green-haze-600 font-bold">
            4
          </Typography>
          <Typography className="text-black dark:text-white/60">
            Following
          </Typography>
        </div>
        <div>
          <Typography variant="xl" className="text-green-haze-600 font-bold">
            100
          </Typography>
          <Typography className="text-black dark:text-white/60">
            Points
          </Typography>
        </div>
      </div>

      <Button className="w-full" variant="contained-2">
        <a href="/employerprofiles"> View Your Profile</a>
      </Button>
    </div>
  );
};

const MyWallet = () => {
  return (
    <div>
      <Typography className="font-bold mb-7">My Wallet</Typography>

      <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center mb-5">
        <div>
          <BsKey className="text-3xl flex" />
        </div>
        <Typography
          variant="sm"
          className="text-black dark:text-white/60 bg-woodsmoke-200 dark:bg-woodsmoke-700 py-1 px-2 rounded-lg text-ellipsis w-full min-w-full overflow-hidden"
        >
          0x8EF188Fc03f25eA19e2a48167d3420x8EF188Fc03f25eA19e2a48167d342
        </Typography>

        <CopyToClipboardButton
          className="flex text-xl justify-end"
          text="0x8EF188Fc03f25eA19e2a48167d3420x8EF188Fc03f25eA19e2a48167d342"
        />
      </div>

      <div className=" bg-woodsmoke-50 dark:bg-woodsmoke-950 rounded-md py-2 px-4 grid grid-cols-2 justify-between gap-y-2 mb-6">
        <Typography>$ETH Price:</Typography>
        <Typography className="text-right text-stone-950 dark:text-white/60">
          = $1322.63 USD
        </Typography>

        <Typography>Your $ETH:</Typography>
        <Typography className="text-right text-stone-950 dark:text-white/60">
          0.000000
        </Typography>
      </div>

      {/* <Button
        className="w-fit flex mx-auto p-0 h-auto text-green-haze-600"
        variant="simple"
      >
        Disconnect your wallet
      </Button> */}
    </div>
  );
};

const InviteFriends = () => {
  return (
    <div>
      <Typography className="font-bold mb-7">
        Invite friends, Earn 10 Coins
      </Typography>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          name=""
          id=""
          className="flex-1 bg-transparent rounded bg-w  dark:bg-woodsmoke-950 text-white px-5"
          placeholder="Invite by Email"
        />
        <Button>Invite</Button>
      </div>

      <Typography className="py-2 px-5 bg-woodsmoke-200 dark:bg-woodsmoke-950 rounded text-black dark:text-white/60 overflow-hidden min-w-full text-ellipsis relative pr-14">
        <span className="z-10">https://www.Deelance.com/freelancer</span>

        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 flex">
          <CopyToClipboardButton
            className="text-xl"
            text="https://www.Deelance.com/freelancer"
          />
        </div>
      </Typography>
    </div>
  );
};

const EditableDetail = ({ title, subtitle }: any) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Typography className="font-bold mb-1.5">{title}</Typography>
        <Typography variant="sm" className="text-white/80">
          {subtitle}
        </Typography>
      </div>

      <button className="w-8 h-8 rounded-full bg-green-haze-600 flex items-center justify-center text-woodsmoke-900 text-sm">
        <BsPencilFill />
      </button>
    </div>
  );
};

function EmployerUserDetailsBar() {
  return (
    <div className="dark:bg-woodsmoke-900 bg-woodsmoke-50 rounded-lg p-6 space-y-4">
      <UserDetail />
      <MyWallet />
      <InviteFriends />
      <KeepOnEarning />
      <EditableDetail title="KYC" subtitle=" Verified" />
      <EditableDetail title="Profile Visibility" subtitle="Public" />

      <EditableDetail
        title="Metaverse ID"
        subtitle="HYSGDGUDJKDL&3638JMXHD39"
      />
    </div>
  );
}

export default EmployerUserDetailsBar;
