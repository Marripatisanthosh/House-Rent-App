import { IconButton, Input } from "@mui/material";
import { Send } from "lucide-react";
import { useState } from "react";

import useSendMessage from "../../hooks/chat/useSendMessage";

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage();

  const [message, setMessage] = useState("");

  const handleSend = async () => {
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex w-full items-center gap-0">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border border-gray-300 px-4 py-2"
        placeholder="Message..."
        minLength={1}
      />
      <IconButton
        onClick={handleSend}
        variant="text"
        className="-right-2 border px-2 text-blue-500 hover:text-blue-600"
        style={{ padding: "10px" }}
        disabled={loading}
      >
        <Send className="h-7 w-7" />
      </IconButton>
    </div>
  );
};

export default MessageInput;
