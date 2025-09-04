import React, { useState, useEffect } from "react";
import stars from "../../assets/spark.svg";
import { useNavigate } from "react-router-dom";
import "./StudentLandingPage.css";

const StudentLandingPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleStudentLogin = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    setIsLoading(true);
    try {
      sessionStorage.setItem("username", name);
      navigate("/poll-question");
    } catch (error) {
      console.error("Error logging in student:", error);
      alert("Error connecting to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-landing-page">
      {/* Background Elements */}
      <div className="student-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className={`student-content ${mounted ? 'fade-in' : ''}`}>
        {/* Header */}
        <div className="student-header scale-in">
          <div className="brand-logo modern-btn float">
            <img src={stars} alt="PollSense" />
            <span className="text-gradient">PollSense</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={`student-main ${mounted ? 'slide-in-left' : ''}`}>
          <div className="welcome-section">
            <h1 className="student-title">
              Let's <span className="text-gradient">Get Started</span>
            </h1>
            <p className="student-description">
              Join live polls, submit your answers, and see real-time results with your classmates in an interactive learning environment.
            </p>
          </div>

          {/* Student Info Card */}
          <div className={`student-card modern-card ${mounted ? 'scale-in' : ''}`}>
            <div className="card-header">
              <div className="student-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Student Access</h3>
              <p>Enter your name to join the interactive polling session</p>
            </div>

            <form onSubmit={handleStudentLogin} className="student-form">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="modern-input name-input focus-ring"
                  placeholder="Enter your full name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <div className="input-hint">
                  This name will be visible to your teacher and classmates
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`join-button modern-btn ${name.trim() ? 'glow' : ''}`}
                  disabled={isLoading || !name.trim()}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner-modern"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Session</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Features */}
          <div className={`features-section ${mounted ? 'slide-in-right' : ''}`}>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Answer Questions</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Real-time Results</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Interactive Chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLandingPage;
