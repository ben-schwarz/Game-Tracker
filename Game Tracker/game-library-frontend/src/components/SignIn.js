import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("user_" + username);

    if (storedPassword === password) {
      localStorage.setItem("userToken", "example_token");
      localStorage.setItem("username", username);
      navigate("/library"); // Redirect to library after login
    } else {
      alert("Invalid username or password");
    }
  };

  const skipLogin = () => {
    localStorage.setItem("userToken", "example_token");
    localStorage.setItem("username", "Guest");
    localStorage.setItem("email", "guest@example.com");
    navigate("/library");
    window.location.reload(); // Refresh to trigger Navbar and routes
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/create-account">Create one here</a>
      </p>

      {/* Skip Login Button */}
      <button
        onClick={skipLogin}
        style={{
          marginTop: "10px",
          background: "#888",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Skip Login
      </button>
    </div>
  );
}

export default SignIn;
