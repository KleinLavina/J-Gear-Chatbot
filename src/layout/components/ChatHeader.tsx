import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, RefreshCw, HelpCircle, Facebook } from "lucide-react";
import logo from "../../assets/ashbro.png";
import "../css/chatheader.css";

// Update props interface to include the handler
interface ChatHeaderProps {
  title: string;
  onFAQsClick?: () => void; // Add this prop
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, onFAQsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRightSection, setShowRightSection] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 600) {
        setShowRightSection(true);
      } else {
        setShowRightSection(false);
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen && menuBtnRef.current) {
      const rect = menuBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideBtn = menuBtnRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideBtn && !insideDropdown) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleFAQs = () => {
    console.log("FAQs clicked");
    // Call the parent handler if provided
    if (onFAQsClick) {
      onFAQsClick();
    }
    setIsMenuOpen(false);
  };

  const handleFacebook = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=61578204130888",
      "_blank"
    );
    setIsMenuOpen(false);
  };

  return (
    <div className="chat-header">
      {/* Left Section */}
      <div className="left-section">
        <div className="avatar-container">
          <div className="chat-avatar">
            <img src={logo} alt="Chat avatar" />
          </div>
        </div>

        <div className="title-container">
          <div className="chat-title">{title}</div>
          <div className="online-status">
            <span className="online-dot"></span>
            Online
          </div>
        </div>
      </div>

      {/* Right Section - Show the compact menu whenever the sidebar is hidden */}
      {showRightSection && (
        <div className="right-section">
          {/* Desktop Options - Hidden since we only show mobile menu */}
          <div className="desktop-options" style={{ display: "none" }}>
            <button className="header-btn" onClick={handleFAQs} title="FAQs">
              <HelpCircle size={18} />
              <span>FAQs</span>
            </button>
            <button
              className="header-btn"
              onClick={handleRefresh}
              title="Refresh Chat"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Mobile Menu Button (visible on small screens) */}
          <div className="mobile-menu">
            <button
              ref={menuBtnRef}
              className="menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>

            {/* Mobile Dropdown Menu — rendered via portal to escape overflow:hidden */}
            {isMenuOpen && createPortal(
              <div
                ref={dropdownRef}
                className="mobile-dropdown"
                style={{
                  position: "fixed",
                  top: dropdownPos.top,
                  right: dropdownPos.right,
                }}
              >
                <button className="dropdown-item" onClick={handleFAQs}>
                  <HelpCircle size={16} />
                  <span>FAQs</span>
                </button>
                <button className="dropdown-item" onClick={handleRefresh}>
                  <RefreshCw size={16} />
                  <span>Refresh Chat</span>
                </button>
                <button className="dropdown-item" onClick={handleFacebook}>
                  <Facebook size={16} />
                  <span>Our FB Page</span>
                </button>
              </div>,
              document.body
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
