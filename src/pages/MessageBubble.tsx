import { useAppSelector } from "@/store/hooks";
import { Message } from "./MessagePage";
import { FaFileWord, FaFileAlt, FaFilePdf } from "react-icons/fa";
import { format } from "date-fns";

type Props = {
  message: Message;
};

const MessageBubble = ({ message }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const { sender, text, mediaUrl, mediaType, fileName, createdAt } = message;

  // Determine if the message was sent by the currently logged-in user
  const isOwnMessage = user?._id === sender._id;

  // Helper function to render media content (image, video, document)
  const renderMedia = () => {
    if (!mediaUrl) return null;

    switch (mediaType) {
      case "image":
        return (
          <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={mediaUrl}
              alt={fileName || "Image"}
              className="mt-2 max-w-full rounded-lg shadow-md max-h-60 object-contain cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            />
          </a>
        );

      case "video":
        return (
          <video
            src={mediaUrl}
            controls
            className="mt-2 max-w-full rounded-lg shadow-md max-h-60"
          />
        );

      case "pdf":
        return (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center space-x-2 p-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition duration-150 shadow-sm"
          >
            <FaFilePdf size={20} className="flex-shrink-0" />
            <span className="truncate max-w-[calc(100%-30px)] font-medium text-xs">
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
            className="mt-2 flex items-center space-x-2 p-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition duration-150 shadow-sm"
          >
            <FaFileWord size={20} className="flex-shrink-0" />
            <span className="truncate max-w-[calc(100%-30px)] font-medium text-xs">
              {fileName || "Document"}
            </span>
          </a>
        );

      default:
        // Default file type
        return (
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center space-x-2 p-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-150 shadow-sm"
          >
            <FaFileAlt size={20} className="flex-shrink-0" />
            <span className="truncate max-w-[calc(100%-30px)] font-medium text-xs">
              {fileName || "File"}
            </span>
          </a>
        );
    }
  };

  // Content for the sender's avatar
  const avatarContent = sender.avatar ? (
    <img
      src={sender.avatar}
      alt={sender.name}
      className="w-8 h-8 rounded-full object-cover object-center ring-2 ring-white"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
      {sender.name[0].toUpperCase()}
    </div>
  );

  // Dynamic Tailwind classes for alignment and colors
  const containerClasses = isOwnMessage
    ? "justify-end"
    : "justify-start";

  const bubbleClasses = isOwnMessage
    ? "bg-pink-500 text-white rounded-tr-none"
    : "bg-gray-200 text-gray-800 rounded-tl-none";
  
  const textClasses = mediaUrl ? "mb-2" : "mb-3"; // Add bottom margin to text if media is present

  return (
    <div className={`flex ${containerClasses} mb-4 items-end`}>
      {/* Avatar for received messages (left side) */}
      {!isOwnMessage && (
        <div className="mr-2">
          {avatarContent}
        </div>
      )}

      {/* Message Content and Bubble */}
      <div className="flex flex-col max-w-xs md:max-w-md">
        <div
          className={`relative rounded-xl p-3 text-sm break-words shadow-lg ${bubbleClasses}`}
        >
          {/* Sender Name for received messages */}
          {!isOwnMessage && (
            <p className="font-semibold text-xs mb-1 text-pink-600">
              {sender.name}
            </p>
          )}

          {/* Message Text */}
          {text && <p className={textClasses}>{text}</p>}

          {/* Media Content */}
          {renderMedia()}
          
          {/* Hidden/Visually separated Timestamp */}
          {createdAt && (
            <span className={`block text-[10px] mt-1 ${isOwnMessage ? "text-pink-100/80" : "text-gray-500/80"}`}>
              {format(new Date(createdAt), "hh:mm a")}
            </span>
          )}
        </div>
      </div>

      {/* Avatar for own messages (right side) */}
      {isOwnMessage && (
        <div className="ml-2">
          {avatarContent}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;