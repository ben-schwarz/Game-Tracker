// SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

     /* if (response.status === 200) {
        // Fetch user details from your backend 'me' endpoint
        const userResponse = await axios.get("http://localhost:8080/api/users", {
          withCredentials: true,
     }); */

        // Call the login function with the token and user data
        login(response.data.token || "session-based");
        navigate("/sync");
      } 
    catch (err) {
      console.error("Login error", err);
      setError("Invalid username or password");

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





