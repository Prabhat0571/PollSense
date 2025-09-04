import React, { useState, useEffect } from "react";
import stars from "../../assets/spark.svg";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../../contexts/DarkModeContext";
import DarkModeToggle from "../../components/ui/DarkModeToggle";
let apiUrl = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const selectRole = (role) => {
    setSelectedRole(role);
  };

  const continueToPoll = async () => {
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    setIsLoading(true);
    
    try {
      if (selectedRole === "teacher") {
        let teacherlogin = await axios.post(`${apiUrl}/api/auth/login`);
        sessionStorage.setItem("username", teacherlogin.data.username);
        navigate("/teacher-home-page");
      } else if (selectedRole === "student") {
        navigate("/student-home-page");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <DarkModeToggle />
      
      {/* Background Elements */}
      <div className="login-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className={`login-content ${mounted ? 'fade-in' : ''}`}>
        <div className="login-header scale-in">
          <div className="brand-logo modern-btn float">
            <img src={stars} alt="PollSense" />
            <span className="text-gradient">PollSense</span>
          </div>
          
          <h1 className="login-title slide-in-left">
            Welcome to the <span className="text-gradient">Live Polling System</span>
          </h1>
          
          <p className="login-description slide-in-right">
            Choose your role to begin an interactive polling experience with real-time results and engagement
          </p>
        </div>

        <div className={`role-selection ${mounted ? 'scale-in' : ''}`}>
          <div className="role-cards">
            <div
              className={`role-card modern-card hover-lift ${selectedRole === "student" ? "selected" : ""}`}
              onClick={() => selectRole("student")}
            >
              <div className="role-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14L8 10H16L12 14Z" fill="currentColor"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>I'm a Student</h3>
              <p>Join live polls, submit answers, and see real-time results with your classmates</p>
              <div className="role-features">
                <span>✓ Answer Questions</span>
                <span>✓ Real-time Results</span>
                <span>✓ Interactive Chat</span>
              </div>
            </div>

            <div
              className={`role-card modern-card hover-lift ${selectedRole === "teacher" ? "selected" : ""}`}
              onClick={() => selectRole("teacher")}
            >
              <div className="role-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>I'm a Teacher</h3>
              <p>Create engaging polls, manage students, and track participation in real-time</p>
              <div className="role-features">
                <span>✓ Create Polls</span>
                <span>✓ Manage Students</span>
                <span>✓ View Analytics</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-actions">
          <button 
            className={`continue-button modern-btn ${selectedRole ? 'glow' : ''}`}
            onClick={continueToPoll}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner-modern"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
