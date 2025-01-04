/* eslint-disable jsx-a11y/label-has-associated-control */
import { Suspense, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Input from "components/Input";
import Typography from "components/Typography";
import ConnectWalletButton from "components/ConnectWalletButton";
import PasswordStrengthBar from "react-password-strength-bar";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "utils/constants";
import FormLabel from "components/FormLabel";
import PasswordInput from "components/PasswordInput";
import FormError from "components/FormError";
import Loader from "components/Loader";
import { twMerge } from "tailwind-merge";
import { MdOutlinePersonAddAlt, MdOutlineWorkOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { Check, X } from "lucide-react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

const UserNameField = () => {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const {
    apiData: { data, error, isError },
    isLoadingTotally,
  } = useDebouncedSearch(
    watch("UserName") || "",
    1000,
    "/check-username-avilable"
  );
  const result = (data as any)?.msg;

  useEffect(() => {
    if (((error as AxiosError)?.response?.data as any)?.errors[0]?.msg)
      setError("UserName", {
        type: "custom",
        message: ((error as AxiosError)?.response?.data as any)?.errors[0]?.msg,
      });
  }, [isError]);

  useEffect(() => {
    if ((data as any)?.available) {
      clearErrors();
    }
  }, [(data as any)?.available]);

  return (
    <div>
      <div className="relative flex items-center justify-between pb-1">
        <Input
          label="Username"
          placeholder="Enter Your username"
          error={errors.UserName?.message}
          {...register("UserName")}
        />

        <div className="absolute top-0 right-0 flex items-center pr-6 space-x-2 opacity-70">
          <div className="w-4 h-4">
            {isLoadingTotally ? (
              <Loader.CircularSnake className="w-full h-full" />
            ) : null}

            {(data as any)?.available === true && isLoadingTotally === false ? (
              <Check className="w-full h-full text-green-500" />
            ) : null}

            {(data as any)?.available === false &&
            isLoadingTotally === false ? (
              <X className="w-full h-full text-red-500" />
            ) : null}
          </div>
          <p className="text-xs">
            {result && isLoadingTotally === false ? result : null}

            {isLoadingTotally ? "checking username" : null}
          </p>
        </div>
      </div>
    </div>
  );
};

const schema = yup
  .object({
    UserName: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    wallet: yup.string(),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),

    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),

    agreedToTermsAndServices: yup
      .bool()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),

    accountType: yup
      .string()
      .required("Account type is required")
      .oneOf(["FREELANCER", "CLIENT"], "Invalid account type"),
  })
  .required();

