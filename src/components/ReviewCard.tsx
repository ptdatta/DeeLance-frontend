import Typography from "./Typography";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ name, review, ratingInNumber = 5, date }: any) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <Typography variant="xl" className="font-medium mb-2">
            {name || "Robert B."}
          </Typography>

          <Typography variant="sm" className="flex items-center space-x-1">
            {new Array(ratingInNumber).fill("").map((_, i) => (
              <FaStar key={i} className="text-green-haze-600" />
            ))}
            <span className="lh-1 opacity-50 pl-[.2em]">
              ({ratingInNumber})
            </span>
          </Typography>
        </div>

        <Typography variant="sm" className="opacity-60">
          {date || "Dec 7, 2022"}
        </Typography>
      </div>

      <Typography className="text-black/80 dark:text-white/80">
        {review ||
          "Lörem ipsum koras proräligt ore triktigt os. Möpp is emedan e-learning autos. Selig bimeter. On sagär. Teralig hexaska eurons samt ghosta. Husa gängen diheten, utom plador pneumaitet. Beson treräv filobel för funktionell dumhet lör. Paraning varähet i krost autonar nyngen. Tigt hyperfas och logostik. Nenenade gulören nyska, befos huruvida vär. ."}
      </Typography>
    </div>
  );
};

export default ReviewCard;
