import { useQuery } from "@tanstack/react-query";
import AttachmentCard from "components/AttachmentCard";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import prettyBytes from "pretty-bytes";
import {
  Channel,
  MessageInput,
  MessageList,
  ChannelList,
  Chat,
  useChatContext,
} from "stream-chat-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChannelFilters, ChannelOptions, ChannelSort } from "stream-chat";

import "stream-chat-react/dist/css/v2/index.css";

import { queryKeys } from "utils";
import {
  ContactCard,
  ContactListWrapper,
  InboxPageWrapper,
  MessageHeader,
} from "components/ChatComponents";

function InboxPage() {
  const { client } = useChatContext();
  // const [activeChannel, setActiveChannel] =
  //   useState<Channel<DefaultStreamChatGenerics> | null>(null);
  const { data: user } = useQuery<any>({
    queryKey: ["user"],
    enabled: false,
  });
  const { data: isStreamUserConnected } = useQuery({
    queryKey: [queryKeys.messaging.streamUserKey],
    enabled: false,
  });

  const sort: ChannelSort = {
    last_message_at: -1,
  };
  const filters: ChannelFilters = {
    type: "messaging",
    members: { $in: [user._id] },
  };
  const options: ChannelOptions = {
    limit: 10,
  };

  if (!isStreamUserConnected) return null;

  return (
    <Chat client={client}>
      <InboxPageWrapper>
        <ContactListWrapper className="border-r border-black/10">
          <header className="px-6">
            <Input placeholder="Search" className="mb-4" />
          </header>

          <div>
            <ChannelList
              Preview={ContactCard}
              filters={filters}
              sort={sort}
              options={options}
            />
          </div>
        </ContactListWrapper>

        <div className="overflow-auto">
          <Channel>
            <div className="w-full flex flex-col">
              <MessageHeader />
              <MessageList />
              <div className="border-t border-black/10 pt-2">
                <MessageInput />
              </div>
            </div>

            {/* <Thread /> */}
          </Channel>
        </div>
        {/* ) : (
          <div className="flex items-center justify-center flex-col space-y-3 pb-16">
            <MessageCircle className="w-20 h-20 opacity-70" />
            <p className="font-medium opacity-80">Select person to chat with</p>
          </div>
        )} */}
        {/* <Message className="h-full min-h-full max-h-full" /> */}

        <div className="max-xl:hidden bg-woodsmoke-100 dark:bg-woodsmoke-700 pb-5 min-h-full max-h-full h-full overflow-y-auto">
          <div className="h-20 flex items-center justify-between border-b-2 border-white/20 px-6 mb-5">
            <Typography>Directory</Typography>

            <Button
              size="sm"
              className="px-[.4em] py-[.4em] h-auto bg-woodsmoke-800"
            >
              <BsThreeDotsVertical className="text-[1.2em]" />
            </Button>
          </div>

          <main className="px-6">
            <Typography className="mb-4">Files</Typography>

            <div className="space-y-4">
              {new Array(12).fill("").map((_, i) => (
                <AttachmentCard
                  key={i}
                  downloadIcon
                  fileName={`File ${i + 1}`}
                  type={i % 2 ? "pdf" : "jpg"}
                  size={prettyBytes(123213123)}
                  className="bg-transparent dark:bg-transparent p-0"
                />
              ))}
            </div>
          </main>
        </div>

        {/* <div className="border-l border-black/10" /> */}
      </InboxPageWrapper>
    </Chat>
  );
}

export default InboxPage;
