import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import "./StudentPollPage.css";
import stopwatch from "../../assets/stopwatch.svg";
import ChatPopover from "../../components/chat/ChatPopover";
import { useNavigate } from "react-router-dom";
import stars from "../../assets/spark.svg";
import CelebrationPopup from "./CelebrationPopup";
import ChatMessagePopup from "./ChatMessagePopup";
let apiUrl = import.meta.env.VITE_API_BASE_URL;

const socket = io(apiUrl);

const StudentPollPage = () => {
  const [votes, setVotes] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [pollId, setPollId] = useState("");
  const [kickedOut, setKickedOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [optionAnimations, setOptionAnimations] = useState({});
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);
  const [chatPopup, setChatPopup] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const username = sessionStorage.getItem("username");
      if (username) {
        const selectedOptionObj = pollOptions.find(
          (opt) => opt.text === selectedOption
        );
        if (selectedOptionObj && selectedOptionObj.correct) {
          setShowCelebration(true);
        }
        socket.emit("submitAnswer", {
          username: username,
          option: selectedOption,
          pollId: pollId,
        });
        setSubmitted(true);
      } else {
        console.error("No username found in session storage!");
      }
    }
  };

  useEffect(() => {
    const handleKickedOut = () => {
      setKickedOut(true);
      sessionStorage.removeItem("username");
      navigate("/kicked-out");
    };

    socket.on("kickedOut", handleKickedOut);

    return () => {
      socket.off("kickedOut", handleKickedOut);
    };
  }, [navigate]);

  useEffect(() => {
    socket.on("pollCreated", (pollData) => {
      setPollQuestion(pollData.question);
      setPollOptions(pollData.options);
      setVotes({});
      setSubmitted(false);
      setSelectedOption(null);
      setTimeLeft(pollData.timer);
      setPollId(pollData._id);
    });

    socket.on("pollResults", (updatedVotes) => {
      setVotes(updatedVotes);
    });

    socket.on("chatMessage", (message) => {
      const username = sessionStorage.getItem("username");
      if (message.user !== username) {
        setChatPopup(message);
      }
    });

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      socket.off("chatMessage");
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setSubmitted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, submitted]);

  const calculatePercentage = (count) => {
    if (totalVotes === 0) return 0;
    return (count / totalVotes) * 100;
  };

  return (
    <div className="student-poll-container">
      <ChatPopover />
      
      {kickedOut ? (
        <div className="kicked-out-screen">
          <div className="kicked-out-content modern-card scale-in">
            <div className="kicked-out-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Session Ended</h2>
            <p>You have been removed from the polling session by the teacher.</p>
          </div>
        </div>
      ) : (
        <>
          {pollQuestion === "" && timeLeft === 0 && (
            <div className="waiting-screen">
              <div className={`waiting-content ${mounted ? 'fade-in' : ''}`}>
                <div className="brand-logo modern-btn float">
                  <img src={stars} alt="PollSense" />
                  <span className="text-gradient">PollSense</span>
                </div>
                
                <div className="waiting-animation">
                  <div className="spinner-modern"></div>
                  <div className="pulse-rings">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring"></div>
                  </div>
                </div>
                
                <h2 className="waiting-title">
                  Waiting for <span className="text-gradient">Questions</span>
                </h2>
                <p className="waiting-description">
                  Your teacher is preparing the next poll question. Stay tuned!
                </p>
              </div>
            </div>
          )}

          {pollQuestion !== "" && (
            <div className={`poll-active-screen ${mounted ? 'slide-in-left' : ''}`}>
              <div className="poll-header">
                <div className="question-badge">
                  <span>Question</span>
                </div>
                <div className="timer-display">
                  <img src={stopwatch} alt="Timer" />
                  <span className={`timer-count ${timeLeft <= 10 ? 'urgent' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>

              <div className="poll-content modern-card">
                <div className="question-section">
                  <h2 className="poll-question">
                    {pollQuestion}?
                  </h2>
                </div>

                <div className="options-section">
                  {pollOptions.map((option, index) => (
                    <div
                      key={option.id}
                      className={`option-card modern-card hover-lift ${
                        selectedOption === option.text ? "selected" : ""
                      } ${submitted ? "submitted" : ""}`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        cursor: submitted || timeLeft === 0 ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!submitted && timeLeft > 0) {
                          handleOptionSelect(option.text);
                        }
                      }}
                    >
                      <div className="option-content">
                        <div className="option-text">
                          <span className="option-letter">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="option-label">{option.text}</span>
                        </div>
                        
                        {submitted && (
                          <div className="option-result">
                            <span className="result-percentage">
                              {Math.round(calculatePercentage(votes[option.text] || 0))}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {submitted && (
                        <div className="option-progress">
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
                      )}
                    </div>
                  ))}
                </div>

                {!submitted && selectedOption && timeLeft > 0 && (
                  <div className="submit-section scale-in">
                    <button
                      className="submit-button modern-btn glow"
                      onClick={handleSubmit}
                    >
                      <span>Submit Answer</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}

                {submitted && (
                  <div className="waiting-next fade-in">
                    <div className="waiting-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p>Waiting for the next question...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {showCelebration && (
            <CelebrationPopup onClose={() => setShowCelebration(false)} />
          )}
          {chatPopup && (
            <ChatMessagePopup message={chatPopup} onClose={() => setChatPopup(null)} />
          )}
        </>
      )}
    </div>
  );
};

export default StudentPollPage;
