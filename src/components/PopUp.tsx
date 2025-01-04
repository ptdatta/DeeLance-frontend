import { FaTimes } from "react-icons/fa";

const PopUp = ({ isOpen, onClose, children }: any) => {
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
            <h2>Switch As</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
