import { useState, useEffect } from "react";
import { socket, SocketEvent } from "@/lib/socket";
import { FiPaperclip, FiSend, FiX } from "react-icons/fi";
import { FaSpinner, FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa";
import { useFileUploadMutation } from "@/store/services/chatApi";

interface Props {
  receiverId: string;
  productId: string;
}

const MessageInput = ({ receiverId, productId }: Props) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  console.log("🚀 ~ MessageInput ~ file:", file);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [fileUpload, { isLoading }] = useFileUploadMutation();

  // Generate preview for image/video
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (file.type.startsWith("image") || file.type.startsWith("video")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    setPreviewUrl(null);
  }, [file]);

  // Clear input & preview after message is sent
  useEffect(() => {
    const handleMessageAck = () => {
      setText("");
      setFile(null);
      setPreviewUrl(null);
    };
    socket.on(SocketEvent.MESSAGE_SENT_ACK, handleMessageAck);
    return () => {
      socket.off(SocketEvent.MESSAGE_SENT_ACK, handleMessageAck);
    };
  }, []);

  const handleFileUpload = async () => {
    if (!file) return null;
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", text);

      const res = await fileUpload(formData);
      setIsUploading(false);

      if (res.data?.success) return res.data.data; // { fileUrl, fileName, mediaType }
      return null;
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      return null;
    }
  };

  const handleSend = async () => {
    const fileData = file ? await handleFileUpload() : null;
    if (!text.trim() && !fileData) return;

    const payload = {
      message: {
        text: text.trim(),
        mediaUrl: fileData?.fileUrl,
        fileName: file?.name,
        mediaType: fileData?.mediaType,
      },
    };

    socket.emit(SocketEvent.SEND_MESSAGE, {
      payload,
      receiverId,
      productId,
    });
  };

  const renderFilePreview = () => {
    if (!file) return null;

    // Images
    if (file.type.startsWith("image")) {
      return (
        <img
          src={previewUrl!}
          alt="preview"
          className="max-h-40 rounded-md object-cover"
        />
      );
    }

    // Videos
    if (file.type.startsWith("video")) {
      return (
        <video
          src={previewUrl!}
          className="max-h-40 rounded-md"
          controls
        />
      );
    }

    // PDFs
    if (file.type === "application/pdf") {
      return (
        <div className="flex items-center space-x-2">
          <FaFilePdf
            size={30}
            className="text-red-600"
          />
          <span className="text-sm">{file.name}</span>
        </div>
      );
    }

    // Word Docs
    if (
      file.type.includes("msword") ||
      file.type.includes("officedocument.wordprocessingml")
    ) {
      return (
        <div className="flex items-center space-x-2">
          <FaFileWord
            size={30}
            className="text-blue-600"
          />
          <span className="text-sm">{file.name}</span>
        </div>
      );
    }

    // Other files fallback
    return (
      <div className="flex items-center space-x-2">
        <FaFileAlt
          size={30}
          className="text-gray-500"
        />
        <span className="text-sm">{file.name}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-2 mt-4">
      {/* File Preview */}
      {file && (
        <div className="relative w-52 p-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
          {renderFilePreview()}
          <button
            onClick={() => setFile(null)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        {/* File Attachment */}
        <label
          htmlFor="file-input"
          className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition"
        >
          <FiPaperclip
            size={20}
            className="text-gray-600"
          />
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files![0])}
            accept="image/*,video/*,application/pdf,.doc,.docx"
          />
        </label>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={isUploading || isLoading}
          className="flex items-center justify-center w-10 h-10 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
        >
          {isUploading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FiSend size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
