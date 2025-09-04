import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import ChatPopover from "../../components/chat/ChatPopover";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/eye.svg";
import ChatMessagePopup from "../student-poll/ChatMessagePopup";
import "./TeacherPollPage.css";
let apiUrl = import.meta.env.VITE_API_BASE_URL;

const socket = io(apiUrl);

const TeacherPollPage = () => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [votes, setVotes] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [chatPopup, setChatPopup] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    socket.on("pollCreated", (pollData) => {
      setPollQuestion(pollData.question);
      setPollOptions(pollData.options);
      setVotes({});
    });

    socket.on("pollResults", (updatedVotes) => {
      setVotes(updatedVotes);
      setTotalVotes(Object.values(updatedVotes).reduce((a, b) => a + b, 0));
    });

    socket.on("chatMessage", (message) => {
      const username = sessionStorage.getItem("username");
      if (message.user !== username) {
        setChatPopup(message);
      }
    });

    return () => {
      socket.off("pollCreated");
      socket.off("pollResults");
      socket.off("chatMessage");
    };
  }, []);

  const calculatePercentage = (count) => {
    if (totalVotes === 0) return 0;
    return (count / totalVotes) * 100;
  };
  const askNewQuestion = () => {
    navigate("/teacher-home-page");
  };
  const handleViewPollHistory = () => {
    navigate("/teacher-poll-history");
  };

  return (
    <div className="teacher-poll-container">
      <div className={`teacher-poll-dashboard ${mounted ? 'fade-in' : ''}`}>
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">
              <span className="text-gradient">Live Poll</span> Dashboard
            </h1>
            <div className="header-actions">
              <button
                className="action-button modern-btn secondary hover-lift"
                onClick={handleViewPollHistory}
              >
                <img src={eyeIcon} alt="History" />
                <span>Poll History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {pollQuestion ? (
            <div className="poll-results-section">
              {/* Poll Question Card */}
              <div className="question-card modern-card slide-in-left">
                <div className="question-header">
                  <div className="question-badge">
                    <span>Current Question</span>
                  </div>
                  <div className="live-indicator">
                    <div className="live-dot"></div>
                    <span>LIVE</span>
                  </div>
                </div>
                <h2 className="current-question">{pollQuestion}?</h2>
              </div>

              {/* Results Dashboard */}
              <div className="results-dashboard">
                <div className="results-header">
                  <h3>Real-time Results</h3>
                  <div className="total-votes">
                    <span className="votes-count">{totalVotes}</span>
                    <span className="votes-label">Total Votes</span>
                  </div>
                </div>

                <div className="results-grid">
                  {pollOptions.map((option, index) => (
                    <div
                      key={option.id}
                      className="result-card modern-card hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="result-header">
                        <div className="option-info">
                          <span className="option-letter">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="option-text">{option.text}</span>
                        </div>
                        <div className="result-stats">
                          <span className="percentage">
                            {Math.round(calculatePercentage(votes[option.text] || 0))}%
                          </span>
                          <span className="vote-count">
                            {votes[option.text] || 0} votes
                          </span>
                        </div>
                      </div>
                      
                      <div className="result-progress">
                        <div className="modern-progress">
                          <div
                            className="modern-progress-bar"
                            style={{
                              width: `${calculatePercentage(votes[option.text] || 0)}%`,
                              animationDelay: `${index * 0.2}s`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              <div className="action-section scale-in">
                <button
                  className="new-question-button modern-btn primary glow"
                  onClick={askNewQuestion}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Ask New Question</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="waiting-state">
              <div className="waiting-content modern-card">
                <div className="waiting-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H16M8 8H16M8 16H12M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Ready to Start Polling</h3>
                <p>Create a new poll to see live results here</p>
                <button
                  className="start-polling-button modern-btn primary"
                  onClick={askNewQuestion}
                >
                  <span>Create First Poll</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatPopover />
      {chatPopup && (
        <ChatMessagePopup message={chatPopup} onClose={() => setChatPopup(null)} />
      )}
    </div>
  );
};

export default TeacherPollPage;
