import { useAppSelector } from "@/store/hooks";
import { FaFileWord, FaFileAlt, FaFilePdf } from "react-icons/fa";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import { Message } from "./buyer/MessagePage";

type Props = { message: Message };

// Friendly date helper
const getFriendlyDate = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date)) return format(date, "EEEE");
  return format(date, "MMM dd, yyyy");
};

const MessageBubble = ({ message }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const { sender, text, mediaUrl, mediaType, fileName, createdAt } = message;

  const isOwnMessage = user?._id === sender._id;

  const renderMedia = () => {
    if (!mediaUrl) return null;

    const fileBlock =
      "mt-2 flex items-center gap-2 p-2 rounded-lg border shadow-sm hover:shadow-md transition cursor-pointer";

    switch (mediaType) {
      case "image":
        return (
          <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={mediaUrl}
              alt={fileName || "Image"}
              className="mt-2 max-w-full rounded-lg shadow-md max-h-64 object-cover cursor-pointer transition-transform hover:scale-[1.02]"
            />
          </a>
        );

      case "video":
        return (
          <video
            src={mediaUrl}
            controls
            className="mt-2 w-full rounded-lg shadow-md max-h-64 object-cover"
          />
        );

      case "pdf":
        return (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${fileBlock} bg-red-50 text-red-700 border-red-200`}
          >
            <FaFilePdf size={20} />
            <span className="truncate text-xs font-medium">
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
            className={`${fileBlock} bg-blue-50 text-blue-700 border-blue-200`}
          >
            <FaFileWord size={20} />
            <span className="truncate text-xs font-medium">
              {fileName || "Document"}
            </span>
          </a>
        );

      default:
        return (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${fileBlock} bg-gray-50 text-gray-700 border-gray-200`}
          >
            <FaFileAlt size={20} />
            <span className="truncate text-xs font-medium">
              {fileName || "File"}
            </span>
          </a>
        );
    }
  };

  const avatar = sender.img ? (
    <img
      src={sender.img}
      alt={sender.name}
      className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-300"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-bold">
      {sender.name[0].toUpperCase()}
    </div>
  );

  const bubbleClass = isOwnMessage
    ? "bg-pink-500 text-white rounded-tl-xl rounded-br-xl"
    : "bg-white text-gray-900 border border-gray-200 rounded-tr-xl rounded-bl-xl";

  return (
    <div
      className={`flex mb-4 items-start ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar left side for others */}
      {!isOwnMessage && <div className="mr-3">{avatar}</div>}

      <div className="max-w-xs md:max-w-md flex flex-col gap-1">
        {/* Sender Name */}
        <p
          className={`text-xs font-semibold mb-1 ${
            isOwnMessage ? "text-right text-pink-400" : "text-left text-pink-600"
          }`}
        >
          {sender.name}
        </p>

        {/* Message Bubble */}
        <div className={`relative p-3 shadow-md ${bubbleClass}`}>
          {/* Text */}
          {text && <p className={mediaUrl ? "mb-2" : "mb-1"}>{text}</p>}

          {/* Media */}
          {renderMedia()}

          {/* Date + time */}
          {createdAt && (
            <span
              className={`block text-[10px] mt-2 ${
                isOwnMessage ? "text-pink-100/90 text-right" : "text-gray-500"
              }`}
            >
              {getFriendlyDate(new Date(createdAt))} •{" "}
              {format(new Date(createdAt), "hh:mm a")}
            </span>
          )}
        </div>
      </div>

      {/* Avatar right for own messages */}
      {isOwnMessage && <div className="ml-3">{avatar}</div>}
    </div>
  );
};

export default MessageBubble;
