import { MdHourglassTop } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";

function Coomingsoon({ isOpen, onClose }: any) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-woodsmoke-950 p-8 w-96 rounded">
            <div className="flex justify-end">
              <button onClick={onClose}>
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <div className=" text-center">
              <MdHourglassTop className=" text-green-600 text-6xl mx-auto mb-6" />
              <h1 className=" pb-2 text-2xl font-bold">Coming Soon</h1>
              <p className="pb-2 text-sm font-normal">
                Still Under Development,Please Wait For a While
              </p>
              <Button onClick={onClose} className="w-full">
                I, Understand
              </Button>
              <span className=" text-xs">
                Any Query Mail Us On Support@deelance.com
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Coomingsoon;
