import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatInputArea from "./components/ChatInputArea";
import ChatMessages from "./components/ChatMessages";
import type { Message } from "./backend/chatService2";
import { getMerchandiseResponse } from "./backend/chatService2";
import "./css/chatbot.css";
import type { SuggestedReply } from "./backend/suggestedReplies";
import { GravityStarsBackground } from "../components/animate-ui/backgrounds/gravity-stars";

// In CTEChatbot.tsx - update the interface and component
interface CTEChatbotProps {
  onFAQsClick?: () => void;
  selectedQuestion?: string; // Add this
}

const CTEChatbot: React.FC<CTEChatbotProps> = ({
  onFAQsClick,
  selectedQuestion,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to Tatak Josephinian — the Official SJC Merchandise Store.\n\nI'm here to help with anything you need. What can I help you find today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<
    SuggestedReply[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scrolls the chat messages to the bottom for better user experience
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle when a question is selected from FAQs - COPY TO INPUT AREA
  useEffect(() => {
    if (selectedQuestion && selectedQuestion.trim()) {
      setInputText(selectedQuestion);
      // Auto-focus on the input area after setting the text
      // You might want to add a ref to the textarea for this
    }
  }, [selectedQuestion]);

  // Handles sending a message in the chat
  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    setCurrentSuggestions([]);

    setTimeout(() => {
      const response = getMerchandiseResponse(inputText);
      const botMessage: Message = {
        id: messages.length + 2,
        text: response.message,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setCurrentSuggestions(response.suggestions);
      setIsTyping(false);
    }, 1500);
  };

  // Handles clicking on suggested replies to auto-fill input
  const handleSuggestionClick = (reply: string) => {
    setInputText(reply);
    handleSend();
  };

  return (
    <main className="chat">
      <div className="chat-container">
        <div className="chat-stars-bg" aria-hidden="true">
          <GravityStarsBackground
            starsCount={70}
            starsSize={1.6}
            starsOpacity={0.55}
            glowIntensity={10}
            movementSpeed={0.25}
            mouseInfluence={120}
            mouseGravity="attract"
            gravityStrength={60}
          />
        </div>
        <ChatHeader title="J-Gear Assistant" onFAQsClick={onFAQsClick} />
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          suggestedReplies={isTyping ? [] : currentSuggestions}
          onSuggestionClick={handleSuggestionClick}
        />
        <ChatInputArea
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
        />
      </div>
    </main>
  );
};

export default CTEChatbot;
