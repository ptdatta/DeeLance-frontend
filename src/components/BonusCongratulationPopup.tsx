import Button from "./Button";
import Typography from "./Typography";

function BonusCongratulationPopup({ handleClose }: any) {
  return (
    <div className="pt-10 pb-8 px-6 bg-green-haze-100 z-10 relative rounded-xl border-[6px] border-green-haze-400 shadow-2xl shadow-green-haze-600 text-black">
      <img
        src="/images/particles.png"
        className="absolute top-0 left-0 w-full h-full -z-10 object-cover opacity-50"
        alt=""
      />

      <img
        src="/images/treasure.png"
        className="w-full max-w-[12rem] mx-auto mb-4 mt-[-10rem]"
        alt=""
      />

      <Typography variant="2xl" className="text-center font-bold mb-2">
        Congratulations
      </Typography>
      <Typography variant="xl" className="text-center mb-7">
        You have successfully claimed bonus
      </Typography>

      <div className="flex items-center justify-center space-x-4">
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default BonusCongratulationPopup;
