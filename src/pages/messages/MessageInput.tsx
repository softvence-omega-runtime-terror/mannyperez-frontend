import { useState, useRef } from "react";
import { socket, SocketEvent } from "@/lib/socket";
import { FiPaperclip, FiSend, FiX } from "react-icons/fi";
import { FaSpinner, FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa";
import { useFileUploadMutation } from "@/store/services/chatApi";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  receiverId: string;
  productId: string;
}

const MessageInput = ({ receiverId, productId }: Props) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUpload, { isLoading }] = useFileUploadMutation();

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    if (
      selectedFile.type.startsWith("image") ||
      selectedFile.type.startsWith("video")
    ) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileUpload = async (uploadFile: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("caption", text);

      const res = await fileUpload(formData);
      setIsUploading(false);
      return res.data?.success ? res.data.data : null;
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      return null;
    }
  };

  const handleSend = async () => {
    if (!text.trim() && !file) return;

    let fileData = null;
    if (file) {
      const currentFile = file;
      setFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fileData = await handleFileUpload(currentFile);
    }

    const payload = {
      message: {
        text: text.trim(),
        mediaUrl: fileData?.fileUrl,
        fileName: fileData?.fileName,
        mediaType: fileData?.mediaType,
      },
    };

    socket.emit(SocketEvent.SEND_MESSAGE, { payload, receiverId, productId });
    setText("");
  };

  const renderFilePreview = () => {
    if (!file) return null;

    if (file.type.startsWith("image"))
      return (
        <img
          src={previewUrl!}
          alt="preview"
          className="max-h-40 rounded-md object-cover"
        />
      );

    if (file.type.startsWith("video"))
      return (
        <video
          src={previewUrl!}
          className="max-h-40 rounded-md"
          controls
        />
      );

    if (file.type === "application/pdf")
      return (
        <div className="flex items-center space-x-2">
          <FaFilePdf
            size={30}
            className="text-red-600"
          />
          <span className="text-sm">{file.name}</span>
        </div>
      );

    if (
      file.type.includes("msword") ||
      file.type.includes("officedocument.wordprocessingml")
    )
      return (
        <div className="flex items-center space-x-2">
          <FaFileWord
            size={30}
            className="text-blue-600"
          />
          <span className="text-sm">{file.name}</span>
        </div>
      );

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
            onClick={() => {
              setFile(null);
              setPreviewUrl(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
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
            ref={fileInputRef}
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleFileChange(e.target.files[0])
            }
            accept="image/*,video/*,application/pdf,.doc,.docx"
          />
        </label>

        <Textarea
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 resize-none px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition placeholder-gray-400"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
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
