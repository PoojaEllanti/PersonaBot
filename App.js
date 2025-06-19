import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [persona, setPersona] = useState("Teacher");
  const [customPersona, setCustomPersona] = useState("");

  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [chat]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { type: "user", text: message };
    setChat([...chat, userMsg]);
    setMessage("");

    const personaPrompt =
      persona === "Custom" && customPersona.trim()
        ? customPersona
        : persona;

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message,
        persona: personaPrompt,
      });

      const botMsg = { type: "bot", text: res.data.response };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error:", err);
      setChat((prev) => [
        ...prev,
        { type: "bot", text: "❌ Error from server" },
      ]);
    }
  };

  return (
    <div className="app-container">
      <h1>🤖 PersonaBot</h1>

      <div className="persona-select">
        <label>Choose Persona:</label>
        <select value={persona} onChange={(e) => setPersona(e.target.value)}>
          <option value="Teacher">👩‍🏫 Teacher</option>
          <option value="Therapist">🧘 Therapist</option>
          <option value="Friend">👯 Friend</option>
          <option value="Custom">✍️ Custom</option>
        </select>
      </div>

      {persona === "Custom" && (
        <input
          type="text"
          className="custom-input"
          placeholder="Describe your custom persona..."
          value={customPersona}
          onChange={(e) => setCustomPersona(e.target.value)}
        />
      )}

      <div className="chat-box" ref={chatBoxRef}>
        {chat.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.type}`}>
            <span className="avatar">{msg.type === "user" ? "🧑" : "🤖"}</span>
            <div className="chat-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
