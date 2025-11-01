// In Layout.tsx
import React, { useState } from "react";
import SidebarLeft from "./SidebarLeft";
import CTEChatbot from "./CTEChatbot";
import FaqsModal from "./modules/FaqsModal";

const Layout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  const handleOpenFAQs = () => {
    setIsModalOpen(true);
  };

  const handleCloseFAQs = () => {
    setIsModalOpen(false);
  };

  // Handle when a question is clicked in FAQs modal
  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="app">
      <SidebarLeft onFAQsClick={handleOpenFAQs} />
      <CTEChatbot
        onFAQsClick={handleOpenFAQs}
        selectedQuestion={selectedQuestion}
      />
      <FaqsModal
        isOpen={isModalOpen}
        onClose={handleCloseFAQs}
        onQuestionClick={handleQuestionClick}
      />
    </div>
  );
};

export default Layout;
