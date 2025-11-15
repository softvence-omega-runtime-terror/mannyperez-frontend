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
        isOwnMessage ? "justify-end" : ""
      }`}
    >
      {/* Avatar */}
      {!isOwnMessage && (
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      )}

      <div
        className={`rounded-lg p-3 text-sm text-gray-800 max-w-xs ${
          isOwnMessage ? "bg-pink-100 text-right" : "bg-gray-100"
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
            className="mt-2 text-blue-600 underline"
          >
            View PDF
          </a>
        )}
      </div>

      {/* Avatar for own messages */}
      {isOwnMessage && (
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      )}
    </div>
  );
};

export default MessageBubble;
