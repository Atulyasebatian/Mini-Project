import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode"; 
import { Spinner } from "react-bootstrap";
import "../styles/login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user.role;

      if (userRole === "Admin") navigate("/admin/dashboard");
      else if (userRole === "Operator") navigate("/operator/dashboard");
      else if (userRole === "Passenger") navigate("/home");
      else setError("Login successful, but role is unrecognized.");

    } catch (err) {
      const message = err.response?.data?.msg || "An unexpected error occurred. Please try again.";
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url('/t5.jpg')` }}>
      <div className="login-card glass-effect">
        <h1 className="brand">
          <span className="material-icons">directions_bus</span> Transit Go
        </h1>
        <h2 className="welcome">Welcome Back</h2>
        <p className="subtitle">Log in to your account</p>

        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
          />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Login"}
          </button>
        </form>

        <p className="signup">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;