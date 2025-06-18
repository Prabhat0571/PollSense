import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./Chat.css";

const Chat = ({ messages, newMessage, onMessageChange, onSendMessage }) => {
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        id="chat-window"
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          padding: "10px",
          borderRadius: "8px",
          background: "#f8f9fa",
        }}
      >
        {messages.length === 0 ? (
          <div>No messages yet</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={msg.user === username ? "current-user" : "other-user"}
              style={{
                alignSelf: msg.user === username ? "flex-end" : "flex-start",
                marginBottom: "10px",
                fontSize: "10px",
              }}
            >
              <span style={{ marginRight: "5px" }}>
                {msg.user === username ? "You" : msg.user}:
              </span>
              <span
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  display: "inline-block",
                  maxWidth: "80%",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>
      <Form.Group className="mt-2">
        <Form.Control
          type="text"
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type a message"
          style={{
            fontSize: "10px",
            borderRadius: "8px",
            border: "1px solid #ced4da",
          }}
        />
      </Form.Group>
      <Button
        onClick={onSendMessage}
        className="mt-2"
        style={{
          borderRadius: "8px",
          border:"none",
          fontSize: "10px",
          background: "rgba(90, 102, 209, 1)",
        }}
      >
        Send
      </Button>
    </>
  );
};

export default Chat;
