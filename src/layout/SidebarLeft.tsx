import React, { useState, useEffect } from "react";
import "./css/layout.css";
import "./css/sidebarleft.css";
import {
  HelpCircle,
  Facebook,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logoSymbol from "../assets/haha-removebg-preview.png";

interface SidebarLeftProps {
  onFAQsClick?: () => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ onFAQsClick }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleFacebook = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=61578204130888",
      "_blank"
    );
  };

  const handleFAQs = () => {
    if (onFAQsClick) onFAQsClick();
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setIsVisible(false);
        setIsExpanded(false);
      } else if (width <= 1024) {
        setIsVisible(true);
        setIsExpanded(false);
      } else {
        setIsVisible(true);
        setIsExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      className={`sidebar left ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <div className="sidebar-container">
        <button
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Minimize sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <>
              <ChevronLeft size={16} />
              <span>Minimize</span>
            </>
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        <div className="sidebar-top">
          <h2 className="logo">
            <img src={logoSymbol} alt="J-Gear logo" />
          </h2>

          <div className="icon-wrapper">
            <button
              className={`new-chat ${
                isExpanded ? "expanded-btn" : "collapsed-btn"
              }`}
              onClick={handleRefresh}
              aria-label="Refresh chat"
            >
              <RefreshCw size={16} />
              {isExpanded && <span>Refresh Chat</span>}
            </button>
            {!isExpanded && <span className="tooltip">Refresh Chat</span>}
          </div>
        </div>

        <nav className="sidebar-menu">
          <ul>
            <li>
              {isExpanded ? (
                <button onClick={handleFAQs} className="text-button">
                  <HelpCircle
                    size={18}
                    style={{ marginRight: 12, color: "var(--primary)" }}
                  />
                  FAQs
                </button>
              ) : (
                <div className="icon-wrapper">
                  <button
                    onClick={handleFAQs}
                    className="icon-button"
                    aria-label="FAQs"
                  >
                    <HelpCircle className="icon" />
                  </button>
                  <span className="tooltip">FAQs</span>
                </div>
              )}
            </li>

            <li>
              {isExpanded ? (
                <button onClick={handleFacebook} className="text-button">
                  <Facebook
                    size={18}
                    style={{ marginRight: 12, color: "var(--primary)" }}
                  />
                  Our FB Page
                </button>
              ) : (
                <div className="icon-wrapper">
                  <button
                    onClick={handleFacebook}
                    className="icon-button"
                    aria-label="Our FB Page"
                  >
                    <Facebook className="icon" />
                  </button>
                  <span className="tooltip">Our FB Page</span>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {isExpanded && (
          <div className="sidebar-footer">
            <small>Student Portal • Google Classroom • Email</small>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarLeft;
