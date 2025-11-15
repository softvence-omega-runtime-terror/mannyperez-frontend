import { useAppSelector } from "@/store/hooks";
import { Message } from "./MessagePage";

type Props = {
  message: Message;
};

const MessageBubble = ({ message }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const { sender, text, mediaUrl, mediaType } = message;

  const isOwnMessage = user?._id === sender._id;

  return (
    <div
      className={`flex items-start space-x-3 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar */}
      {!isOwnMessage && <div className="w-10 h-10 rounded-full bg-gray-200" />}

      <div
        className={`rounded-lg p-3 text-sm max-w-xs break-words ${
          isOwnMessage
            ? "bg-pink-100 text-right ml-auto"
            : "bg-gray-100 text-left"
        }`}
      >
        {/* Text */}
        {text && <p>{text}</p>}

        {/* Media */}
        {mediaUrl && mediaType === "image" && (
          <img
            src={mediaUrl}
            alt="media"
            className="mt-2 max-w-full rounded"
          />
        )}
        {mediaUrl && mediaType === "video" && (
          <video
            src={mediaUrl}
            controls
            className="mt-2 max-w-full rounded"
          />
        )}
        {mediaUrl && mediaType === "pdf" && (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 underline block"
          >
            View PDF
          </a>
        )}
      </div>

      {/* Avatar for own messages */}
      {isOwnMessage && <div className="w-10 h-10 rounded-full bg-gray-200" />}
    </div>
  );
};

export default MessageBubble;
