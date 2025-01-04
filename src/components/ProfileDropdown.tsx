import { forwardRef, useContext, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaHospitalUser,
  FaRegUserCircle,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import useTheme from "states/useTheme";
import {
  MdLogout,
  MdOutlineAdminPanelSettings,
  MdOutlineDashboardCustomize,
  MdWorkspacesOutline,
} from "react-icons/md";
import SwitchCard from "components/SwitchCard";
import { BsPersonWorkspace } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "Providers/AuthContextProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Dialog, DialogCloseIcon, DialogContent, DialogHeader } from "./Dialog";
import Typography from "./Typography";
import UserProfileImage from "./UserProfileImage";
import UserRoleCheck from "./UserRoleCheck";

export const NavDropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
>(({ children, ...props }, ref) => {
  return (
    <DropdownMenuContent
      ref={ref}
      loop
      align="end"
      sideOffset={0}
      className="rounded-t-none min-w-[13rem] z-[3000]"
      {...props}
      // bg-white dark:bg-woodsmoke-700 rounded-lg py-3 z-[400] shadow-2xl min-w-[13rem] border rounded-t-none
    >
      {children}
    </DropdownMenuContent>
  );
});

NavDropdownMenuContent.displayName = "NavDropdownMenuContent";

export function NavIconText({
  title,
  icon,
  LInk,
}: {
  title?: string;
  icon?: any;
  LInk?: string;
}) {
  return (
    <span className="flex items-center">
      <div className="w-[2em] opacity-70 group-data-[highlighted]:opacity-100">
        {icon}
      </div>
      <span>{LInk ? <Link to={LInk!}>{title}</Link> : title}</span>
    </span>
  );
}

export function NavDropdownMenuItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem {...props} className={twMerge("px-6 py-2", className)}>
      {children}
    </DropdownMenuItem>
  );
}

