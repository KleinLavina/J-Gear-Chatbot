import React, { useState } from "react";
import "./css/faqsmodal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeOnBackdropClick?: boolean;
  onQuestionClick?: (question: string) => void; // Add this prop
}

const FaqsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "Frequently Asked Questions",
  closeOnBackdropClick = true,
  onQuestionClick, // Add this prop
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Handle question click - send to chat and close modal
  const handleQuestionClick = (question: string) => {
    if (onQuestionClick) {
      onQuestionClick(question);
    }
    onClose(); // Close modal after clicking
  };

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
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
              Click any question to ask it in the chat!
            </p>
          </div>
          {closeOnBackdropClick && (
            <button
              className="modal-close-button"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>

        <div className="modal-content">
          <div className="faqs-container">
            {/* General Questions */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("general")}
              >
                <div className="category-title">
                  <span className="category-icon">🤔</span>
                  General Questions
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "general" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "general" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Hello")}
                  >
                    Hello / Hi / Hey
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("How are you?")}
                  >
                    How are you?
                  </div>

                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Help")}
                  >
                    Help
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Thank you")}
                  >
                    Thank you / Thanks
                  </div>
                </div>
              )}
            </section>

            {/* About SJC & Tatak Josephinian */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("about")}
              >
                <div className="category-title">
                  <span className="category-icon">🏛️</span>
                  About SJC & Tatak Josephinian
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "about" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "about" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("What is SJC?")}
                  >
                    What is SJC?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("About Saint Joseph College")
                    }
                  >
                    About Saint Joseph College
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("History of SJC")}
                  >
                    History of SJC
                  </div>
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("What is Tatak Josephinian?")
                    }
                  >
                    What is Tatak Josephinian?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("About your store")}
                  >
                    About your store
                  </div>
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("Who runs Tatak Josephinian?")
                    }
                  >
                    Who runs Tatak Josephinian?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("Who made this chatbot?")
                    }
                  >
                    Who made this chatbot?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("About the developers")}
                  >
                    About the developers
                  </div>
                </div>
              )}
            </section>

            {/* Products & Merchandise */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("products")}
              >
                <div className="category-title">
                  <span className="category-icon">🛍️</span>
                  Products & Merchandise
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "products" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "products" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("What products do you sell?")
                    }
                  >
                    What products do you sell?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Show me your items")}
                  >
                    Show me your items
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Available merchandise")}
                  >
                    Available merchandise
                  </div>
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("T-shirt custom designs")
                    }
                  >
                    T-shirt custom designs
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("New arrivals")}
                  >
                    New arrivals
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Latest products")}
                  >
                    Latest products
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("What's new?")}
                  >
                    What's new?
                  </div>
                </div>
              )}
            </section>

            {/* Pricing Information */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("pricing")}
              >
                <div className="category-title">
                  <span className="category-icon">💰</span>
                  Pricing & Costs
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "pricing" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "pricing" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("How much are your products?")
                    }
                  >
                    How much are your products?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Price list")}
                  >
                    Price list
                  </div>

                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("How much for custom orders?")
                    }
                  >
                    How much for custom orders?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Downpayment options")}
                  >
                    Downpayment options
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Payment terms")}
                  >
                    Payment terms
                  </div>
                </div>
              )}
            </section>

            {/* Sizing & Availability */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("sizing")}
              >
                <div className="category-title">
                  <span className="category-icon">📏</span>
                  Sizing & Availability
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "sizing" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "sizing" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("What sizes are available?")
                    }
                  >
                    What sizes are available?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Size guide")}
                  >
                    Size guide
                  </div>

                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Stock availability")}
                  >
                    Stock availability
                  </div>

                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Can I reserve items?")}
                  >
                    Can I reserve items?
                  </div>
                </div>
              )}
            </section>

            {/* Ordering Process */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("ordering")}
              >
                <div className="category-title">
                  <span className="category-icon">🛒</span>
                  Ordering Process
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "ordering" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "ordering" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("How to order?")}
                  >
                    How to order?
                  </div>

                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Order process")}
                  >
                    Order process
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("How to purchase?")}
                  >
                    How to purchase?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Steps to order")}
                  >
                    Steps to order
                  </div>
                </div>
              )}
            </section>

            {/* Payment Methods */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("payment")}
              >
                <div className="category-title">
                  <span className="category-icon">💳</span>
                  Payment Methods
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "payment" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "payment" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("How to pay?")}
                  >
                    How to pay?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Payment methods")}
                  >
                    Payment methods
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Do you accept GCash?")}
                  >
                    Do you accept GCash?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("GCash details")}
                  >
                    GCash details
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("GCash number")}
                  >
                    GCash number
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("How to pay via GCash?")}
                  >
                    How to pay via GCash?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("GCash instructions")}
                  >
                    GCash instructions
                  </div>
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("Account number for payment")
                    }
                  >
                    Account number for payment
                  </div>
                </div>
              )}
            </section>

            {/* Custom Orders */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("custom")}
              >
                <div className="category-title">
                  <span className="category-icon">🎨</span>
                  Custom Orders
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "custom" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "custom" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("Can I customize merchandise?")
                    }
                  >
                    Can I customize merchandise?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Custom orders")}
                  >
                    Custom orders
                  </div>

                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Custom t-shirts")}
                  >
                    Custom t-shirts
                  </div>
                </div>
              )}
            </section>

            {/* Store & Contact */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("store")}
              >
                <div className="category-title">
                  <span className="category-icon">🏪</span>
                  Store & Contact
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "store" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "store" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Where is your store?")}
                  >
                    Where is your store?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Location")}
                  >
                    Location
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Store address")}
                  >
                    Store address
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("How to contact you?")}
                  >
                    How to contact you?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Phone number")}
                  >
                    Phone number
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("Facebook page")}
                  >
                    Facebook page
                  </div>
                </div>
              )}
            </section>

            {/* Support & Help */}
            <section className="faq-category">
              <div
                className="faq-category-header"
                onClick={() => toggleCategory("support")}
              >
                <div className="category-title">
                  <span className="category-icon">❓</span>
                  Support & Help
                </div>
                <span
                  className={`dropdown-arrow ${
                    openCategory === "support" ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {openCategory === "support" && (
                <div className="faq-list">
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("I need help")}
                  >
                    I need help
                  </div>

                  <div
                    className="faq-question"
                    onClick={() =>
                      handleQuestionClick("Can't decide what to ask")
                    }
                  >
                    Can't decide what to ask
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("What should I ask?")}
                  >
                    What should I ask?
                  </div>
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick("I have a question")}
                  >
                    I have a question
                  </div>
                </div>
              )}
            </section>

            <div className="faqs-footer">
              <div className="footer-icon">💡</div>
              <div className="footer-content">
                <p>
                  <strong>Pro Tip:</strong> Click any question to automatically
                  ask it in the chat!
                </p>
                <small>
                  For inquiries that need personal assistance, please reach out
                  to us through our official Tatak Josephinian Facebook page.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsModal;
