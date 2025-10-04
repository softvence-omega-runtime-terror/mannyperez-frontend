import { MessageCircle, Send } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const chatMessages = [
  {
    id: 1,
    user: "printMaster",
    message:
      "Welcome everyone! The navy cotton roll is perfect for quilting projects!",
    isHost: true,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    user: "CraftLover23",
    message: "What's the thread count on this one?",
    isHost: false,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    user: "FabricFan",
    message: "Just claimed one! Can't wait!",
    isHost: false,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    user: "PatternPro",
    message: "Do you ship internationally?",
    isHost: false,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];


const LiveChat = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };
  return (
    <div>
      <Card className="flex flex-col border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <MessageCircle className="h-5 w-5 text-foreground" />
          <h3 className="font-semibold text-card-foreground">Live Chat</h3>
        </div>

        <ScrollArea className="flex-1 p-4 h-[400px]">
          <div className="space-y-4">
            {chatMessages.map((chat) => (
              <div key={chat.id} className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={chat.avatar}/>
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {chat.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-card-foreground">
                      {chat.user}
                    </span>
                    {chat.isHost && (
                      <Badge
                        variant="secondary"
                        className="bg-accent text-accent-foreground text-xs px-2 py-0"
                      >
                        Host
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground break-words">
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-accent text-accent-foreground hover:bg-accent/90 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LiveChat;
