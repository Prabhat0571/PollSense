import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import ChatPopover from "../../components/chat/ChatPopover";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../assets/eye.svg";
import ChatMessagePopup from "../student-poll/ChatMessagePopup";
let apiUrl = import.meta.env.VITE_API_BASE_URL;

const socket = io(apiUrl);

const TeacherPollPage = () => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [votes, setVotes] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [chatPopup, setChatPopup] = useState(null);
  const navigate = new useNavigate();
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
    <>
      <button
        className="btn rounded-pill ask-question poll-history px-4 m-2"
        onClick={handleViewPollHistory}
      >
        <img src={eyeIcon} alt=""/>
        View Poll history
      </button>
      <br />
      <div className="container mt-5 w-50">
        <h3 className="mb-4 text-center">Poll Results</h3>

        {pollQuestion && (
          <>
            <div className="card">
              <div className="card-body">
                <h6 className="question py-2 ps-2 text-left rounded text-white">
                  {pollQuestion} ?
                </h6>
                <div className="list-group mt-4">
                  {pollOptions.map((option) => (
                    <div
                      key={option.id}
                      className="list-group-item rounded m-2"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{option.text}</span>
                        <span>
                          {Math.round(
                            calculatePercentage(votes[option.text] || 0)
                          )}
                          %
                        </span>
                      </div>
                      <div className="progress mt-2">
                        <div
                          className="progress-bar progress-bar-bg"
                          role="progressbar"
                          style={{
                            width: `${calculatePercentage(
                              votes[option.text] || 0
                            )}%`,
                          }}
                          aria-valuenow={votes[option.text] || 0}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <button
                className="btn rounded-pill ask-question px-4 m-2"
                onClick={askNewQuestion}
              >
                + Ask a new question
              </button>
            </div>
          </>
        )}

        {!pollQuestion && (
          <div className="text-muted">
            Waiting for the teacher to start a new poll...
          </div>
        )}
        <ChatPopover />
        {chatPopup && (
          <ChatMessagePopup message={chatPopup} onClose={() => setChatPopup(null)} />
        )}
      </div>
    </>
  );
};

export default TeacherPollPage;
