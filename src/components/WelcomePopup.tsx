import Button from "./Button";

export default function WelcomePopup({ isOpen, onClose, children }: any) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-woodsmoke-950 p-8 w-[36rem] rounded">
            <div className="flex justify-end">
              <button onClick={onClose}>
                {/* <FaTimes className="text-gray-500" /> */}
              </button>
            </div>
            <h2 className=" text-center text-3xl font-bold my-5 capitalize">
              Dive into the Deelance Alpha Adventure!
            </h2>
            <p className="text-base ">
              {" "}
              Embark on a journey with the Alpha launch of Deelance, where
              freelancing go to get paid! You're part of an exclusive group
              diving into our platform's initial phase of blockchain innovation!
              .
            </p>
            <p className=" py-2 text-base font-semibold">Important Heads-Up:</p>
            <p className="ml-4 text-sm pb-1">
              {" "}
              <strong>Alpha Stage Alert :</strong> Keep in mind that you're
              experiencing an Alpha version. Some features might be
              works-in-progress, and hiccups could pop up.
            </p>

            <p className="ml-4 text-sm pb-1">
              {" "}
              <strong>Your Thoughts are Invaluable :</strong> As you delve in,
              we treasure your feedback. It helps us refine and enhance what we
              offer to better meet your needs!
            </p>
            <h4 className="text-center py-2">
              Let us know about your user experience, flag any bugs, propose
              enhancements, or highlight what really stands out for you!
            </h4>
            <Button onClick={onClose} className="w-full space-x-[0.6em]">
              i Understand
            </Button>

            <h2 className="text-center py-2">
              Thank you for joining us on this groundbreaking journey!
            </h2>
            <p className=" text-xs text-center">
              Encountered an issue? We're here to help. Reach out to our support
              team at <br /> [support @deelance.com].
            </p>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
