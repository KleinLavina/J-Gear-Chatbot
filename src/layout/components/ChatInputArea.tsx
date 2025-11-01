import React, { type KeyboardEvent, type ChangeEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputAreaProps {
  inputText: string;
  setInputText: (value: string) => void;
  handleSend: () => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  inputText,
  setInputText,
  handleSend,
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-area">
      <textarea
        value={inputText}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setInputText(e.target.value)
        }
        onKeyPress={handleKeyPress}
        placeholder="Ask me about SJC merchandise, products, pricing, or how to order..."
        rows={2}
      />
      <button onClick={handleSend} disabled={!inputText.trim()}>
        <Send />
      </button>
    </div>
  );
};

export default ChatInputArea;
