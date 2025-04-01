import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './AuthContext'; // Import useAuth from the correct location

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login function from useAuth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password
      });
  
      if (response.data.token) {
        login(response.data.token); // Use the login method from context to set isAuthenticated and store the token
        navigate("/library"); // Redirect to library page on successful login
      } else {
        setError("Login failed, please try again.");
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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


