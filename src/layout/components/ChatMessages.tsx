import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import type { Message } from "../backend/chatService2";
import "../css/chatmessage.css";
import type { SuggestedReply } from "../backend/suggestedReplies";
import logo from "../../assets/ashbro.png";
import { motion } from "framer-motion";

// Variants for animation
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.9,
    },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// Props for ChatMessages
interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  suggestedReplies: SuggestedReply[];
  onSuggestionClick: (suggestion: string) => void;
}

// ✅ Small typewriter component
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset when text changes
    let i = 0;

    if (text.length === 0) return;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  messagesEndRef,
  suggestedReplies,
  onSuggestionClick,
}) => {
  // Add null checks for safety
  if (!messages) return null;

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-message ${msg.isBot ? "bot" : "user"}`}
        >
          <div className="chat-message-inner">
            <div className="chat-avatar-small">
              {msg.isBot ? (
                <img src={logo} alt="Bot avatar" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div
              className={`chat-bubble ${
                msg.isBot ? "bot-bubble" : "user-bubble"
              }`}
            >
              {/* ✅ Only apply typewriter effect if bot */}
              <div className="chat-text">
                {msg.isBot ? (
                  <TypewriterText text={msg.text || ""} />
                ) : (
                  msg.text
                )}
              </div>

              <div className="chat-time">
                {msg.timestamp?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }) || "00:00"}
              </div>
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="chat-message bot">
          <div className="chat-message-inner">
            <div className="chat-avatar-small">
              <img src={logo} alt="Bot typing" />
            </div>
            <div className="chat-bubble bot-bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Replies */}
      {suggestedReplies &&
        suggestedReplies.length > 0 &&
        messages.length > 0 && (
          <motion.div
            className="suggested-replies-section"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div className="suggested-replies-container">
              {suggestedReplies.map((suggestion: SuggestedReply, index) => (
                <motion.button
                  key={index}
                  className={`suggested-reply-bubble ${
                    suggestion.isExploreMore ? "explore-more" : ""
                  }`}
                  onClick={() => onSuggestionClick(suggestion.text)}
                  variants={bubbleVariants}
                >
                  {suggestion.text}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
