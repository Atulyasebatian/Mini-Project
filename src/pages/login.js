import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
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

      const token = data.token;
      localStorage.setItem('token', token);
      
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user.role;

      // FIX: Updated logic to redirect both 'Operator' and 'Admin' to the dashboard.
      if (userRole === 'Admin') {
        navigate("/admin/dashboard");
      } else if (userRole === 'Operator') {
        navigate("/operator/dashboard");
      } else if (userRole === 'Passenger') {
        navigate("/home"); // Redirect Passengers to a home page
      } else {
        // Fallback for any other roles or issues
        setError("Login successful, but role is unrecognized.");
        navigate("/");
      }

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
        <h2 className="welcome">Welcome Back</h2>
        <p className="subtitle">Log in to your account</p>

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
            <a href="/forgot-password" className="forgot">
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
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;