function SignUp() {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      agreedToTermsAndServices: false,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    setError,
    trigger,
    watch,
  } = methods;
  const loading = isSubmitting;
  const accountType = watch("accountType");
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const {
    mutate: signup,
    isLoading: isSigningUp,
    isSuccess,
  } = useMutation({
    mutationFn: async (dataServerNeeds) => {
      await axios.post(`${BASE_URL}/register`, dataServerNeeds);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.errors) {
          (error.response?.data.errors as any[]).forEach((item: any) => {
            setError(item.path, {
              message: item.msg,
            });
          });
        }
      }
    },
  });

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const referrerId = params.get("referrer");
  //   if (referrerId) {
  //     localStorage.setItem("referrerId", referrerId);
  //     const holo = localStorage.getItem("referrerId");
  //     console.log("referal id", holo);
  //   }
  // }, []);
  // const referrerId = localStorage.getItem("referrerId");

  const onSubmit = (data: any) => {
    const dataServerNeeds = {
      UserName: data.UserName,
      email: data.email,
      password: data.password,
      wallet: data.wallet,
      accountType: data.accountType,
    };

    signup(dataServerNeeds as any);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Usa navigate anziché history.push
    }
  }, [navigate]); // Passa navigate come dipendenza

  useEffect(() => {
    setValue("wallet", address);
  }, [isConnected, address, setValue]);

  if (isSuccess) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">Verify your email address</h1>

        <p className="mb-6">
          A verification email has been sent to your email{" "}
          <span className="font-medium text-green-haze-500">
            {watch("email")}
          </span>
          . Please check your email and click the link provided in the email to
          complete your account registration.
        </p>
      </div>
    );
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <div className="grid grid-cols-2 gap-5">
                <Button
                  variant="simple"
                  onClick={() => {
                    setValue("accountType", "FREELANCER");
                    trigger("accountType", { shouldFocus: false });
                  }}
                  className={twMerge(
                    "border-2 border-black/20",
                    accountType === "FREELANCER"
                      ? "bg-green-haze-600 text-white border-green-haze-600"
                      : "hover:bg-green-100 hover:text-green-haze-600"
                  )}
                >
                  <MdOutlineWorkOutline className="w-5 h-5 mr-2" />
                  <span>Find work</span>
                </Button>

                <Button
                  variant="simple"
                  onClick={() => {
                    setValue("accountType", "CLIENT");
                    trigger("accountType", { shouldFocus: false });
                  }}
                  className={twMerge(
                    "border-2 border-black/20",
                    accountType === "CLIENT"
                      ? "bg-green-haze-600 text-white border-green-haze-600"
                      : "hover:bg-green-100 hover:text-green-haze-600"
                  )}
                >
                  <MdOutlinePersonAddAlt className="w-5 h-5 mr-2" />
                  <span>Hire talent</span>
                </Button>
              </div>

              <FormError>{errors?.accountType?.message}</FormError>
            </div>

            <UserNameField />

            <Input
              label="Email address"
              placeholder="Enter Your Email"
              disabled={loading}
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="grid gap-5">
              <div>
                {/* <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="w-full"
                disabled={loading}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                error={errors.password?.message}
                {...register("password")}
              /> */}

                <label>
                  <FormLabel>Password</FormLabel>

                  <PasswordInput
                    placeholder="Enter Your Password"
                    error={errors.password?.message}
                    disabled={loading}
                    showErrorText={false}
                    {...register("password")}
                    name="password"
                  />

                  <FormError>{errors.password?.message}</FormError>
                </label>

                {watch("password") ? (
                  <PasswordStrengthBar
                    className="[&>:first-child]:!m-0 [&>:first-child>*]:!h-1 [&>:first-child>*]:rounded-full mt-3"
                    password={watch("password")}
                    barColors={[
                      "#b8b9c1",
                      "#d62c2c",
                      "#e97000",
                      "#2b90ef",
                      "#10d76d",
                    ]}
                  />
                ) : null}
              </div>
              {/* <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              className="w-full"
              placeholder="Enter Your Password"
              error={errors.confirmPassword?.message}
              disabled={loading}
              {...register("confirmPassword")}
            /> */}

              <label>
                <FormLabel>Confirm Password</FormLabel>

                <PasswordInput
                  placeholder="Enter Your Password"
                  error={errors.confirmPassword?.message}
                  disabled={loading}
                  showErrorText={false}
                  {...register("confirmPassword")}
                  name="confirmPassword"
                />

                <FormError>{errors.confirmPassword?.message}</FormError>
              </label>
            </div>

            <div>
              <Typography className="flex mb-1">
                Wallet Address (optional)
              </Typography>

              <div className="flex space-x-2">
                <Input
                  placeholder="Wallet Address"
                  type="text"
                  id="Wallet Address"
                  disabled
                  error={errors.wallet?.message}
                  {...register("wallet")}
                />

                <Suspense fallback={<>loading...</>}>
                  <ConnectWalletButton className="flex items-center whitespace-nowrap">
                    Connect Wallet
                  </ConnectWalletButton>
                </Suspense>
              </div>
            </div>
            <Controller
              control={control}
              name="agreedToTermsAndServices"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div>
                  <Checkbox
                    isChecked={value}
                    onChange={onChange}
                    label={
                      (
                        <>
                          I agree to Deelance{" "}
                          <span className="underline text-green-haze-600">
                            Terms & Conditions
                          </span>
                        </>
                      ) as any
                    }
                  />

                  {error ? (
                    <span className="flex mt-2 text-sm text-red-500 pointer-events-none select-none w-fit">
                      {error.message}
                    </span>
                  ) : null}
                </div>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSigningUp}>
              <span>Create my account</span>{" "}
              {isSigningUp ? (
                <Loader.CircularSnake color="white" className="w-5 h-5 ml-3" />
              ) : null}
            </Button>
          </form>
        </div>
        <div className="flex justify-center mt-8 text-center">
          <Typography>
            Already have an account?{" "}
            <Link to="/login" className="text-green-haze-600">
              Login{" "}
            </Link>{" "}
          </Typography>
        </div>
      </FormProvider>
    </>
  );
}

export default SignUp;
