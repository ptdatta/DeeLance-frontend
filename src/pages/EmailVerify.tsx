import { Navigate, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Button from "components/Button";
import axios from "api/axios";
import { useToast } from "@/components/ui/use-toast";
import { FaRegCircleCheck } from "react-icons/fa6";
import Loader from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";

function EmailVerify() {
  const location = useLocation(); // Create a location variable
  const { toast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");
  const navigate = useNavigate();

  const { mutate: verifyEmail, isLoading: isVerifying } = useMutation({
    mutationFn: async () => {
      await axios.post("/email-verify", { token });
      toast({
        title: "Account verified succesfully",
        description: "Now you can login",
      });
      navigate(email ? `/login?email=${email}` : "/login");
    },
  });

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Verify your email address</h1>
      <p className="mb-6">
        {email ? (
          <>
            You have entered <span className="font-medium">{email}</span> as
            your email address for your account.{" "}
          </>
        ) : null}{" "}
        Please verify this email by clicking button below.
      </p>

      <Button
        onClick={() => {
          verifyEmail();
        }}
      >
        <span>Verify your email</span>
        <span className="ml-2.5 w-4 h-4">
          {isVerifying ? (
            <Loader.CircularSnake color="white" className="w-full h-full" />
          ) : (
            <FaRegCircleCheck className="w-full h-full" />
          )}
        </span>
      </Button>
    </div>
  );
}

export default EmailVerify;
