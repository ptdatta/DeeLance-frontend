import { BsPencilFill } from "react-icons/bs";
import Typography from "./Typography";

const EditableDetailBox = ({ title, children, onEditClick }: any) => {
  return (
    <div className="flex justify-between relative">
      <div className="flex-1">
        <Typography className="font-bold mb-1.5">{title}</Typography>
        {children}
      </div>

      <button
        onClick={onEditClick}
        className="w-8 h-8 rounded-full bg-green-haze-600 flex items-center justify-center text-woodsmoke-900 text-sm absolute top-6 rtl:left-6 ltr:right-6"
      >
        <BsPencilFill />
      </button>
    </div>
  );
};

export default EditableDetailBox;
