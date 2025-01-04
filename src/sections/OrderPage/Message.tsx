import Avatar from "components/Avatar";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCall, IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const Msg = ({
  showAvatar = true,
  showDateAndTime = true,
  children,
  isUser,
}: any) => {
  return (
    <div
      className={twMerge("flex items-start sm:w-1/2", isUser ? "ml-auto" : "")}
    >
      <div
        className={twMerge(
          "flex-shrink-0 mr-4",
          isUser ? "order-2 ml-4" : null
        )}
      >
        <div
          className={`w-11 rounded-full bg-black ${
            showAvatar ? "opacity-100 h-11" : "opacity-0 h-auto"
          }`}
        />
      </div>

      <aside className={twMerge("pt-1", isUser ? "ml-auto" : null)}>
        <div
          className={twMerge(
            "py-2 px-2 rounded-md bg-woodsmoke-200 dark:bg-woodsmoke-700 w-fit",
            isUser ? "bg-green-haze-200 dark:bg-green-haze-800" : null
          )}
        >
          {children}
        </div>
        {showDateAndTime ? (
          <div className="pt-2 flex items-center justify-between">
            <Typography variant="xs">4 days ago</Typography>
            <Typography variant="xs">11:05</Typography>
          </div>
        ) : null}
      </aside>
    </div>
  );
};

const DateDivider = () => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center opacity-40 py-5">
      <div className="h-[2px] bg-black/60 dark:bg-white/60" />
      <Typography variant="sm">6 Aug 2022</Typography>
      <div className="h-[2px] bg-black/60 dark:bg-white/60" />
    </div>
  );
};

function Message({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "bg-white dark:bg-woodsmoke-900 [&>*]:px-6 grid grid-rows-[auto_1fr_auto] h-[90vh] overflow-hidden",
        className
      )}
    >
      <header className="h-20 flex items-center justify-between shadow-md">
        <Avatar
          title="Florencio Dorrance"
          subtitle={
            (
              <>
                <span className="inline-block align-middle w-[.7em] h-[.7em] bg-green-haze-500 rounded-full mr-[.36em] relative top-[-.1em]" />
                <span className="inline-block align-middle lh-1">Online</span>
              </>
            ) as any
          }
        />

        <div className="flex space-x-4">
          <Button startIcon={<IoIosCall className="text-[1.3em]" />}>
            Call
          </Button>
          <Button className="px-[.6em] py-[.4em] h-auto">
            <BsThreeDotsVertical className="text-[1.3em]" />
          </Button>
        </div>
      </header>

      <main className="py-8 space-y-4 overflow-y-scroll">
        <Msg showAvatar={false} showDateAndTime={false}>
          <Typography variant="sm">Hi</Typography>
        </Msg>
        <Msg>
          <Typography variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
        </Msg>

        <DateDivider />

        <Msg>
          <Typography variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            doloremque ullam mollitia error fugit? Nostrum corrupti aliquam
            incidunt sed! Aliquid voluptates magnam corrupti. Facilis facere qui
            repudiandae, libero voluptate dolorum.
          </Typography>
        </Msg>
        <Msg isUser showAvatar={false} showDateAndTime={false}>
          <Typography variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          </Typography>
        </Msg>
        <Msg isUser showAvatar={false} showDateAndTime={false}>
          <Typography variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          </Typography>
        </Msg>
        <Msg isUser showAvatar={false} showDateAndTime={false}>
          <Typography variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          </Typography>
        </Msg>
        <Msg isUser showAvatar={false} showDateAndTime={false}>
          <Typography variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          </Typography>
        </Msg>
        <Msg isUser>
          <Typography variant="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            doloremque ullam mollitia error fugit? Nostrum corrupti aliquam
            incidunt sed! Aliquid voluptates magnam corrupti. Facilis facere qui
            repudiandae, libero voluptate dolorum.
          </Typography>
        </Msg>
      </main>

      <footer className="py-6 flex space-x-4 items-center shadow-2xl shadow-black z-50 relative">
        <div className="flex-shrink-0">
          <Button variant="simple" className="px-0 h-auto">
            <IoMdAttach className="text-[1.6em]" />
          </Button>
        </div>

        <Input
          className="bg-woodsmoke-200 dark:bg-woodsmoke-600 pr-14"
          placeholder="Type a message"
          endIcon={(_className: any) => (
            <IoSend className={twMerge(_className, "text-xl")} />
          )}
        />
      </footer>
    </div>
  );
}

export default Message;
