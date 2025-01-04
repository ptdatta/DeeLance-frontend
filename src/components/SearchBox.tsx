import { FaSearch, FaStar } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { FREELANCER, JOB } from "utils/constants";
import { useDebouncedSearch } from "hooks/useDebouncedSearch";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Loader from "./Loader";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Separator } from "./ui/separator";
import UserProfileImage from "./UserProfileImage";

function UserCard({ user, onSelect }: { user: any; onSelect?: () => void }) {
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="cursor-pointer hover:bg-gray-200 flex items-center space-x-4 justify-between py-2 px-5"
      onClick={() => {
        navigate(`/profile/${user._id}`);
        if (onSelect) {
          onSelect();
        }
      }}
    >
      <main className="flex items-center space-x-3">
        <UserProfileImage
          avatar={user.avatar}
          username={user.UserName}
          className="w-11 h-11"
        />
        <div>
          <p className="text-sm">{user.UserName}</p>{" "}
          <p className="truncate max-w-[10rem] text-xs opacity-80">
            {user.title}
          </p>
        </div>
      </main>

      <aside className="text-right flex items-center space-x-2 justify-end">
        <p className="text-xs opacity-80 font-medium">{user.country}</p>

        <Separator
          orientation="vertical"
          className="h-[1rem] w-[2px] bg-black/60"
        />

        <p className="flex items-center space-x-1.5 justify-end">
          <span className="block text-xs">4.6</span>{" "}
          <FaStar className="text-yellow-500 w-3 h-3" />
        </p>
      </aside>
    </div>
  );
}

function SearchBox({ inputClassName, onTypeChange }: any) {
  const [searchFor, setSearchFor] = useState(FREELANCER);
  const placeholder = `Search for ${searchFor}`;
  const [searchTerm, setSearchTerm] = useState("");
  const inputBox = useRef(null);
  const {
    apiData: { data, isFetching },
    isLoadingTotally,
  } = useDebouncedSearch(searchTerm);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const toggleSearchFor = (e: any) => {
    const value = e.currentTarget.getAttribute("data-title");
    setSearchFor(value);
    onTypeChange(value);
  };

  useEffect(() => {
    if ((data as any)?.data) {
      setIsPopupOpen(true);
    }
  }, [isFetching]);

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length === 0) {
      setIsPopupOpen(false);
    }
  }, [searchTerm]);

  return (
    <Popover
      open={isPopupOpen}
      onOpenChange={(open) => {
        setIsPopupOpen(open);
      }}
    >
      <div className="w-full relative">
        <div ref={inputBox} className="relative flex-1 h-12">
          <div className="absolute top-1/2 rtl:right-5 ltr:left-5 -translate-y-1/2 text-woodsmoke-400 dark:text-white/60 pointer-events-none z-20 w-4 h-4">
            {isLoadingTotally ? (
              <Loader.CircularSnake className="w-full h-full" />
            ) : (
              <FaSearch className="w-full h-full" />
            )}
          </div>

          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onClick={() => {
              if (searchTerm.length >= 1) {
                setIsPopupOpen(true);
              }
            }}
            className={twMerge(
              "block w-full h-full flex-1 border-1 border-woodsmoke-400 bg-transparent rounded-md rtl:pr-12 ltr:pl-12 rtl:pl-6 ltr:pr-6 text-black dark:text-white outline-none focus:border-green-haze-600 z-10",
              inputClassName
            )}
          />

          <div className="flex absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-woodsmoke-300 dark:bg-woodsmoke-400">
            {[FREELANCER, JOB].map((title, i) => (
              <Button
                key={i}
                size="sm"
                data-title={title}
                onClick={toggleSearchFor}
                className={`rounded-full h-[2em] font-medium capitalize ${
                  title === searchFor
                    ? ""
                    : "bg-woodsmoke-300 hover:bg-woodsmoke-300 dark:bg-woodsmoke-400"
                }`}
              >
                {title}
              </Button>
            ))}
          </div>
        </div>

        <PopoverTrigger
          disabled
          className="border-2 w-full pointer-events-none sr-only -z-10"
        >
          Open
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] px-0 py-2"
          onInteractOutside={(e) => {
            if (
              inputBox.current &&
              (inputBox.current === e.target ||
                (inputBox.current as any).contains(e.target))
            ) {
              e.preventDefault();
            }
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault(); // disable autofocus on open
          }}
        >
          {(data as any)?.data?.length >= 1 ? (
            (data as any)?.data?.map((item: any) => (
              <UserCard
                key={item._id}
                user={item}
                onSelect={() => setIsPopupOpen(false)}
              />
            ))
          ) : (
            <p className="text-center opacity-80 py-5 text-sm">
              No user found with this name
            </p>
          )}
        </PopoverContent>
      </div>
    </Popover>
  );
}

export default SearchBox;
