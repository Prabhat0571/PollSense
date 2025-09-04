import React, { useState, useEffect } from "react";
import stars from "../../assets/spark.svg";
import "./TeacherLandingPage.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/eye.svg";
let apiUrl = import.meta.env.VITE_API_BASE_URL;

const socket = io(apiUrl);
const TeacherLandingPage = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: 1, text: "", correct: null }]);
  const [timer, setTimer] = useState("60");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleTimerChange = (e) => {
    setTimer(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const handleCorrectToggle = (index, isCorrect) => {
    const updatedOptions = [...options];
    updatedOptions[index].correct = isCorrect;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([
      ...options,
      { id: options.length + 1, text: "", correct: null },
    ]);
  };

  const validateForm = () => {
    if (question.trim() === "") {
      setError("Question cannot be empty");
      return false;
    }

    if (options.length < 2) {
      setError("At least two options are required");
      return false;
    }

    const optionTexts = options.map((option) => option.text.trim());
    if (optionTexts.some((text) => text === "")) {
      setError("All options must have text");
      return false;
    }

    const correctOptionExists = options.some(
      (option) => option.correct === true
    );
    if (!correctOptionExists) {
      setError("At least one correct option must be selected");
      return false;
    }

    setError("");
    return true;
  };

  const askQuestion = async () => {
    if (validateForm()) {
      setIsCreating(true);
      try {
        let teacherUsername = sessionStorage.getItem("username");
        let pollData = { question, options, timer, teacherUsername };
        socket.emit("createPoll", pollData);
        navigate("/teacher-poll");
      } catch (error) {
        console.error("Error creating poll:", error);
        setError("Failed to create poll. Please try again.");
      } finally {
        setIsCreating(false);
      }
    }
  };
  const handleViewPollHistory = () => {
    navigate("/teacher-poll-history");
  };

  return (
    <div className="teacher-landing-container">
      {/* Header Section */}
      <div className="teacher-header">
        <div className="header-actions">
          <button
            className="history-button modern-btn-secondary hover-lift"
            onClick={handleViewPollHistory}
          >
            <img src={eyeIcon} alt="History" />
            <span>Poll History</span>
          </button>
        </div>
        
        <div className={`brand-section ${mounted ? 'fade-in' : ''}`}>
          <div className="brand-logo modern-btn float">
            <img src={stars} alt="PollSense" />
            <span className="text-gradient">PollSense</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`teacher-content container-modern ${mounted ? 'slide-in-left' : ''}`}>
        <div className="welcome-section">
          <h1 className="teacher-title">
            Let's <span className="text-gradient">Get Started</span>
          </h1>
          <div className="teacher-info">
            <span className="teacher-label">Teacher:</span>
            <span className="teacher-name">{username}</span>
          </div>
          <p className="teacher-description">
            Create engaging polls, manage student responses, and track participation in real-time with our interactive polling system.
          </p>
        </div>

        {error && (
          <div className="error-alert modern-card scale-in">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Question Section */}
        <div className={`question-section modern-card ${mounted ? 'scale-in' : ''}`}>
          <div className="section-header">
            <h3>Create Your Question</h3>
            <div className="timer-selector">
              <label>Duration:</label>
              <select
                className="modern-input timer-select"
                value={timer}
                onChange={handleTimerChange}
              >
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="90">90 seconds</option>
              </select>
            </div>
          </div>
          
          <div className="question-input-group">
            <textarea
              className="modern-input question-textarea"
              value={question}
              onChange={handleQuestionChange}
              maxLength="100"
              placeholder="Enter your poll question here..."
              rows="3"
            />
            <div className="character-count">
              <span className={question.length > 80 ? 'warning' : ''}>{question.length}/100</span>
            </div>
          </div>
        </div>

        {/* Options Section */}
        <div className={`options-section modern-card ${mounted ? 'slide-in-right' : ''}`}>
          <div className="section-header">
            <h3>Answer Options</h3>
            <span className="options-subtitle">Mark the correct answer(s)</span>
          </div>
          
          <div className="options-list">
            {options.map((option, index) => (
              <div key={option.id} className="option-item">
                <div className="option-number">{index + 1}</div>
                <input
                  type="text"
                  className="modern-input option-input"
                  placeholder={`Option ${index + 1}...`}
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <div className="correct-selector">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={option.correct === true}
                      onChange={() => handleCorrectToggle(index, true)}
                    />
                    <span className="radio-custom correct"></span>
                    <span>Correct</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={option.correct === false}
                      onChange={() => handleCorrectToggle(index, false)}
                    />
                    <span className="radio-custom incorrect"></span>
                    <span>Incorrect</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <button className="add-option-btn modern-btn-outline hover-scale" onClick={addOption}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Add Another Option</span>
          </button>
        </div>

        {/* Action Section */}
        <div className="action-section">
          <button
            className={`create-poll-btn modern-btn ${question && options.some(opt => opt.text.trim()) ? 'glow' : ''}`}
            onClick={askQuestion}
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <div className="spinner-modern"></div>
                <span>Creating Poll...</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12L12 16L16 12M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Start Poll</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLandingPage;
