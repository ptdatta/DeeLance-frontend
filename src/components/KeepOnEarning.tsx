import { useState } from "react";
import axios from "axios";
import { FaChevronDown, FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { TbReportMoney } from "react-icons/tb";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Typography from "./Typography";
import Button from "./Button";
import TransitionWrapper from "./TransitionWrapper";
import BonusCongratulationPopup from "./BonusCongratulationPopup";
import { Dialog, DialogContent } from "./Dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

function Card({
  title,
  subtitle,
  onClaim,
  isClaimed,
}: {
  title: string;
  subtitle: string;
  onClaim: any;
  isClaimed?: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    setLoading(true);
    await onClaim();
    setLoading(false);
  };

  return (
    <div className="bg-woodsmoke-100 dark:bg-woodsmoke-950 rounded-md py-3 px-5 flex items-center justify-between">
      <div className="flex-1 me-4">
        <Typography
          variant="sm"
          className="text-green-haze-600 mb-1 font-medium"
        >
          {title}
        </Typography>
        <Typography variant="sm" className="text-black/80 dark:text-white/80">
          {subtitle}
        </Typography>
      </div>

      <Button
        size="sm"
        loading={loading}
        disabled={loading || isClaimed}
        onClick={onClick}
        className="px-0 max-w-[5rem] w-full"
      >
        {isClaimed ? "Claimed" : "Claim"}
      </Button>
    </div>
  );
}

function KeepOnEarning() {
  const { t } = useTranslation();

  // const [user, setUser] = useState(null);
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [completeProfilePopup, setCompleteProfilePopup] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { data: bonuses, isLoading } = useQuery({
    queryKey: ["user", "bonuses"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/bonuses");
      return res.data.data;
    },
  });

  const handleClaim = (bonusId: any) => {
    const token = localStorage.getItem("token");
    if (token && user) {
      axios
        .post(
          `${BASE_URL}/user/${user._id}/claim-bonus/${bonusId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setPopupOpen(true);
        })
        .catch(() => {
          setCompleteProfilePopup(true);
        });
    }
  };

  const handleClose = () => setPopupOpen(false);

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <Typography className="font-bold">{t("Keep on Earning!")}</Typography>

        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <FaInfoCircle className="text-xl text-green-haze-600" />
          </HoverCardTrigger>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <HoverCardContent
            side="top"
            sideOffset={10}
            className="flex space-x-2 w-auto max-w-[18rem]"
          >
            <TbReportMoney className="flex-shrink-0 text-4xl text-green-haze-500" />

            <div>
              <p>
                Complete tasks,{" "}
                <span className="text-green-haze-500 font-medium">
                  claim points
                </span>
                , and enjoy exclusive benefits here!
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="space-y-3">
        {bonuses?.map((bonus: any) => (
          <Card
            key={bonus._id}
            title={bonus.title}
            subtitle={`+ ${bonus.points} Points`}
            onClaim={() => handleClaim(bonus._id)}
            isClaimed={user && user.bonuses.includes(bonus._id)}
          />
        ))}
      </div>

      <button type="button" className="w-fit flex mx-auto mt-6 text-lg">
        <FaChevronDown />
      </button>

      <Dialog
        open={completeProfilePopup}
        onOpenChange={setCompleteProfilePopup}
      >
        <DialogContent className="sm:max-w-[26rem] p-8">
          <Typography variant="2xl" className="text-center">
            Your profile is not completed
          </Typography>

          <Button
            onClick={() => {
              navigate(`/profile/${user?._id}`);
              setCompleteProfilePopup(false);
            }}
            className="mt-6"
          >
            Complete your Profile
          </Button>
        </DialogContent>
      </Dialog>

      <TransitionWrapper
        open={isPopupOpen}
        className="max-w-[30rem] w-[90%] z-10"
      >
        <BonusCongratulationPopup handleClose={handleClose} />
      </TransitionWrapper>
    </div>
  );
}

export default KeepOnEarning;
