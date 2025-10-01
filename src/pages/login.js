import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Correct import
import "../styles/login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Failed to log in");

      const token = data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwt_decode(token); // Use correct function
      const userRole = decodedToken.user.role;

      if (userRole === "Admin") navigate("/admin/dashboard");
      else if (userRole === "Operator") navigate("/operator/dashboard");
      else if (userRole === "Passenger") navigate("/home");
      else setError("Login successful, but role is unrecognized.");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url('/rr-modified.jpg')` }}>
      <div className="login-card glass-effect">
        <h1 className="brand">
          <span className="material-icons">directions_bus</span> TransitGo
        </h1>
        <h2 className="welcome">Welcome Back</h2>
        <p className="subtitle">Log in to your account</p>

        <form onSubmit={handleLogin}>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-group">
            <label htmlFor="password">Password</label>
            <a href="/forgot-password" className="forgot">Forgot Password?</a>
          </div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="signup">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
