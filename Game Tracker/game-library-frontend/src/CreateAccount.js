import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Save user credentials (for demonstration, using localStorage)
    if (username && password) {
      localStorage.setItem("user_" + username, password); // Store user data
      alert("Account created successfully!");
      navigate("/signin"); // Redirect to Sign-In page
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleCreateAccount}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/signin">Sign in here</a>
      </p>
    </div>
  );
}

export default CreateAccount;
