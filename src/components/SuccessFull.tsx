import { FaCheckCircle } from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";

function SuccessFull({ isOpen }: any) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-woodsmoke-950 p-8 w-96 rounded">
            <div className="flex justify-end">
              {/* <button onClick={onClose}>
              <FaTimes className="text-gray-500" />
            </button> */}
            </div>

            <div className=" text-center">
              <FaCheckCircle className=" text-green-600 text-6xl mx-auto mb-6" />
              <h1 className=" pb-2 text-2xl font-bold">
                Registered Successfully
              </h1>
              <p className="pb-2 text-sm font-normal">
                Check your email to verify your account
              </p>
              <Button asChild>
                <Link to="/login">OK</Link>
              </Button>
              <span className=" text-xs">After get verified please login</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SuccessFull;
