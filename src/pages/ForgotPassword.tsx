import { useState } from "react";
import axios from "axios";
import Button from "components/Button";
import Typography from "components/Typography";
import Input from "components/Input";
import { BASE_URL } from "utils/constants";
import TextDivider from "components/TextDivider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required(),
});

function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const loading = isSubmitting;

  const onSubmit = (data: any) => {
    return new Promise((resolve) => {
      const resetEmail = async () => {
        try {
          await axios.post(`${BASE_URL}/forgot-password`, {
            email: data.email,
          });
          setMessage("Check your email! ");
          setEmailSent(true);
          resolve("");
        } catch (error: any) {
          if (error?.response?.data) {
            setError("email", { message: error.response.data });
          } else {
            setMessage("Error.. please try again!");
          }
          resolve("");
        }
      };

      resetEmail();
    });
  };

  return (
    <>
      <div>
        <Typography variant="2xl" className="mb-2 capitalize font-semibold">
          Trouble Loggin in?
        </Typography>

        <Typography className="mb-5 opacity-80">
          Enter your email and {"we'll"} send you a link to get back into your
          account.
        </Typography>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              type="email"
              placeholder="Enter Your Email"
              disabled={emailSent || loading}
              error={errors?.email?.message}
              {...register("email")}
            />
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={emailSent || loading}
              loading={loading}
            >
              {emailSent ? "Email Sent" : "Submit"}
            </Button>
          </form>
          {message && (
            <Typography className="text-black dark:text-white text-sm mt-4">
              {message}
            </Typography>
          )}
          {emailSent && (
            <div className="mt-4">
              <Typography className="py-2 font-bold">
                Click the link in your email to reset your password.
              </Typography>
              <Typography className="text-sm">
                If you have trouble finding your email, check your spam folder
                for an email from noreply@deelance.com
              </Typography>
            </div>
          )}
        </div>

        <TextDivider text="Or" className="my-5 opacity-60" />

        <Typography>
          Return to{" "}
          <Link to="/login" className="text-green-haze-600 underline">
            Login
          </Link>{" "}
          or{" "}
          <Link to="/signup" className="text-green-haze-600 underline">
            Create new Account
          </Link>
        </Typography>
      </div>
    </>
  );
}

export default ForgotPassword;
