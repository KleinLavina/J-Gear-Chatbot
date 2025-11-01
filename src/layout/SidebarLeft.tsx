import React, { useState, useEffect } from "react";
import "./css/layout.css";
import "./css/sidebarleft.css";
import { FaQuestionCircle, FaRedo, FaFacebook } from "react-icons/fa";
import logoSymbol from "../assets/haha.png";

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
    console.log("FAQs clicked in Sidebar");
    if (onFAQsClick) {
      onFAQsClick();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 500) {
        setIsVisible(false);
        setIsExpanded(false);
      } else if (width <= 600) {
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

  return (
    <>
      {isVisible && (
        <aside
          className={`sidebar left ${isExpanded ? "expanded" : "collapsed"}`}
        >
          <div className="sidebar-container">
            <button
              className="toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "«  " : "»"}
              {isExpanded && <span> Minimize</span>}
            </button>

            <div className="sidebar-top">
              <h2 className="logo">
                {isExpanded && (
                  <img
                    src={logoSymbol}
                    alt="CTE Buddy Logo"
                    className="w-6 h-6 inline-block"
                  />
                )}
                {isExpanded ? "J-Gear" : "J-G"}
              </h2>
              <div className="icon-wrapper">
                <button
                  className={`new-chat ${
                    isExpanded ? "expanded-btn" : "collapsed-btn"
                  }`}
                  onClick={handleRefresh}
                >
                  {isExpanded ? (
                    <>
                      <FaRedo size={18} /> Refresh Chat
                    </>
                  ) : (
                    <FaRedo size={18} />
                  )}
                </button>
                {!isExpanded && <span className="tooltip">Refresh Chat</span>}
              </div>
            </div>

            <nav className="sidebar-menu">
              <ul>
                <li>
                  <div className="icon-wrapper">
                    <button onClick={handleFAQs} className="icon-button">
                      <FaQuestionCircle className="icon" />
                    </button>
                    {!isExpanded && <span className="tooltip">FAQs</span>}
                  </div>
                  {isExpanded && (
                    <button onClick={handleFAQs} className="text-button">
                      FAQs
                    </button>
                  )}
                </li>

                <li>
                  <div className="icon-wrapper">
                    <button onClick={handleFacebook} className="icon-button">
                      <FaFacebook className="icon" />
                    </button>
                    {!isExpanded && (
                      <span className="tooltip">Our FB Page</span>
                    )}
                  </div>
                  {isExpanded && (
                    <button onClick={handleFacebook} className="text-button">
                      Our FB Page
                    </button>
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
      )}
    </>
  );
};

export default SidebarLeft;
