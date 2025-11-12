import React, {
  useEffect,
  useState,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
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
  const [placeholderText, setPlaceholderText] = useState(
    "Ask me about SJC merchandise, products, pricing, or how to order..."
  );

  useEffect(() => {
    const updatePlaceholder = () => {
      const width = window.innerWidth;

      if (width <= 420) {
        setPlaceholderText("Ask about items, prices, or orders...");
        return;
      }

      setPlaceholderText(
        "Ask me about SJC merchandise, products, pricing, or how to order..."
      );
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  // Handles keyboard input for sending messages on Enter key press
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
        placeholder={placeholderText}
        aria-label="Chat message input"
        rows={2}
      />
      <button onClick={handleSend} disabled={!inputText.trim()}>
        <Send />
      </button>
    </div>
  );
};

export default ChatInputArea;
