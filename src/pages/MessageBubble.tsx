import { useAppSelector } from "@/store/hooks";
import { Message } from "./MessagePage";
import { FaFileWord, FaFileAlt, FaFilePdf } from "react-icons/fa";

type Props = {
  message: Message;
};

const MessageBubble = ({ message }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const { sender, text, mediaUrl, mediaType, fileName } = message;

  const isOwnMessage = user?._id === sender._id;

  const renderMedia = () => {
    if (!mediaUrl) return null;

    switch (mediaType) {
      case "image":
        return (
          <img
            src={mediaUrl}
            alt={fileName || "Image"}
            className="mt-2 max-w-full rounded-md"
          />
        );

      case "video":
        return (
          <video
            src={mediaUrl}
            controls
            className="mt-2 max-w-full rounded-md"
          />
        );

      case "pdf":
        return (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center space-x-2 text-red-600 underline"
          >
            <FaFilePdf size={20} />
            <span className="truncate max-w-xs">
              {fileName || "PDF Document"}
            </span>
          </a>
        );

      case "document":
        return (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center space-x-2 text-blue-600 underline"
          >
            <FaFileWord size={20} />
            <span className="truncate max-w-xs">{fileName || "Document"}</span>
          </a>
        );

      default:
        return (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center space-x-2 text-gray-600 underline"
          >
            <FaFileAlt size={20} />
            <span className="truncate max-w-xs">{fileName || "File"}</span>
          </a>
        );
    }
  };

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
        {text && <p>{text}</p>}
        {renderMedia()}
      </div>

      {isOwnMessage && <div className="w-10 h-10 rounded-full bg-gray-200" />}
    </div>
  );
};

export default MessageBubble;