function ProfileDropdown() {
  // const { logout } = UseUser();
  const { logout } = useContext(AuthContext);
  const { data: user } = useQuery<any>(["user"], {
    enabled: false,
  });
  const navigate = useNavigate();
  const { switchToDarkMode, switchToLightMode } = useTheme((state) => state);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const { logout } = useHandleUser();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      switchToDarkMode();
    }
    if (localStorage.getItem("theme") === "light") {
      switchToLightMode();
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // const handleSwitchClickFreelance = async () => {
  //   const newKind = 1;
  //   try {
  //     console.log("User ID before update:", user._id);
  //     // await updateUser(user._id, { kind: newKind });
  //     // await getUser();
  //     console.log("User ID after update:", user._id);
  //     closePopup();
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleSwitchClickBuyer = async () => {
  //   const newKind = 0;
  //   try {
  //     console.log("User ID before update:", user._id);
  //     await updateUser(user._id, { kind: newKind });
  //     await getUser();
  //     console.log("User ID after update:", user._id);
  //     closePopup();
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center [&>*:not(:last-child)]:me-2 lg:h-navbar-height"
          >
            <UserProfileImage
              className="w-11 h-11"
              avatar={user?.avatar}
              username={user?.UserName}
            />
            <FaChevronDown />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <NavDropdownMenuContent>
            <NavDropdownMenuItem asChild>
              <Link to={`/profile/${user?._id}`}>
                <NavIconText
                  title="My Profile"
                  icon={<FaRegUserCircle className="text-[1.4em]" />}
                />
              </Link>
            </NavDropdownMenuItem>

            <UserRoleCheck roleCheck="CLIENT">
              <NavDropdownMenuItem asChild>
                <Link to="/dashboard">
                  <NavIconText
                    title="Dashboard"
                    icon={
                      <MdOutlineDashboardCustomize className="text-[1.4em]" />
                    }
                  />
                </Link>
              </NavDropdownMenuItem>
            </UserRoleCheck>

            <NavDropdownMenuItem asChild>
              <Link to="/my-orders">
                <NavIconText
                  title="Orders"
                  icon={<MdWorkspacesOutline className="text-[1.4em]" />}
                />
              </Link>
            </NavDropdownMenuItem>

            <NavDropdownMenuItem asChild>
              <Link to="/my-wallet">
                <NavIconText
                  title="My Wallet"
                  icon={<IoWalletOutline className="text-[1.4em]" />}
                />
              </Link>
            </NavDropdownMenuItem>

            {user.role === "admin" ? (
              <NavDropdownMenuItem asChild>
                <Link to="/admin-panel">
                  <NavIconText
                    title="Admin Panel"
                    icon={
                      <MdOutlineAdminPanelSettings className="text-[1.4em]" />
                    }
                  />
                </Link>
              </NavDropdownMenuItem>
            ) : null}

            <UserRoleCheck roleCheck="FREELANCER">
              <NavDropdownMenuItem asChild>
                <Link to="/create-task">
                  <NavIconText
                    title="Create a Task"
                    icon={<AiOutlineAppstoreAdd className="text-[1.4em]" />}
                  />
                </Link>
              </NavDropdownMenuItem>
            </UserRoleCheck>

            {/* <NavDropdownMenuItem asChild>
              <Link to="/my-proposals">
                <NavIconText
                  title="My Proposals"
                  icon={<IoDocumentTextOutline className="text-[1.4em]" />}
                />
              </Link>
            </NavDropdownMenuItem> */}
            {/* {kind === 0 ? (
              <NavDropdownMenuItem asChild>
                <Link to="/post-jobs">
                  <NavIconText
                    title="Post a Job"
                    icon={<AiOutlineAppstoreAdd className="text-[1.4em]" />}
                  />
                </Link>
              </NavDropdownMenuItem>
            ) : (
              <NavDropdownMenuItem asChild>
                <Link to="/create-task">
                  <NavIconText
                    title="Create a Task"
                    icon={<AiOutlineAppstoreAdd className="text-[1.4em]" />}
                  />
                </Link>
              </NavDropdownMenuItem>
            )} */}

            <DropdownMenuSeparator />

            <NavDropdownMenuItem asChild>
              <button type="button" onClick={handleLogout} className="w-full">
                <NavIconText
                  title="Logout"
                  icon={<MdLogout className="text-[1.4em]" />}
                />
              </button>
            </NavDropdownMenuItem>

            {/* <NavDropdownMenuItem
            disabled
            className="group data-[highlighted]:bg-green-haze-600 flex items-center justify-between cursor-default hover:text-black dark:hover:text-white"
          >
            <NavIconText
              title="Dark Mode"
              icon={<FaRegMoon className="text-[1.3em]" />}
            />

            <Switch.Root
              id="airplane-mode"
              className="w-[38px] h-[20px] bg-black/50 dark:bg-white/50 rounded-full relative dark:data-[state=checked]:bg-green-haze-500 outline-none transition-all duration-200"
              checked={theme === "dark"}
              onCheckedChange={(isDarkMode) => {
                if (isDarkMode) {
                  switchToDarkMode();
                }
                if (!isDarkMode) {
                  switchToLightMode();
                }
              }}
            >
              <Switch.Thumb className="absolute top-1/2 -translate-y-1/2 left-0 block w-[21px] h-[21px] bg-white/100 rounded-full data-[state=checked]:translate-x-[19px] transition-all duration-200 shadow shadow-black" />
            </Switch.Root>
          </NavDropdownMenuItem> */}
            {/* 
          <DropdownMenu.Arrow
            className="fill-white dark:fill-woodsmoke-700"
            width={16}
            height={8}
          /> */}
          </NavDropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>

      <Dialog
        open={isPopupOpen}
        onOpenChange={(open) => {
          setIsPopupOpen(open);
        }}
      >
        <DialogContent className="p-0 w-[90%]">
          <DialogHeader
            variant="bordered"
            className="flex flex-row items-center justify-between space-y-0 px-8"
          >
            <Typography variant="xl">Switch to Role</Typography>
            <DialogCloseIcon />
          </DialogHeader>

          <div className="px-8 py-6 grid sm:grid-cols-2 gap-5">
            <SwitchCard
              title="Freelancer"
              Icon={BsPersonWorkspace}
              // onClick={handleSwitchClickFreelance}
            />

            <SwitchCard
              title="Buyer"
              Icon={FaHospitalUser}
              // onClick={handleSwitchClickBuyer}
            />
            <SwitchCard title="Job Seeker" Icon={FaUserGraduate}>
              {/* <a href="/jobprofile">jobprofile</a> */}
            </SwitchCard>

            <SwitchCard title="Employer" Icon={FaUserTie}>
              {/* <a href="/employer-home">/emloyer-home</a> */}
            </SwitchCard>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfileDropdown;
