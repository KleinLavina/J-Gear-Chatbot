import React, { useState } from "react";
import {
  X,
  ChevronDown,
  MessageCircle,
  Building2,
  ShoppingBag,
  Tag,
  Ruler,
  ShoppingCart,
  CreditCard,
  Palette,
  Store,
  LifeBuoy,
} from "lucide-react";
import "./css/faqsmodal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeOnBackdropClick?: boolean;
  onQuestionClick?: (question: string) => void;
}

interface FaqCategory {
  id: string;
  title: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  questions: string[];
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "general",
    title: "General Questions",
    Icon: MessageCircle,
    questions: ["Hello", "How are you?", "Help", "Thank you"],
  },
  {
    id: "about",
    title: "About SJC & Tatak Josephinian",
    Icon: Building2,
    questions: [
      "What is SJC?",
      "About Saint Joseph College",
      "History of SJC",
      "What is Tatak Josephinian?",
      "About your store",
      "Who runs Tatak Josephinian?",
      "Who made this chatbot?",
      "About the developers",
    ],
  },
  {
    id: "products",
    title: "Products & Merchandise",
    Icon: ShoppingBag,
    questions: [
      "What products do you sell?",
      "Show me your items",
      "Available merchandise",
      "T-shirt custom designs",
      "New arrivals",
      "Latest products",
      "What's new?",
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Costs",
    Icon: Tag,
    questions: [
      "How much are your products?",
      "Price list",
      "How much for custom orders?",
      "Downpayment options",
      "Payment terms",
    ],
  },
  {
    id: "sizing",
    title: "Sizing & Availability",
    Icon: Ruler,
    questions: [
      "What sizes are available?",
      "Size guide",
      "Stock availability",
      "Can I reserve items?",
    ],
  },
  {
    id: "ordering",
    title: "Ordering Process",
    Icon: ShoppingCart,
    questions: [
      "How to order?",
      "Order process",
      "How to purchase?",
      "Steps to order",
    ],
  },
  {
    id: "payment",
    title: "Payment Methods",
    Icon: CreditCard,
    questions: [
      "How to pay?",
      "Payment methods",
      "Do you accept GCash?",
      "GCash details",
      "GCash number",
      "How to pay via GCash?",
      "GCash instructions",
      "Account number for payment",
    ],
  },
  {
    id: "custom",
    title: "Custom Orders",
    Icon: Palette,
    questions: ["Can I customize merchandise?", "Custom orders", "Custom t-shirts"],
  },
  {
    id: "store",
    title: "Store & Contact",
    Icon: Store,
    questions: [
      "Where is your store?",
      "Location",
      "Store address",
      "How to contact you?",
      "Phone number",
      "Facebook page",
    ],
  },
  {
    id: "support",
    title: "Support & Help",
    Icon: LifeBuoy,
    questions: ["I need help", "Can't decide what to ask", "What should I ask?"],
  },
];

const FaqsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "Frequently Asked Questions",
  closeOnBackdropClick = true,
  onQuestionClick,
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>("general");

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleQuestionClick = (question: string) => {
    if (onQuestionClick) onQuestionClick(question);
    onClose();
  };

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title-section">
            <h2 className="modal-title">{title}</h2>
            <p className="modal-subtitle">
              Tap a question to ask it in the chat.
            </p>
          </div>
          {closeOnBackdropClick && (
            <button
              className="modal-close-button"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="modal-content">
          <div className="faqs-container">
            {FAQ_CATEGORIES.map(({ id, title, Icon, questions }) => {
              const isOpen = openCategory === id;
              return (
                <section
                  key={id}
                  className={`faq-category ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-category-header"
                    onClick={() => toggleCategory(id)}
                    aria-expanded={isOpen}
                  >
                    <span className="category-title">
                      <span className="category-icon">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      {title}
                    </span>
                    <span
                      className={`dropdown-arrow ${isOpen ? "open" : ""}`}
                      aria-hidden="true"
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-list">
                      {questions.map((q) => (
                        <button
                          key={q}
                          type="button"
                          className="faq-question"
                          onClick={() => handleQuestionClick(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsModal;
