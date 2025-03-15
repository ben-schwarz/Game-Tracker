import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // Check credentials from localStorage
    const storedPassword = localStorage.getItem("user_" + username);

    if (storedPassword === password) {
      localStorage.setItem("userToken", "example_token"); // Mock authentication
      navigate("/library"); // Redirect to the library page
    } else {
      alert("Invalid username or password");
    }
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
    </div>
  );
}

export default SignIn;
