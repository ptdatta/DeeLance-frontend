import { useContext, useEffect, useState } from "react";
import Button from "components/Button";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Input from "components/Input";
import Typography from "components/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "Providers/AuthContextProvider";
import PasswordInput from "components/PasswordInput";
import FormLabel from "components/FormLabel";
import FormError from "components/FormError";

interface FormType {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required(),
    password: yup.string().required("Required"),
  })
  .required();

function LoginPage() {
  const location = useLocation(); // Create a location variable
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [error, setError] = useState("");
  const { login, isToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: { email: email || "" },
  });
  const loading = isSubmitting;

  const onSubmit = (data: FormType) => {
    return new Promise((resolve) => {
      login(data.email, data.password)
        .then(() => {
          resolve("Succefully logged in");
          navigate("/dashboard");
        })
        .catch((err: any) => {
          setError(err);
          resolve("LOGIN ERROR");
        });
    });
  };

  useEffect(() => {
    if (isToken) {
      navigate("/");
    }
  }, [isToken]);

  return (
    <>
      <div>
        {error && (
          <div className="p-3 mb-5 text-white bg-red-500 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            placeholder="Enter Your Email"
            disabled={loading}
            error={errors.email?.message}
            autoComplete="false"
            {...register("email")}
          />

          <div className="space-y-2">
            <div>
              <FormLabel>Password</FormLabel>

              <PasswordInput
                placeholder="Enter Your Password"
                disabled={loading}
                error={errors.password?.message}
                showErrorText={false}
                {...register("password")}
              />

              <FormError>{errors.password?.message}</FormError>
            </div>
          </div>

          <Typography
            asChild
            className="block underline text-green-haze-600 w-fit"
          >
            <Link to="/forgot-password">Forgot password?</Link>
          </Typography>

          <Button
            type="submit"
            className="block w-full"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>

      {/* <TextDivider className="mt-4" text="or" />

      <div className="flex items-center justify-center gap-3 mx-auto mt-4">
        <SocialAuthIcon>
          <FaFacebook />
        </SocialAuthIcon>

        <SocialAuthIcon>
          <BsGoogle />
        </SocialAuthIcon>
      </div> */}

      <div className="flex justify-center mt-8 text-center">
        <Typography className="text-center">
          {"Don't"} have an account?{" "}
          <Link to="/signup" className="text-green-haze-600">
            Signup
          </Link>{" "}
        </Typography>
      </div>
    </>
  );
}

export default LoginPage;
