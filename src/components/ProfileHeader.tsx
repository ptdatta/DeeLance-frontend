/* eslint-disable func-names */
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { MdDeleteOutline, MdOutlineLocationOn } from "react-icons/md";
import { BsFillChatQuoteFill, BsGlobe } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import get from "lodash/get";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaLinkedinIn,
  FaPlus,
  FaStackOverflow,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { FaXTwitter } from "react-icons/fa6";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "Providers/AuthContextProvider";
import { streamClient } from "services/streamService";
import SelectBox from "./SelectBox";
import { Separator } from "./ui/separator";
import Input from "./Input";
import EditPencilIcon from "./EditPencilIcon";
import Loader from "./Loader";
import Button from "./Button";
import {
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./Dialog";
import AvatarUpload from "./AvatarUpload";

const urlType = [
  "personal-website",
  "github",
  "stackoverflow",
  "dribble",
  "linkedIn",
  "behance",
  "x",
] as const;

type UrlType = (typeof urlType)[number];

// const urlPrefixes: Record<UrlType, string> = {
//   "personal-website": "https://",
//   linkedIn: "https://www.linkedin.com/in/",
//   github: "https://www.github.com/",
//   dribble: "https://www.dribbble.com/",
//   behance: "https://www.behance.net/",
//   stackoverflow: "https://www.stackoverflow.com/",
//   x: "https://www.twitter.com/",
// };

interface ObjType {
  label: string;
  Icon: IconType;
}

type UrlOptionsObj = {
  [key in UrlType]: ObjType;
};

const urlOptionsObj: UrlOptionsObj = {
  "personal-website": { label: "Personal Website", Icon: BsGlobe },
  linkedIn: { label: "LinkedIn", Icon: FaLinkedinIn },
  github: { label: "Github", Icon: FaGithub },
  dribble: { label: "Dribble", Icon: FaDribbble },
  behance: { label: "Behance", Icon: FaBehance },
  stackoverflow: { label: "StackOverflow", Icon: FaStackOverflow },
  x: { label: "X", Icon: FaXTwitter },
};

yup.addMethod(yup.array, "uniqueProperty", function (propertyPath, message) {
  return this.test("unique", "", function (list: any) {
    const errors: any = [];

    list.forEach((item: any, index: any) => {
      const propertyValue = get(item, propertyPath);

      if (
        propertyValue &&
        filter(list, [propertyPath, propertyValue]).length > 1
      ) {
        errors.push(
          this.createError({
            path: `${this.path}[${index}].${propertyPath}`,
            message,
          })
        );
      }
    });

    if (!isEmpty(errors)) {
      throw new yup.ValidationError(errors);
    }

    return true;
  });
});

const schema = yup.object({
  country: yup.string(),
  external_profiles: yup
    .array()
    .of(
      yup.object({
        type: yup.string().oneOf(urlType).required("type is required"),
        public_url: yup.string().url().required("url is required"),
      })
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .uniqueProperty("type", "Type must be unique")
    .uniqueProperty("public_url", "Url must be unique"),
});

function DialogForm({
  setIsModalOpen,
  portion,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  portion: string;
}) {
  const { userId } = useParams();
  const { data: profile, refetch: refetchProfile } = useQuery<any>({
    queryKey: ["profile", userId],
    enabled: false,
  });

  const axiosPrivate = useAxiosPrivate();
  const initialValues = {
    UserName: profile.UserName,
    external_profiles: profile.external_profiles,
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty: isFormEdited },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "external_profiles",
  });

  const onSubmit = (data: any) => {
    console.log(data);
    
    return new Promise((resolve) => {
      const func = async () => {
        try {
          await axiosPrivate.put(`/update-profile/${profile._id}`, data);
          await axiosPrivate.put(`/external-profiles/${profile._id}`, data);
          await refetchProfile();
          resolve("");
          setIsModalOpen(false);
        } catch (error) {
          resolve("");
        }
      };

      func();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="[&>*]:px-8">
      <DialogHeader
        variant="bordered"
        className="flex items-center justify-between border-black/10"
      >
        <p className="text-xl font-medium opacity-60">Personal Details</p>
        <DialogCloseIcon />
      </DialogHeader>

      <main className="py-5 max-h-[calc(100vh-200px)] overflow-auto">
        {portion == "personal-details" && (
          <div>
            <p className="text-xl mb-5 opacity-90">
              Let’s get started with some personal details
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="col-span-2">
                <Input
                  disabled
                  variant="outlined"
                  label="Email"
                  value={profile.email}
                />
              </div>

              <div className="col-span-2">
                <Input
                  variant="outlined"
                  label="Username*"
                  placeholder="Enter your user name"
                  {...register("UserName")}
                />
              </div>
            </div>
          </div>
        )}

        {portion == "external-profile" && <div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium opacity-60">
                Your external Profiles
              </p>

              <Button
                shape="icon"
                onClick={() => append("")}
                variant="contained-2"
                className="rounded-full"
              >
                <FaPlus />
              </Button>
            </div>
          </div>

          <div className="grid gap-5">
            {fields.map((field, index) => (
              <div key={field.id} className="flex space-x-4">
                <aside className="flex-1">
                  <SelectBox
                    variant="outlined"
                    {...register(`external_profiles.${index}.type` as const)}
                    error={
                      errors?.external_profiles &&
                      (errors as any)?.external_profiles[index]?.type?.message
                    }
                  >
                    {Object.keys(urlOptionsObj).map((item: any) => (
                      <option value={item} key={item}>
                        {(urlOptionsObj as any)[item].label}
                      </option>
                    ))}
                  </SelectBox>
                </aside>
                <main className="flex-1">
                  <Input
                    variant="outlined"
                    {...register(
                      `external_profiles.${index}.public_url` as const
                    )}
                    error={
                      errors?.external_profiles &&
                      (errors as any)?.external_profiles[index]?.public_url
                        ?.message
                    }
                  />
                </main>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex-shrink-0 text-3xl opacity-30 hover:opacity-100"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            ))}
          </div>
        </div>}
      </main>

      <DialogFooter
        variant="bordered"
        className="flex items-center justify-end space-x-4 border-black/10"
      >
        <DialogClose asChild>
          <Button variant="simple">Cancel</Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={!isFormEdited || isSubmitting}
          className="max-w-[6rem] w-full"
        >
          {isSubmitting ? <Loader.CircularSnake color="white" /> : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function ProfileHeader() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { isToken } = useContext(AuthContext);
  const user: any = queryClient.getQueryData(["user"]);
  const profile: any = queryClient.getQueryData(["profile", userId]);
  const isUser = isToken ? profile._id === user._id : false;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portion,setPortion] = useState("personal-details");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { refetch: orderChatWithUser, isRefetching: isOrderingChat } = useQuery(
    {
      queryKey: ["start-chat", userId],
      enabled: false,
      staleTime: Infinity,
      queryFn: async () => {
        await axiosPrivate.get(`/start-chat/${userId}`);
        const channel = streamClient.channel("messaging", {
          members: [user._id, userId],
        });
        await channel.create();

        navigate("/inbox");
        return true;
      },
    }
  );

  const openDialog= (val: boolean, portion: string) => {
    setIsModalOpen(val);
    setPortion(portion);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={(val) => openDialog(val,"personal-details")}>
      <header className="flex items-center justify-between">
        <main className="flex items-center space-x-6 flex-1">
          <AvatarUpload />

          <div>
            <header className="mb-2.5">
              <div className="flex items-center space-x-4">
                <h1 className="text-4xl opacity-80">{profile.UserName}</h1>

                {isUser ? (
                  <EditPencilIcon
                    onClick={() => openDialog(true,"personal-details")}
                    className="static border border-black flex-shrink-0 bg-transparent text-xs"
                  />
                ) : null}
              </div>
            </header>

            <div className="flex items-center space-x-3">
              <span className="capitalize lh-1 text-lg">
                {profile.accountType.toLowerCase()}
              </span>

              <Separator
                orientation="vertical"
                className="h-[1rem] opacity-60 block"
              />

              {profile.country ? (
                <p className="flex items-center space-x-1">
                  <MdOutlineLocationOn className="text-[1.4em] opacity-80" />{" "}
                  <span>{profile.country}</span>
                </p>
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {isUser ? (
                    <p className="lh-1 text-lg">{profile.location}</p>
                  ) : null}
                </>
              )}

              {profile?.external_profiles?.length !== 0 ? (
                <Separator
                  orientation="vertical"
                  className="h-[1rem] opacity-60 block"
                />
              ) : null}

              {profile?.external_profiles?.length > 0 ? (
                <div className="flex items-center space-x-2">
                  {profile.external_profiles.map((item: any, i: number) => {
                    const iconsData = (urlOptionsObj as any)[item.type];

                    if (!iconsData) return null;

                    return (
                      <Button
                        key={i}
                        shape="icon"
                        variant="simple"
                        className="rounded-full border-2 border-stone-600 text-stone-600"
                        asChild
                      >
                        <a
                          href={item.public_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <iconsData.Icon />
                        </a>
                      </Button>
                    );
                  })}
                  <EditPencilIcon
                    onClick={() => openDialog(true,"external-profile")}
                    className="static border border-black flex-shrink-0 bg-transparent text-xs"
                  />
                </div>
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {isUser ? (
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() => openDialog(true,"external-profile")}
                    >
                      <BsGlobe className="mr-2" />
                      Add Website
                    </Button>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </main>

        {isUser ? (
          <aside className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <p className="text-5xl">0</p>
              <img src="/images/logo-short.svg" className="h-8" alt="" />
            </div>

            <Separator orientation="vertical" className="h-10 opacity-30" />

            <Button>
              <BiTransferAlt className="text-[1.4em] mr-2" />
              Refer & Earn
            </Button>
          </aside>
        ) : (
          <Button
            type="button"
            onClick={() => orderChatWithUser()}
            disabled={isOrderingChat}
          >
            <span className="w-5 h-5 mr-2 flex items-center justify-center">
              {isOrderingChat ? (
                <Loader.CircularSnake className="w-full h-full" color="white" />
              ) : (
                <BsFillChatQuoteFill />
              )}
            </span>
            Message
          </Button>
        )}
      </header>

      {isUser ? (
        <DialogContent className="p-0">
          <DialogForm setIsModalOpen={setIsModalOpen} portion={portion} />
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default ProfileHeader;
