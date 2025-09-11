// File: /src/pages/login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
          throw new Error(data.msg || 'Failed to log in');
      }

      // Login successful, we have a token
      console.log('Login successful, token:', data.token);
      
      // Store the token for future authenticated requests
      localStorage.setItem('token', data.token);
      
      // Navigate to the dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const backgroundImageUrl = "/rr-modified.jpg";

  return (
    <div
      className="login-wrapper"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="login-card glass-effect">
        <h1 className="brand">
          <span className="material-icons">directions_bus</span>
          TransitGo
        </h1>
        <h2 className="welcome">Welcome Back, Admin</h2>
        <p className="subtitle">Log in to the dashboard</p>

        <form onSubmit={handleLogin}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-group">
            <label htmlFor="password">Password</label>
            <a href="#" className="forgot">
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p className="signup" style={{ marginTop: '25px' }}>
          Don't have an admin account?{" "}
          <Link to="/signup">Create one here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;