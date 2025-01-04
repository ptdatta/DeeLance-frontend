import { useQuery } from "@tanstack/react-query";
import Avatar from "components/Avatar";
import Button from "components/Button";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserResponse } from "stream-chat";
import {
  DefaultStreamChatGenerics,
  useChannelStateContext,
} from "stream-chat-react";
import { formatLastActive } from "utils";

function MessageHeader() {
  const { channel } = useChannelStateContext();
  const { data: user } = useQuery<any>({
    queryKey: ["user"],
    enabled: false,
  });

  const [otherMember, setOtherMember] =
    useState<UserResponse<DefaultStreamChatGenerics> | null>(null);

  useEffect(() => {
    const getOtherMember = () => {
      const members = Object.values(channel.state.members);
      const other = members.find((member) => member?.user?.id !== user._id);
      setOtherMember(other?.user || null);
    };

    if (channel && channel.state && channel.state.members) {
      getOtherMember();
    }
  }, [channel, user._id]);

  if (!otherMember) return null;

  return (
    <header className="h-20 flex-shrink-0 flex items-center justify-between shadow-md px-8 border-b border-black/10">
      <div className="flex items-center space-x-4">
        <Avatar avatar={otherMember.image} />

        <div>
          <Link to={`/profile/${otherMember.id}`} className="hover:underline">
            {otherMember.name}
          </Link>

          {otherMember.online ? (
            <div className="text-xs flex items-center space-x-2">
              <p className="inline-block align-middle lh-1">Online</p>
              <div className="inline-block align-middle w-[.7em] h-[.7em] bg-green-haze-500 rounded-full" />
            </div>
          ) : (
            <p className="text-xs opacity-70">
              last active {formatLastActive(otherMember.last_active as any)} ago
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button size="sm" startIcon={<IoIosCall className="text-[1.3em]" />}>
          Call
        </Button>
        <Button size="sm" className="px-[.6em] py-[.4em] h-auto">
          <BsThreeDotsVertical className="text-[1.3em]" />
        </Button>
      </div>
    </header>
  );
}

export { MessageHeader };
