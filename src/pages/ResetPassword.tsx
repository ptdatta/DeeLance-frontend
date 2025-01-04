import { useState } from "react";
import axios from "axios";
import Button from "components/Button";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";
import Input from "components/Input";
import { BASE_URL } from "utils/constants";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/reset-password/${token}`, { password });
      setMessage("Your password has been reset successfully!");
      setIsSuccessful(true);
    } catch (error) {
      setMessage(
        "Failed to reset password. Please try again or contact support."
      );
    }
  };

  return (
    <>
      <PageLayout>
        <section>
          <div className="container-wrapper">
            <div className="flex justify-center items-center">
              <div className="bg-white dark:bg-[#2C2C32] max-w-xl mx-auto rounded-xl py-8 px-10">
                <div className="text-center">
                  <Typography className="text-green-haze-700 text-2xl p-4 pb-1 font-bold capitalize">
                    Reset Your Password
                  </Typography>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSuccessful}
                    />
                    <Button
                      type="submit"
                      className="w-full mt-6"
                      disabled={isSuccessful}
                    >
                      Reset Password
                    </Button>
                  </form>
                  {message && (
                    <Typography className="text-black dark:text-white text-sm pt-4">
                      {message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

export default ResetPassword;
