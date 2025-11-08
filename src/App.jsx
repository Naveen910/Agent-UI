import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import "./App.css"; // ← import CSS here

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const STATIC_PASSWORD = "nova.3";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === STATIC_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2 align="center">Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
          {error && <p className="auth-error">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <ChatWindow />
    </div>
  );
}

export default App;
