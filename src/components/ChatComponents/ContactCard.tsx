/* eslint-disable @typescript-eslint/naming-convention */
import Avatar from "components/Avatar";
import React, { useRef, memo } from "react";
import {
  ChannelPreviewUIComponentProps,
  DefaultStreamChatGenerics,
} from "stream-chat-react";
import { twMerge } from "tailwind-merge";

interface Props
  extends ChannelPreviewUIComponentProps<DefaultStreamChatGenerics> {
  // onSelectChannel?: (channel: Channel<DefaultStreamChatGenerics>) => void;
}

function ContactCardMemoized(props: Props) {
  const {
    channel,
    setActiveChannel,
    displayTitle,
    displayImage,
    latestMessage,
    unread,
    onSelect: customOnSelectChannel,
    watchers,
    active,
  } = props;

  const channelPreviewButton = useRef<HTMLButtonElement | null>(null);

  const avatarName =
    displayTitle ||
    channel.state.messages[channel.state.messages.length - 1]?.user?.id;

  const _onSelectChannel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (customOnSelectChannel) {
      customOnSelectChannel(e);
    } else if (setActiveChannel) {
      setActiveChannel(channel, watchers);
    }
    if (channelPreviewButton?.current) {
      channelPreviewButton.current.blur();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <button
      type="button"
      aria-label={`Select Channel: ${displayTitle || ""}`}
      aria-selected={active}
      ref={channelPreviewButton}
      onClick={_onSelectChannel}
      className={twMerge(
        "hover:bg-neutral-200 px-6 py-2 w-full text-left flex items-center space-x-4",
        active ? "bg-neutral-200" : null
      )}
    >
      <div className="flex-1 overflow-hidden text-[90%]">
        <Avatar
          avatar={displayImage}
          title={avatarName}
          subtitle={latestMessage as any}
        />
      </div>

      {!!unread && (
        <div
          data-testid="unread-badge"
          className="w-5 h-5 font-semibold text-xs text-white/90 rounded-full bg-green-500 flex items-center justify-center lh-1 flex-shrink-0"
        >
          {unread}
        </div>
      )}
    </button>
  );
}

const ContactCard = memo(ContactCardMemoized);

export { ContactCard };
